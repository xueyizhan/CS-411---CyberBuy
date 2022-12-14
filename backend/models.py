# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    address_id = models.IntegerField(db_column='Address_ID', primary_key=True)  # Field name made lowercase.
    state = models.CharField(db_column='State', max_length=15, blank=True, null=True)  # Field name made lowercase.
    street_line = models.CharField(db_column='Street_line', max_length=255, blank=True, null=True)  # Field name made lowercase.
    zip_code = models.IntegerField(db_column='Zip_code', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'address'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Cart(models.Model):
    product = models.ForeignKey('Product', models.DO_NOTHING, db_column='Product_ID')  # Field name made lowercase.
    customer = models.ForeignKey('Customer', models.DO_NOTHING, db_column='Customer_ID')  # Field name made lowercase.
    quantity = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'cart'


class Cellphone(models.Model):
    product = models.ForeignKey('Product', models.DO_NOTHING, db_column='Product_ID', blank=True, null=True)  # Field name made lowercase.
    storages = models.CharField(db_column='Storages', max_length=20, blank=True, null=True)  # Field name made lowercase.
    color = models.CharField(db_column='Color', max_length=20, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cellphone'


class Computer(models.Model):
    product = models.ForeignKey('Product', models.DO_NOTHING, db_column='Product_ID', blank=True, null=True)  # Field name made lowercase.
    ram = models.CharField(db_column='RAM', max_length=20, blank=True, null=True)  # Field name made lowercase.
    storages = models.CharField(db_column='Storages', max_length=20, blank=True, null=True)  # Field name made lowercase.
    size = models.FloatField(db_column='Size', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'computer'


class Customer(models.Model):
    customer_id = models.IntegerField(db_column='Customer_ID', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
    contact_number = models.CharField(db_column='Contact_number', max_length=20, blank=True, null=True)  # Field name made lowercase.
    last_name = models.CharField(db_column='Last_name', max_length=20, blank=True, null=True)  # Field name made lowercase.
    first_name = models.CharField(db_column='First_name', max_length=20, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=20, blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(db_column='Username', max_length=30, blank=True, null=True)  # Field name made lowercase.
    address = models.ForeignKey(Address, models.DO_NOTHING, db_column='Address_ID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'customer'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Merchant(models.Model):
    merchant_id = models.IntegerField(db_column='Merchant_ID', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=50, blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(db_column='Username', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'merchant'


class OrderProduct(models.Model):
    product = models.ForeignKey('Product', models.DO_NOTHING, db_column='Product_ID', blank=True, null=True)  # Field name made lowercase.
    order_number = models.ForeignKey('Orders', models.DO_NOTHING, db_column='Order_number', blank=True, null=True)  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'order_product'


class Orders(models.Model):
    customer = models.ForeignKey(Customer, models.DO_NOTHING, db_column='Customer_ID', blank=True, null=True)  # Field name made lowercase.
    order_number = models.IntegerField(db_column='Order_Number', primary_key=True)  # Field name made lowercase.
    order_date = models.CharField(db_column='Order_Date', max_length=20, blank=True, null=True)  # Field name made lowercase.
    order_status = models.CharField(db_column='Order_Status', max_length=20, blank=True, null=True)  # Field name made lowercase.
    shop = models.ForeignKey('Shop', models.DO_NOTHING, db_column='Shop_ID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'orders'


class Payment(models.Model):
    payment_id = models.IntegerField(db_column='Payment_ID', primary_key=True)  # Field name made lowercase.
    payment_amount = models.FloatField(db_column='Payment_amount', blank=True, null=True)  # Field name made lowercase.
    payment_type = models.CharField(db_column='Payment_type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    card_number = models.IntegerField(db_column='Card_number', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'payment'


class Product(models.Model):
    product_id = models.IntegerField(db_column='Product_ID', primary_key=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    stock = models.IntegerField(db_column='Stock', blank=True, null=True)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    product_type = models.CharField(db_column='Product_Type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    brand_name = models.CharField(db_column='Brand_Name', max_length=20, blank=True, null=True)  # Field name made lowercase.
    shop = models.ForeignKey('Shop', models.DO_NOTHING, db_column='Shop_ID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'product'


class Shop(models.Model):
    shop_id = models.IntegerField(db_column='Shop_ID', primary_key=True)  # Field name made lowercase.
    shop_name = models.CharField(db_column='Shop_Name', max_length=20, blank=True, null=True)  # Field name made lowercase.
    contact_number = models.CharField(db_column='Contact_Number', max_length=20, blank=True, null=True)  # Field name made lowercase.
    merchant = models.ForeignKey(Merchant, models.DO_NOTHING, db_column='Merchant_ID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'shop'


class ShopOrder(models.Model):
    shop = models.ForeignKey(Shop, models.DO_NOTHING, db_column='Shop_ID', blank=True, null=True)  # Field name made lowercase.
    order_number = models.ForeignKey(Orders, models.DO_NOTHING, db_column='Order_number', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'shop_order'


class Videogame(models.Model):
    product = models.ForeignKey(Product, models.DO_NOTHING, db_column='Product_ID', blank=True, null=True)  # Field name made lowercase.
    game_platform = models.CharField(db_column='Game_Platform', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'videogame'
