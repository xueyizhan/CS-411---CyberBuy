from django.urls import path
from api.views import auth_views as views

urlpatterns = [
    # page for merchant to login
    path('login/merchant', views.MerchantLogin, name="merchant_login"),
    
    # page for merchant to register
    path('register/merchant', views.MerchantRegister, name="merchant_register"),
    
    #page for merchant to get his/her profile
    path('profile/merchant/<str:merchant_id>/',views.MerchantGetProfile,name="merchant_profile"),
    
    #page for customer to login
    path('login/customer', views.CustomerLogin, name="customer_login"),
    
    #page for customer to register
    path('register/customer', views.CustomerRegister, name="customer_register"),
]
