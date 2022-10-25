## DDL COMMAND
create table Payment (
  Payment_ID int primary key,
  Payment_amount real,
  Payment_type varchar(20),
  Card_number int
);

create table Shop (
  Shop_ID int primary key,
  Shop_Name varchar(20),
  Contact_Number varchar(20)
);

create table Address (
  Address_ID int primary key,
  State varchar(15),
  Street_line varchar(255),
  Zip_code int
);

create table Customer (
  Customer_ID int primary key,
  Email varchar(255),
  Contact_number varchar(20),
  Last_name varchar(20),
  First_name varchar(20),
  Password varchar(20),
  Address_ID int,
  foreign key (Address_ID) references Address(Address_ID)
    on delete set null
    on update cascade
);

create table Merchant (
  Merchant_ID int primary key, 
  Email varchar(20),
  Password varchar(50),
  Shop_ID int,
  foreign key (Shop_ID) references Shop(Shop_ID)
    on delete set null
    on update cascade
);

create table Product(
    Product_ID int primary key,
    Title varchar(255),
    Stock int,
    Price real,
    Product_Type varchar(20),
    Shop_ID int,
    foreign key (Shop_ID) references Shop(Shop_ID)
      on delete set null
      on update cascade
	);

create table Computer (
    Product_ID int,
    RAM int,
    Storages int,
    Size real,
    foreign key (Product_ID) references Product(Product_ID)
      on delete set null
      on update cascade
	);
   
create table Game(
    Product_ID int,
    Game_Name varchar(30),
    foreign key (Product_ID) references Product(Product_ID)
      on delete set null
      on update cascade
	);
   
create table Cellphone(
    Product_ID int,
    Storages int,
    Color varchar(20),
    foreign key (Product_ID) references Product(Product_ID)
        on delete set null
        on update cascade
	);

create table Orders (
  Order_number int primary key,
  Order_status varchar(20),
  Order_date varchar(20),
  Customer_ID int,
  Payment_ID int,
  Shop_ID int,
  Product_ID int,
  foreign key (Customer_ID) references Customer(Customer_ID)
    on delete set null
    on update cascade,
  foreign key (Payment_ID) references Payment(Payment_ID)
    on delete set null
    on update cascade,
  foreign key (Shop_ID) references Shop(Shop_ID)
    on delete set null
    on update cascade,
  foreign key (Product_ID) references Product(Product_ID)
    on delete set null
    on update cascade
);

create table Shop_order (
  Shop_ID int,
  Order_number int,
  foreign key (Shop_ID) references Shop(Shop_ID)
    on delete set null
    on update cascade,
  foreign key (Order_number) references Orders(Order_number)
    on delete set null
    on update cascade
);
   
create table Order_Product(
    Product_ID int,
    Order_number int,
    Quantity int,
    foreign key (Product_ID) references Product(Product_ID)
        on delete set null
        on update cascade,
    foreign key (Order_number) references Orders(Order_number)
        on delete set null
        on update cascade
);



## Advanced Queries
### Query 1:
SELECT product.Title, product.Price, getid.Selling_Quantity
FROM product LEFT JOIN (
     SELECT Product_ID, COUNT(order_product.Product_ID) as Selling_Quantity
     FROM shop NATURAL JOIN shop_order
     LEFT JOIN order_product ON shop_order.Order_number = order_product.Order_number
     WHERE Shop_name = 'Google'
     GROUP BY order_product.Product_ID) AS getid ON product.Product_ID = getid.Product_ID
ORDER BY getid.Selling_Quantity DESC
LIMIT 15;
### Query 2:
SELECT customer.Customer_ID, customer.Email, customer.Contact_Number, getBuyNum.buyNum
FROM customer NATURAL JOIN (
      SELECT orders.Customer_ID, COUNT(orders.Customer_ID) AS buyNum
      FROM shop NATURAL JOIN shop_order 
      LEFT JOIN orders ON shop_order.Order_number = orders.Order_number
      WHERE shop.Shop_Name = 'Acer'
      GROUP BY orders.Customer_ID) AS getBuyNum
ORDER BY getBuyNum.buyNum DESC
LIMIT 15;



## Indexes
### Index 1:
CREATE INDEX index_Shop_Name ON shop(Shop_Name);
### Index 2:
CREATE INDEX index_product_title ON product(Title);
### Index 3:
CREATE INDEX index_product_price on product(Price);


