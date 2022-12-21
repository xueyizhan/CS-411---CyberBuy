from django.urls import path
from api.views import customer_views as views
from api.utils import transaction_with_trigger as tt

urlpatterns = [
    #page for customer to get his/her profile
    path('profile/<str:customer_id>/',views.CustomerGetProfile,name="customer_profile"),
    
    #page for customer to update his/her profile
    path('profile/<str:customer_id>/update/',views.CustomerUpdateProfile,name="customer_update_profile"),
    
    #page for customer to get his/her address
    path('profile/address/<str:address_id>/',views.CustomerGetAddress,name="customer_address"),

    #page for customer to update his/her address
    path('profile/address/<str:address_id>/update/',views.CustomerUpdateAddress,name="customer_update_address"),

    #page for customer to get his/her orders
    path('profile/orders/<str:customer_id>/',views.CustomerGetOrders,name="customer_orders"),

    #page for customer to get his/her order details
    path('profile/orders/<str:Order_Number>/details/',views.CustomerGetOrder,name="customer_order_details"),

    #page for customer to get all computers
    path('show/computer/',views.CustomerShowComputers,name="customer_show_computer"),

    #page for customer to get computer details
    path('show/computer/<str:Product_ID>/',views.CustomerShowComputer,name="customer_show_computer_details"),

    #page for customer to get all cellphones
    path('show/cellphone/',views.CustomerShowCellphones,name="customer_show_cellphone"),

    #page for customer to get cellphone details
    path('show/cellphone/<str:Product_ID>/',views.CustomerShowCellphone,name="customer_show_cellphone_details"),

    #page for customer to get all video games
    path('show/videogame/',views.CustomerShowVideoGames,name="customer_show_videogame"),

    #page for customer to get video game details
    path('show/videogame/<str:Product_ID>/',views.CustomerShowVideoGame,name="customer_show_videogame_details"),

    #page for customer to operate keyword search
    path('search/<str:keyword>',views.CustomerSearch,name="customer_search"),

    #page for customer to get all products 
    path('show/all/',views.CustomerGetAllProducts,name="customer_show_all"),
    
    #page for customer to add product to cart
    path('cart/add/',views.CustomerAddToCart,name="customer_add_to_cart"),
    
    #page for customer to get his/her cart
    path('cart/<str:customer_id>/',views.CustomerGetCart,name="customer_get_cart"),
    
    #page for customer to update his/her cart
    path('cart/<str:customer_id>/update/',views.CustomerUpdateCart,name="customer_update_cart"),
    
    #page for customer to delete his/her cart product
    path('cart/<str:customer_id>/delete/<str:product_id>/',views.CustomerDeleteCartProduct,name="customer_delete_cart"),
    
    #page for customer to place an order
    path('place/order/<str:customer_id>',tt.placeOrder,name="customer_place_order"),
    
    #page for customer to view his/her special offers
    path('special/offers/<str:customer_id>',views.CustomerGetSpecialOffers,name="customer_get_special_offers"),
    
    #page for customer to check coupon
    path('check/coupon/<str:customer_id>',views.CustomerCheckCoupon,name="customer_check_coupon"),
    ]
