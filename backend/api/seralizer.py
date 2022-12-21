from rest_framework import serializers
from api.models import Product,Shop,Merchant,Orders,Computer,Cellphone,Videogame
from djoser.serializers import UserCreateSerializer


class MerchantCreateSerializer(UserCreateSerializer):
  class Meta(UserCreateSerializer.Meta):
    model = Merchant
    fields = ('id','username','email','password')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.title = validated_data.get('title', instance.title)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.price = validated_data.get('price', instance.price)
        instance.product_type = validated_data.get('product_type', instance.product_type)
        instance.brand_name = validated_data.get('brand_name', instance.brand_name)
        instance.shop = validated_data.get('shop', instance.shop)
        instance.save()
        return instance

class ComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = '__all__'
        
    def create(self, validated_data):
        return Computer.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.ram = validated_data.get('ram', instance.ram)
        instance.storages = validated_data.get('storages', instance.storages)
        instance.size = validated_data.get('size', instance.size)
        instance.save()
        return instance
    
class CellphoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cellphone
        fields = '__all__'
        
    def create(self, validated_data):
        return Cellphone.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.storages = validated_data.get('storages', instance.storages)
        instance.color = validated_data.get('color', instance.color)
        instance.save()
        return instance
    
class VideoGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videogame
        fields = '__all__'
        
    def create(self, validated_data):
        return Videogame.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.game_platform = validated_data.get('game_platform', instance.game_platform)
        instance.save()
        return instance
class MerchantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchant
        fields = '__all__'

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

