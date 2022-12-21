from django.db import connection, transaction
from api.utils.dictFetch import dictfetchall, dictfetchone
from rest_framework.response import Response
from rest_framework import status
import datetime
from rest_framework.decorators import api_view

@api_view(['POST'])
@transaction.atomic
def placeOrder(request, customer_id):
  sid = transaction.savepoint()
  
  cursor = connection.cursor()
  cursor.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
  cursor.execute("SELECT @@session.transaction_isolation")
  cursor.execute("START TRANSACTION")
  
  # get the cart info - check how many shops involved
  statement = "SELECT DISTINCT Shop_ID FROM Cart Join Product using (Product_ID) WHERE Customer_ID = %s" 
  cursor.execute(statement, [customer_id])
  if cursor.rowcount == 0:
    return Response("Your cart is empty", status=status.HTTP_200_OK)
    cursor.execute("ROLLBACK")
  shops = dictfetchall(cursor)
  
  # get the items for that shop (subquery)
  for shop in shops:
    discount = 0
    statement = "SELECT * FROM Cart WHERE Customer_ID = %s AND Product_ID IN (SELECT Product_ID FROM Product WHERE Shop_ID = %s)"
    cursor.execute(statement,[customer_id, shop['Shop_ID']])
    if cursor.rowcount == 0:
      return Response("You have no item in your cart",status=status.HTTP_200_OK)
      cursor.execute("ROLLBACK")
    CartInfo = dictfetchall(cursor)
    
    # check if the stock is enough- for trigger
    # statement = '''
    # create trigger check_stock before insert on order_product 
    # for each row 
    # begin 
	  # Declare MESSAGE_TEXT varchar(200);
	  # set @currentStock = (select stock from product where product.Product_ID = NEW.Product_ID);
	  # if @currentStock < new.Quantity THEN
		# 			signal sqlstate '45000' set MESSAGE_TEXT = 'Not enough stock for product ';
	  # end if; 
	  # end'''
    # cursor.execute(statement)
      
    #generate order number
    statement = "SELECT MAX(Order_Number) FROM Orders"
    cursor.execute(statement)
    generated_order_number = dictfetchone(cursor)['MAX(Order_Number)'] + 1
    
    #generate order date
    generated_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    # insert into order table
    # Note : status 0 means have no pyament yet
    statement = "INSERT INTO Orders (Customer_ID,Order_Number,Order_Date,Order_Status,Shop_ID) VALUES (%s,%s,%s,%s,%s)"
    cursor.execute(statement,[customer_id,generated_order_number,generated_date,0,shop['Shop_ID']])
    
    # insert into order product table
    for item in CartInfo:
      statement = "INSERT INTO order_product (Order_Number,Product_ID,quantity) VALUES (%s,%s,%s)"
      cursor.execute(statement,[generated_order_number,item['Product_ID'],item['quantity']])
    
        # update the stock
      statement = "UPDATE Product SET Stock = Stock - %s WHERE Product_ID = %s"
      cursor.execute(statement,[item['quantity'],item['Product_ID']])
      if cursor.rowcount == 0:
        return Response("No such product",status=status.HTTP_200_OK)
        cursor.execute("ROLLBACK")
      discount_value = 0
      #check if the coupon is valid for this product
      if request.data['coupon_code']!= None:
        if item['Product_ID'] == request.data['Product_ID']:
          statement = "SELECT * FROM special_offer WHERE Customer_ID = %s AND Product_ID = %s and Coupon = %s LIMIT 1"
          cursor.execute(statement,[customer_id,request.data['Product_ID'],request.data['coupon_code']])
          if cursor.rowcount == 0:
            cursor.execute("ROLLBACK")
            return Response("No such coupon",status=status.HTTP_200_OK)
            
          discount = dictfetchone(cursor)['Discount']
          
          statement = "SELECT Price FROM Product WHERE Product_ID = %s"
          cursor.execute(statement,[request.data['Product_ID']])
          product_price = dictfetchone(cursor)['Price']
          discount_value = product_price * (100 -discount)*0.01
          
          #delete the coupon
          statement = "DELETE FROM special_offer WHERE Customer_ID = %s AND Product_ID = %s"
          cursor.execute(statement,[customer_id,request.data['Product_ID']])
    
    # insert into shop order table
    statement = "INSERT INTO shop_order (Order_Number,Shop_ID) VALUES (%s,%s)"
    cursor.execute(statement,[generated_order_number,shop['Shop_ID']])
    
    
    #get the total price
    statement = "SELECT SUM(Price * quantity) as total_price FROM Cart JOIN Product USING (Product_ID) WHERE Customer_ID = %s AND Product_ID IN (SELECT Product_ID FROM Product WHERE Shop_ID = %s)"
    cursor.execute(statement,[customer_id,shop['Shop_ID']])
    total_amount = dictfetchone(cursor)['total_price']
    if discount_value != 0:
      total_amount -= discount_value
    
    #generate payment number
    statement = "SELECT MAX(Payment_ID) FROM Payment"
    cursor.execute(statement)
    current_payment_id = cursor.fetchone()[0]
    if current_payment_id is None:
      generated_Payment_ID = 1000
    else:
      generated_Payment_ID = current_payment_id + 1
      
    # insert into payment table
    statement = "INSERT INTO Payment (Payment_ID,Payment_amount,Payment_type,Card_number,Order_Number) VALUES (%s,%s,%s,%s,%s)"
    # may need to check the migrate file
    cursor.execute(statement,[generated_Payment_ID,total_amount,request.data['Payment_type'],request.data['Card_number'],generated_order_number])
    
    #update the order status
    statement = "UPDATE Orders SET Order_Status = 1 WHERE Order_Number = %s"
    cursor.execute(statement,[generated_order_number])
    
    # update the cart table
    try:
      statement = "DELETE FROM Cart WHERE Customer_ID = %s AND Product_ID = %s"
      cursor.execute(statement,[customer_id,item['Product_ID']])
    except:
      cursor.execute("ROLLBACK")
      return Response("cart update failed",status=status.HTTP_200_OK)
      
    
    # return the total price
  cursor.execute("COMMIT")
  return Response("Your orders has been placed",status=status.HTTP_200_OK)
    
      
      
 