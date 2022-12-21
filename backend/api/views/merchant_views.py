from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from api.utils.dictFetch import dictfetchall, dictfetchone


@api_view(['post'])
def MerchantCreateShop(request,merchant_id):
  #check if the merchant's shop exists
  cursor = connection.cursor()
  statement = "SELECT * FROM Shop WHERE merchant_id = %s"
  cursor.execute(statement,[merchant_id])
  if cursor.rowcount != 0:
    return Response("You already have a shop!",status=status.HTTP_200_OK)
  
  #create shop_id
  cursor = connection.cursor()
  statement_getID = "SELECT MAX(shop_id) FROM Shop"
  cursor.execute(statement_getID)
  Shop_ID = cursor.fetchone()[0] + 1
  
  #create shop
  statement_insert = "INSERT INTO shop (Shop_ID,Merchant_ID,Shop_Name,Contact_Number) VALUES (%s,%s,%s,%s);"
  cursor.execute(statement_insert,[Shop_ID,merchant_id, request.data['Shop_Name'],request.data['Contact_Number']])
  return Response(Shop_ID,status=status.HTTP_200_OK)


# Create your views here.
@api_view(['get'])
def MerchantGetShop(request,merchant_id):
  cursor = connection.cursor()
  statement = "SELECT * FROM Shop WHERE merchant_id = %s"
  cursor.execute(statement,[merchant_id])
  if cursor.rowcount == 0:
    return Response("No shop found",status=status.HTTP_200_OK)
  row = dictfetchone(cursor)
  return Response(row,status=status.HTTP_200_OK)

  # shop = Shop.objects.filter(merchant_id=merchant_id)
  # serializer = ShopSerializer(shop,many=True)
  # return Response(serializer.data)

