from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
    
def dictfetchone(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return dict(zip(columns, cursor.fetchone()))

@api_view(['put'])
def MerchantLogin(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Merchant WHERE email = %s AND password = %s",[request.data['email'],request.data['password']])
    if cursor.rowcount == 0:
        return Response(False,status=status.HTTP_200_OK)
    row = dictfetchone(cursor)
    return Response(row['Merchant_ID'],status=status.HTTP_200_OK)
  
@api_view(['get'])
def  MerchantGetProfile(request,merchant_id):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Merchant WHERE merchant_id = %s",[merchant_id])
    if cursor.rowcount == 0:
        return Response(False,status=status.HTTP_200_OK)
    row = dictfetchall(cursor)
    return Response(row,status=status.HTTP_200_OK)
  
@api_view(['POST'])
def MerchantRegister(request):
    cursor = connection.cursor()
    cursor.execute("SELECT MAX(merchant_id) FROM Merchant")
    generated_id = cursor.fetchone()[0] + 1
    cursor.execute("SELECT * FROM Merchant WHERE email = %s",[request.data['email']])
    if cursor.rowcount != 0:
        return Response("The email has been used!",status=status.HTTP_200_OK)
    statement = "INSERT INTO Merchant (merchant_id,email,password,username) VALUES (%s,%s, %s,%s)"
    cursor.execute(statement,[generated_id,request.data['email'],request.data['password'],request.data['username']])
    
    # cursor.execute("INSERT INTO Merchant (email,password,username) VALUES (%s,%s,%s)",[request.data['email'],request.data['password'],request.data['user_name']])
    return Response(True,status=status.HTTP_200_OK)

@api_view(['put'])
def CustomerLogin(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Customer WHERE email = %s AND password = %s",[request.data['email'],request.data['password']])
    if cursor.rowcount == 0:
        return Response(False,status=status.HTTP_200_OK)
    row = dictfetchone(cursor)
    return Response(row['Customer_ID'],status=status.HTTP_200_OK)

@api_view(['POST'])
def CustomerRegister(request):
    """ Note that this function would generate a empty address record for the customer """
    #generate customer id
    cursor = connection.cursor()
    cursor.execute("SELECT MAX(customer_id) FROM Customer")
    generated_id = cursor.fetchone()[0] + 1
    cursor.execute("SELECT * FROM Customer WHERE email = %s",[request.data['email']])
    # return Response("we generate id for customer",status=status.HTTP_200_OK)
    if cursor.rowcount != 0:
        return Response("The email has been used!",status=status.HTTP_200_OK)
    #generate address id
    statement = "SELECT MAX(address_id) FROM Address"
    cursor.execute(statement)
    generate_address_id = cursor.fetchone()[0] + 1
    #insert address
    null = None
    statement = "INSERT INTO Address (address_id,street_line,state,zip_code) VALUES (%s,%s,%s,%s)"
    cursor.execute(statement,[generate_address_id,null,null,null])
    if cursor.rowcount == 0:
        return Response("something wrong with the address",status=status.HTTP_200_OK)
    
    #insert customer info into customer table
    statement = "INSERT INTO Customer (customer_id,Email,Password,Username,Contact_number,Last_name,First_name,Address_ID) VALUES (%s,%s, %s,%s,%s,%s,%s,%s)"
    cursor.execute(statement,[generated_id,request.data['email'],request.data['password'],request.data['username'],request.data['contact_number'],request.data['last_name'],request.data['first_name'],generate_address_id])
    return Response(True,status=status.HTTP_200_OK)

    
  
    