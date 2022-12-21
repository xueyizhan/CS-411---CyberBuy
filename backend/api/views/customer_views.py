from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from api.utils.dictFetch import dictfetchall, dictfetchone


@api_view(['get'])
def CustomerGetProfile(request,customer_id):
    cursor = connection.cursor()
    statement = "SELECT * FROM Customer WHERE customer_id = %s"
    cursor.execute(statement,[customer_id])
    row = dictfetchone(cursor)
    return Response(row,status=status.HTTP_200_OK)

@api_view(['PUT'])
def CustomerUpdateProfile(request,customer_id):
    #Note: customer could not update his/her email
    statement = "UPDATE Customer SET Password=%s,Username=%s,Contact_number=%s,Last_name=%s,First_name=%s"
    cursor = connection.cursor()
    cursor.execute(statement,[request.data['Password'],request.data['Username'],request.data['Contact_number'],request.data['Last_name'],request.data['First_name']])
    return Response("Your file has been updated",status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerGetAddress(request,address_id):
    #Note: address maybe empty. 
    #Todo: disscuss with frontend team about how to handle this case
    cursor = connection.cursor()
    statement = "SELECT * FROM Address WHERE address_id = %s"
    cursor.execute(statement,[address_id])
    row = dictfetchone(cursor)
    return Response(row,status=status.HTTP_200_OK)

@api_view(['put'])
def CustomerUpdateAddress(request,address_id):
    cursor = connection.cursor()
    statement = "UPDATE Address SET State=%s,Street_line=%s,Zip_code=%s where address_id = %s"
    cursor.execute(statement,[request.data['State'],request.data['Street_line'],request.data['Zip_code'],address_id])
    return Response("Your address has been updated",status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerGetOrders(request,customer_id):
    cursor = connection.cursor()
    statement = "SELECT * FROM Orders WHERE Customer_ID = %s"
    cursor.execute(statement,[customer_id])
    if cursor.rowcount == 0:
        return Response("You have no order",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerGetOrder(request,Order_Number):
    cursor = connection.cursor()
    statement = "SELECT * FROM Orders WHERE Order_Number = %s"
    cursor.execute(statement,[Order_Number])
    if cursor.rowcount == 0:
        return Response("No such order",status=status.HTTP_200_OK)
    return Response(dictfetchone(cursor),status=status.HTTP_200_OK)


@api_view(['get'])
def CustomerShowComputers(request):
    cursor = connection.cursor()
    statement = "SELECT * FROM Computer join Product using(Product_ID)"
    cursor.execute(statement)
    if cursor.rowcount == 0:
        return Response("No computer",status=status.HTTP_200_OK)
   
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerShowComputer(request,Product_ID):
    # cursor = connection.cursor()
    # statement = "SELECT * FROM Computer Join Product using(Product_ID) WHERE Product_ID = %s"
    # cursor.execute(statement,[Product_ID])
    # if cursor.rowcount == 0:
    #     return Response("No such computer",status=status.HTTP_200_OK)
    # return Response(dictfetchone(cursor),status=status.HTTP_200_OK)

    #get product name and search for different models
    # cursor = connection.cursor()
    # statment = "SELECT title FROM Product WHERE Product_ID = %s"
    # cursor.execute(statment,[Product_ID])
    
    #search for different models and return a list of models
    cursor = connection.cursor()
    statment = "select * from product join computer using(Product_ID) where title = (SELECT Title FROM cyberbuy.product where Product_ID = %s) and Shop_ID = (select Shop_ID FROM cyberbuy.product where Product_ID = %s);"
    cursor.execute(statment,[Product_ID,Product_ID])
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)


@api_view(['get'])
def CustomerShowCellphones(request):
    cursor = connection.cursor()
    statement = "SELECT * FROM Cellphone join Product using(Product_ID)"
    cursor.execute(statement)
    if cursor.rowcount == 0:
        return Response("No cellphone",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerShowCellphone(request,Product_ID):
    #search for different models and return a list of models
    cusor = connection.cursor()
    statment = "select * from product join cellphone using(Product_ID) where title = (SELECT Title FROM cyberbuy.product where Product_ID = %s) and Shop_ID = (select Shop_ID FROM cyberbuy.product where Product_ID = %s);"
    cusor.execute(statment,[Product_ID,Product_ID])
    return Response(dictfetchall(cusor),status=status.HTTP_200_OK)
    

@api_view(['get'])
def CustomerShowVideoGames(request):
    cursor = connection.cursor()
    statement = "SELECT * FROM VideoGame join Product using(Product_ID)"
    cursor.execute(statement)
    if cursor.rowcount == 0:
        return Response("No video game",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerShowVideoGame(request,Product_ID):
    #search for different models and return a list of models
    cursor = connection.cursor()
    statement = "select * from product join videogame using(Product_ID) where title = (SELECT Title FROM cyberbuy.product where Product_ID = %s) and Shop_ID = (select Shop_ID FROM cyberbuy.product where Product_ID = %s);"
    cursor.execute(statement,[Product_ID,Product_ID])
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerSearch(request,keyword):
    cursor = connection.cursor()
    statement = "SELECT * FROM Product WHERE Title LIKE %s"
    cursor.execute(statement,['%'+keyword+'%'])
    if cursor.rowcount == 0:
        return Response("No such product",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerGetAllProducts(request):
    cursor = connection.cursor()
    statement = "SELECT * FROM Product"
    cursor.execute(statement)
    if cursor.rowcount == 0:
        return Response("No product",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)


@api_view(['Post'])
def CustomerAddToCart(request):
    cursor = connection.cursor()
    
    #check if the product is in the cart
    
    statement = "SELECT * FROM Cart WHERE Customer_ID = %s AND Product_ID = %s"
    cursor.execute(statement,[request.data['Customer_ID'],request.data['Product_ID']])
    if cursor.rowcount == 0:
        statement = "INSERT INTO Cart (Customer_ID,Product_ID,Quantity) VALUES (%s,%s,%s)"
        cursor.execute(statement,[request.data['Customer_ID'],request.data['Product_ID'],request.data['Quantity']])
    else:
        statement = "UPDATE Cart SET Quantity = Quantity + %s WHERE Customer_ID = %s AND Product_ID = %s"
        cursor.execute(statement,[request.data['Quantity'],request.data['Customer_ID'],request.data['Product_ID']])
    return Response("Product added to cart",status=status.HTTP_200_OK)


@api_view(['get'])
def CustomerGetCart(request,customer_id):
    cursor = connection.cursor()
    statement = "SELECT * FROM Cart Join Product using (Product_ID) WHERE Customer_ID = %s"
    cursor.execute(statement,[customer_id])
    if cursor.rowcount == 0:
        return Response("Your cart is empty",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)

@api_view(['Put'])
def CustomerUpdateCart(request,customer_id):
    cursor = connection.cursor()
    statement = "UPDATE Cart SET Quantity = %s WHERE Customer_ID = %s AND Product_ID = %s"
    cursor.execute(statement,[request.data['Quantity'],customer_id,request.data['Product_ID']])
    return Response("Cart updated",status=status.HTTP_200_OK)


# @api_view(['POST'])
# def CustomerPlaceOrder(request):
#     cursor = connection.cursor()
#     # statement = "INSERT INTO Orders(Customer_ID,Order_Date,Order_Status) VALUES(%s,%s,%s)"
#     # cursor.execute(statement,[request.data['Customer_ID'],request.data['Order_Date'],request.data['Order_Status']])
#     # return Response("Your order has been placed",status=status.HTTP_200_OK)
    

@api_view(['DELETE'])
def CustomerDeleteCartProduct(request,customer_id,product_id):
    cursor = connection.cursor()
    statement = "DELETE FROM Cart WHERE Customer_ID = %s AND Product_ID = %s"
    cursor.execute(statement,[customer_id,product_id])
    return Response("Product deleted from cart",status=status.HTTP_200_OK)

@api_view(['get'])
def CustomerGetSpecialOffers(request,customer_id):
    cursor = connection.cursor()
    statement = "SELECT * FROM special_offer left join Product using(Product_ID) where Customer_ID = %s"
    cursor.execute(statement,[customer_id])
    if cursor.rowcount == 0:
        return Response("No offer",status=status.HTTP_200_OK)
    return Response(dictfetchall(cursor),status=status.HTTP_200_OK)


@api_view(['PUT'])
def CustomerCheckCoupon(request,customer_id):
    cursor = connection.cursor()
    statement = "SELECT * FROM special_offer WHERE Coupon = %s and Customer_ID = %s and Product_ID = %s LIMIT 1"
    cursor.execute(statement,[request.data['Coupon'],customer_id,request.data['Product_ID']])
    if cursor.rowcount == 0:
        return Response("Invalid",status=status.HTTP_200_OK)
    return Response(dictfetchone(cursor),status=status.HTTP_200_OK)


    
    