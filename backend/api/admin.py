from django.contrib import admin
from api.models import Product, Shop, Orders, Address, Customer, Merchant, OrderProduct,Payment,Videogame,Cellphone,Computer
# Register your models here.

admin.site.register(Product)
admin.site.register(Shop)
admin.site.register(Orders)
admin.site.register(OrderProduct)
admin.site.register(Merchant)
admin.site.register(Customer)
admin.site.register(Address)
admin.site.register(Payment)
admin.site.register(Videogame)
admin.site.register(Cellphone)
admin.site.register(Computer)


