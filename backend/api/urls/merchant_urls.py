from django.urls import path
from api.views import merchant_views as views


urlpatterns = [
  #page for merchant to create a shop
  path('<str:merchant_id>/create_shop/',views.MerchantCreateShop,name='create_shop'),
  
  #page to get shop info for merchant
  path('<str:merchant_id>/shop/',views.MerchantGetShop,name="merchant_shop"),
  
  #page to show all the products for a shop
  path('shop/<str:shop_id>/products/',views.MerchantGetProducts,name="MerchantGetProducts"),
  
  #page to show merchant the product detail for a product 
  path('shop/<str:shop_id>/products/<str:product_id>/',views.MerchantGetProduct,name="MerchantGetProduct"),
  
  #page to show merchant the product description for a computer
  path('shop/products/<str:product_id>/computer/description/',views.MerchantGetComputerDescription,name="MerchantGetProductDescription"),
  
  #page to show merchant the product description for a cellphone
  path('shop/products/<str:product_id>/cellphone/description/',views.MerchantGetCellphoneDescription,name="MerchantGetProductDescription"),
  
  #page to show merchant the product description for a videogame
  path('shop/products/<str:product_id>/videogame/description/',views.MerchantGetVideogameDescription,name="MerchantGetProductDescription"),
  
  #page to show all the orders for a shop
  path('shop/<str:shop_id>/orders/',views.MerchantGetOrders,name="MerchantGetOrders"),
  
  #page to show an orders for a shop
  path('shop/<str:shop_id>/orders/<str:order_number>/',views.MerchantGetOrder,name="MerchantGetOrder"),
  
  #page for merchant to create a product item
  path('shop/<str:shop_id>/products/productItem/create/',views.MerchantCreateProductItem,name="MerchantCreateProduct"),
  
  #page for merchant to add a computer item description
  path('shop/products/computerItem/<str:product_id>/description/create/',views.MerchantCreateComputerItem,name="MerchantCreateComputerItemDescription"),
  
  #page for merchant to add a cellphone item description
  path('shop/products/cellphoneItem/<str:product_id>/description/create/',views.MerchantCreateCellphoneItem,name="MerchantCreateCellphoneItemDescription"),

  #page for merchant to add a videogame item description
  path('shop/products/videogameItem/<str:product_id>/description/create/',views.MerchantCreateVideogameItem,name="MerchantCreateVideogameItemDescription"),

  #page to for merchant to update the product
  path('shop/<str:shop_id>/products/<str:product_id>/update/',views.MerchantUpdateProduct,name="MerchantUpdateProduct"),
  
  #page to for merchant to update the product description for a computer
  path('shop/products/<str:product_id>/computer/description/update/',views.MerchantUpdateComputerDescription,name="MerchantUpdateProductDescription"),

  #page to for merchant to update the product description for a cellphone
  path('shop/products/<str:product_id>/cellphone/description/update/',views.MerchantUpdateCellphoneDescription,name="MerchantUpdateProductDescription"),
  
  #page to for merchant to update the product description for a videogame
  path('shop/products/<str:product_id>/videogame/description/update/',views.MerchantUpdateVideogameDescription,name="MerchantUpdateProductDescription"),
  
  #page to for merchant to delete the product
  path('shop/<str:shop_id>/products/<str:product_id>/delete/',views.MerchantDeleteProduct,name="MerchantDeleteProduct"),
  
  #page to for merchant to delete the product description for a computer
  path('shop/products/<str:product_id>/computer/description/delete/',views.MerchantDeleteComputerDescription,name="MerchantDeleteComputerDescription"),
  
  #page to for merchant to delete the product description for a cellphone
  path('shop/products/<str:product_id>/cellphone/description/delete/',views.MerchantDeleteCellphoneDescription,name="MerchantDeleteCellphoneDescription"),
  
  #page to for merchant to delete the product description for a videogame
  path('shop/products/<str:product_id>/videogame/description/delete/',views.MerchantDeleteVideogameDescription,name="MerchantDeleteVideogameDescription"),
  
  #page to for merchant to perform a keyword search
  path('shop/<str:shop_id>/search/products/',views.MerchantSearchProducts,name="MerchantSearchProducts"),
  
  #page to for merchant to get sales report
  path('shop/<str:shop_id>/sales/',views.MerchantGetSales,name="MerchantGetSales"),
  
  #page to for merchant to get vip customers
  path('shop/<str:shop_id>/vip/<int:limit>',views.MerchantGetVIP,name="MerchantGetVIP"),

  #page to for merchant to update the order status
  path('shop/<str:shop_id>/orders/<str:order_number>/update/',views.MerchantUpdateOrderStatus,name="MerchantUpdateOrderStatus"),
]