@api_view(['get'])
def MerchantGetProducts(request,shop_id):
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE shop_id = %s"
  cursor.execute(statement,[shop_id])
  row = dictfetchall(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  # shop = Shop.objects.get(shop_id=shop_id)
  # shop_serializer = ShopSerializer(shop,many=False)
  # productList = Product.objects.filter(shop_id=shop_serializer.data['shop_id'])
  # product_serializer = ProductSerializer(productList,many=True)
  # return Response(product_serializer.data)
#TODO: Page Limit

@api_view(['get'])
def MerchantGetProduct(request,shop_id,product_id):
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE shop_id = %s AND product_id = %s"
  cursor.execute(statement,[shop_id,product_id])
  if cursor.rowcount == 0:
    return Response('Product not found',status=status.HTTP_200_OK)
  row = dictfetchone(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  # shop = Shop.objects.get(shop_id=shop_id)
  # shop_serializer = ShopSerializer(shop,many=False)
  # shop_id = shop_serializer.data['shop_id']
  # product = Product.objects.filter(shop_id=shop_id,product_id=product_id)
  # product_serializer = ProductSerializer(product,many=True)
  # return Response(product_serializer.data)

@api_view(['get'])
def MerchantGetComputerDescription(request,product_id):
  cursor = connection.cursor()
  statment = "SELECT * FROM Computer WHERE product_id = %s"
  cursor.execute(statment,[product_id])
  if cursor.rowcount == 0:
    return Response("No such product",status=status.HTTP_200_OK)
  row = dictfetchone(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  
  # computer = Computer.objects.get(product_id=product_id)
  # computer_serializer = ComputerSerializer(computer,many=False)
  # return Response(computer_serializer.data)

@api_view(['get'])
def MerchantGetCellphoneDescription(request,product_id):
  cursor = connection.cursor()
  statment = "SELECT * FROM Cellphone WHERE product_id = %s"
  cursor.execute(statment,[product_id])
  if cursor.rowcount == 0:
    return Response("No such product",status=status.HTTP_200_OK)
  row = dictfetchone(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  # cellphone = Cellphone.objects.get(product_id=product_id)
  # cellphone_serializer = CellphoneSerializer(cellphone,many=False)
  # return Response(cellphone_serializer.data)

@api_view(['get'])
def MerchantGetVideogameDescription(request,product_id):
  cursor = connection.cursor()
  statement = "SELECT * FROM Videogame WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("No such product",status=status.HTTP_200_OK)
  row = dictfetchone(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  # videogame = Videogame.objects.get(product_id=product_id)
  # videogame_serializer = VideoGameSerializer(videogame,many=False)
  # return Response(videogame_serializer.data)


@api_view(['get'])
def MerchantGetOrders(request,shop_id):
  cursor = connection.cursor()
  statement = "SELECT * FROM Orders WHERE Shop_ID = %s"
  cursor.execute(statement,[shop_id])
  row = dictfetchall(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  # shop = Shop.objects.get(shop_id=shop_id)
  # shop_serializer = ShopSerializer(shop,many=False)
  # shop_id = shop_serializer.data['shop_id']
  # orders = Orders.objects.filter(shop_id=shop_id)
  # orders_serializer = OrderSerializer(orders,many=True)
  # return Response(orders_serializer.data)

@api_view(['get'])
def MerchantGetOrder(request,shop_id,order_number):
  cursor = connection.cursor()
  statement = "SELECT * FROM Orders WHERE Shop_ID = %s AND order_number = %s"
  cursor.execute(statement,[shop_id,order_number])
  if cursor.rowcount == 0:
    return Response("Order not found",status=status.HTTP_200_OK)
  row = dictfetchone(cursor)
  return Response(row,status=status.HTTP_200_OK)
  
  # shop = Shop.objects.get(shop_id=shop_id)
  # shop_serializer = ShopSerializer(shop,many=False)
  # shop_id = shop_serializer.data['shop_id']
  # order = Orders.objects.filter(shop_id=shop_id,order_number=order_number)
  # order_serializer = OrderSerializer(order,many=True)
  # return Response(order_serializer.data)


@api_view(['PUT'])
def MerchantUpdateProduct(request,shop_id,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE shop_id = %s AND product_id = %s"
  cursor.execute(statement,[shop_id,product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  #update the product
  cursor = connection.cursor()
  statement = "UPDATE Product SET title = %s, price = %s, stock = %s, product_type = %s , brand_name = %s  WHERE shop_id = %s AND product_id = %s"
  cursor.execute(statement,[request.data['title'],request.data['price'],request.data['stock'],request.data['product_type'],request.data['brand_name'],shop_id,product_id])
  row = cursor.fetchone()
  return Response("Product Updated",status=status.HTTP_200_OK)

  # product = Product.objects.get(shop_id=shop_id,product_id=product_id)
  # serializer = ProductSerializer(instance=product,data=request.data)
  # if serializer.is_valid():
  #   serializer.update(product,serializer.validated_data)
  #   return Response("Product Updated",status=status.HTTP_200_OK)

@api_view(['PUT'])
def MerchantUpdateComputerDescription(request,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Computer WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  
  #update the computer
  with connection.cursor() as cursor:
    statement = "UPDATE computer SET ram = %s, storages = %s, size = %s WHERE product_id = %s"
    cursor.execute(statement,[request.data['ram'],request.data['storages'],request.data['size'],product_id])
    row = cursor.fetchone()
    return Response("Computer Description Updated",status=status.HTTP_200_OK)
    
   
@api_view(['PUT'])
def MerchantUpdateCellphoneDescription(request,product_id):
  # cellphone = Cellphone.objects.get(product_id=product_id)
  # cellphone_serializer = CellphoneSerializer(cellphone,many=False)
  # cellphone_serializer.update(cellphone_serializer.data,request.data)
  # return Response(cellphone_serializer.data)
  
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Cellphone WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  
  with connection.cursor() as cursor:
    statement = "UPDATE cellphone SET product_id = %s, storages = %s,color = %s  WHERE product_id = %s"
    cursor.execute(statement,[request.data['product_id'],request.data['storages'],request.data['color'],product_id])
    row = cursor.fetchone()
    return Response("Description Updated",status=status.HTTP_200_OK)

@api_view(['PUT'])
def MerchantUpdateVideogameDescription(request,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Videogame WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  with connection.cursor() as cursor:
    cursor.execute("UPDATE videogame SET game_platform = %s, product_id = %s WHERE product_id = %s",[request.data['game_platform'],request.data['product_id'],product_id])
    row = cursor.fetchone()
    return Response("Description Updated",status=status.HTTP_200_OK)

@api_view(['Post'])
def MerchantCreateProductItem(request,shop_id):
  #generate product id
  cursor = connection.cursor()
  statement = "SELECT MAX(product_id) FROM Product"
  cursor.execute(statement)
  Product_id = cursor.fetchone()[0] + 1
  #create product
  statement = "INSERT INTO Product (product_id,shop_id,title,price,stock,product_type,brand_name) VALUES (%s,%s,%s,%s,%s,%s,%s)"
  cursor.execute(statement,[Product_id,shop_id,request.data['title'],request.data['price'],request.data['stock'],request.data['product_type'],request.data['brand_name']])
  row = cursor.fetchone()
  return Response(Product_id,status=status.HTTP_200_OK)
  # product_item = ProductSerializer(data=request.data)
  # if product_item.is_valid():
  #   product_item.save()
  #   return Response(product_item.data,status=status.HTTP_201_CREATED)
  # else:
  #    return Response(product_item.errors, status=status.HTTP_400_BAD_REQUEST)
  
  
@api_view(['POST'])
def MerchantCreateComputerItem(request,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  
  #check if the description already exists
  statement = "SELECT * FROM Computer WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 1:
    return Response("Product already has a description",status=status.HTTP_200_OK)
  
  #update the computer
  statement = "INSERT INTO computer (product_id,ram,storages,size) VALUES (%s,%s,%s,%s) "
  cursor.execute(statement,[product_id,request.data['ram'],request.data['storages'],request.data['size']])
  row = cursor.fetchone()
  return Response("Computer Description Created",status=status.HTTP_200_OK)
  
  # computer_item = ComputerSerializer(data=request.data)
  # if computer_item.is_valid():
  #   computer_item.save()
  #   return Response(computer_item.data,status=status.HTTP_201_CREATED)
  # else:
  #    return Response(computer_item.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def MerchantCreateCellphoneItem(request,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  
  #check if the description already exists
  statement = "SELECT * FROM Cellphone WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 1:
    return Response("Product already has a description",status=status.HTTP_200_OK)
  
  #update the cellphone
  statement = "INSERT INTO cellphone (product_id,storages,color) VALUES (%s,%s,%s)"
  cursor.execute(statement,[product_id,request.data['storages'],request.data['color']])
  row = cursor.fetchone()
  return Response("Cellphone Description Created",status=status.HTTP_200_OK)
  
  # cellphone_item = CellphoneSerializer(data=request.data)
  # if cellphone_item.is_valid():
  #   cellphone_item.save()
  #   return Response(cellphone_item.data,status=status.HTTP_201_CREATED)
  # else:
  #    return Response(cellphone_item.errors, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['POST'])
def MerchantCreateVideogameItem(request,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  
  #check if the description already exists
  statement = "SELECT * FROM Videogame WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  if cursor.rowcount == 1:
    return Response("Product already has a description",status=status.HTTP_200_OK)
  
  #update the videogame
  statement = "INSERT INTO videogame (product_id,game_platform) VALUES (%s,%s)"
  cursor.execute(statement,[product_id,request.data['game_platform']])
  row = cursor.fetchone()
  return Response("Videogame Description Created",status=status.HTTP_200_OK)
  
  # videogame_item = VideoGameSerializer(data=request.data)
  # if videogame_item.is_valid():
  #   videogame_item.save()
  #   return Response(videogame_item.data,status=status.HTTP_201_CREATED)
  # else:
  #    return Response(videogame_item.errors, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['DELETE'])
def MerchantDeleteProduct(request,shop_id,product_id):
  #find the product
  cursor = connection.cursor()
  statement = "SELECT * FROM Product WHERE product_id = %s AND shop_id = %s"
  if cursor.rowcount == 0:
    return Response("Product not found",status=status.HTTP_200_OK)
  
  #delete the product
  statement = "DELETE FROM Product WHERE product_id = %s AND shop_id = %s"
  cursor.execute(statement,[product_id,shop_id])
  return Response("Product Deleted",status=status.HTTP_200_OK)

  # try:
  #   product = Product.objects.get(shop_id=shop_id,product_id=product_id)
  #   product.delete()
  #   return Response("Product Deleted",status=status.HTTP_200_OK)
  # except Product.DoesNotExist:
  #   return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['DELETE'])
def MerchantDeleteComputerDescription(request,product_id):
  #find the description
  cursor = connection.cursor()
  statement = "SELECT * FROM Computer WHERE product_id = %s"
  if cursor.rowcount == 0:
    return Response("Description not found",status=status.HTTP_200_OK)
  
  #delete the computer
  statement = "DELETE FROM Computer WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  return Response("Computer Description Deleted",status=status.HTTP_200_OK)
  
  # try:
  #   computer = Computer.objects.get(product_id=product_id)
  #   computer.delete()
  #   return Response("Computer Description Deleted",status=status.HTTP_200_OK)
  # except Computer.DoesNotExist:
  #   return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def MerchantDeleteCellphoneDescription(request,product_id):
  #find the description
  cursor = connection.cursor()
  statement = "SELECT * FROM Cellphone WHERE product_id = %s"
  if cursor.rowcount == 0:
    return Response("Description not found",status=status.HTTP_200_OK)
  
  #delete the cellphone
  statement = "DELETE FROM Cellphone WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  return Response("Cellphone Description Deleted",status=status.HTTP_200_OK)
  
#   try:
#     cellphone = Cellphone.objects.get(product_id=product_id)
#     cellphone.delete()
#     return Response("Cellphone Description Deleted",status=status.HTTP_200_OK)
#   except Cellphone.DoesNotExist:
#     return Response(status=status.HTTP_404_NOT_FOUND)
  
  
@api_view(['DELETE'])
def MerchantDeleteVideogameDescription(request,product_id):
  #find the description
  cursor = connection.cursor()
  statement = "SELECT * FROM Videogame WHERE product_id = %s"
  if cursor.rowcount == 0:
    return Response("Description not found",status=status.HTTP_200_OK)
  
  #delete the videogame
  statement = "DELETE FROM Videogame WHERE product_id = %s"
  cursor.execute(statement,[product_id])
  return Response("Videogame Description Deleted",status=status.HTTP_200_OK)
  
  # videogame = Videogame.objects.get(product_id=product_id)
  # if videogame:
  #   videogame.delete()
  #   return Response("Videogame Deleted",status=status.HTTP_200_OK)
  # return Response("Item not found",status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def MerchantSearchProducts(request,shop_id):
  with connection.cursor() as cursor:
    cursor.execute("SELECT Product_ID, Price, Product_Type , Stock ,Title FROM product WHERE shop_id = %s AND title LIKE %s",[request.data['shop_id'],request.data['title']])
    result_list = dictfetchall(cursor)
    return Response(result_list,status=status.HTTP_200_OK)

@api_view(['GET'])
def MerchantGetSales(request,shop_id):
  with connection.cursor() as cursor:
    # statement = "SELECT product.Title, getid.Selling_Quantity FROM product left join (SELECT Product_ID, COUNT(order_product.Product_ID) as Selling_Quantity FROM shop natural join orders left join order_product on orders.Order_number = order_product.Order_number WHERE shop_id = %s GROUP BY order_product.Product_ID) AS getid ON product.Product_ID = getid.Product_ID ORDER BY getid.Selling_Quantity DESC LIMIT 15;"
    statement = "SELECT product.Title, getid.Selling_Quantity FROM product left join (SELECT Product_ID, SUM(Quantity) AS Selling_Quantity FROM shop natural join orders left join order_product on orders.Order_Number = order_product.Order_Number WHERE shop_id = %s GROUP BY Product_ID) AS getid ON product.Product_ID = getid.Product_ID ORDER BY getid.Selling_Quantity DESC, product.Title ASC LIMIT 15;"
    cursor.execute(statement,[shop_id])
    result_list = dictfetchall(cursor)
    return Response(result_list,status=status.HTTP_200_OK)

@api_view(['GET'])
def MerchantGetVIP(request,shop_id,limit):
  with connection.cursor() as cursor:
    statement = "SELECT customer.Customer_ID, customer.Email, customer.Contact_number, getBuyNum.buyNum FROM customer natural join (SELECT orders.Customer_ID, COUNT(orders.Customer_ID) AS buyNum FROM shop natural join orders WHERE shop_id = %s group by orders.Customer_ID) AS getBuyNum ORDER BY getBuyNum.buyNum DESC LIMIT %s;"
    cursor.execute(statement,[shop_id,limit])
    result_list = dictfetchall(cursor)
    return Response(result_list,status=status.HTTP_200_OK)

@api_view(['PUT'])
def MerchantUpdateOrderStatus(request,shop_id,order_number):
  with connection.cursor() as cursor:
    statement = "UPDATE orders SET order_status = %s WHERE Order_number = %s"
    cursor.execute(statement,[request.data['order_status'],order_number])
    return Response("Order Status Updated",status=status.HTTP_200_OK)


  