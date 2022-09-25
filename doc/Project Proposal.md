## Project Title
CyberBuy Electronic Supplies E-Commerce Platform


## Project Summary:
Cyberbuy is a website that aims to provide sellers and customers with a convenient way to shop for electronic supplies. Our website only allows official self-operating in order to help customers get a better understanding of the products and get relatively low prices. Also, our website only focuses on the sale of electronic products, where most customers have a strong desire to buy electronic products so that merchants can access quality customer resources. The project aims to build a professional shopping platform for electronic products, where customers can compare various brands at and choose the most suitable products for them.


## Description:
We aim at establishing an e-commerce website, that targets on selling computer and communication supplies to our customers. Our ‘start-up’ inspiration originates from existing electronics shopping platforms in the current US domestic market, like Best Buy, B&H, etc. Comparing with the existed electronic supplies shopping platform, some so-called electronic product market is a mixed bag. For instance, Best Buy sells health and wellness products even like mattresses, which has gradually evolved into a 'supermarket'. Meanwhile, many e-commerce platforms like Amazon also allow other merchants to sell similar products independently apart from proprietary trading, which results in inconsistent product prices and product qualities. Hence, we plan to only sell electronic products (such as computers, cellphones, etc.), and only allow official self-operating. Since our ‘industry’ is just getting started, we currently only sell small electronic products like computers & tablets, and communication tools like mobile phones, audios. Any large electronic appliances like washing machines, refrigerators are not in our consideration yet.

On our website, we will classify the products into several categories, such as computers and laptops, mobile phones, office supplies, and set up a menu bar and search engine on the homepage to guide users easily. Like common e-commerce websites, our platform also contains Member/User Registration function to facilitate the management of user information, as well as Order Tracking and After-Sales Service after the user places an order. Innovatively, we add a Customer Behavior Analysis on our website, which Best Buy and Amazon don’t have. Detailed introduction of Customer Behavior Analysis is written in our Usefulness interpretation below.


## Usefulness:
Similar e-commerce platforms like Best Buy, Amazon already has provided a great example supply chain that connects with manufacturer, website administrator and customer. We imitate the business model of BB and Amazon to divide the application into two core functions: inventory management and selling merchandises. At the same time, we cooperate with logistics companies to provide logistics query windows.

Additionally, our website creates some powerful features. We regularly produce sales reports for merchants to help them analyze each product. For example, merchants can see the sales comparison of each product in the report and find the reasons for improving the products that are not selling well. Also, we can provide order tracking services for merchants and customers to help users check the status of their deliveries. We plan to visualize the order tracking service in the future to better serve merchants and customers. Finally, customers and merchants will use the same platform to access our website, which can help customers and merchants communicate better.


## Realness:
For Customers’ and Administrators’ data, we will try to create some dummy data using online data generator, since our application hasn’t launched yet, that we could not get real data; meanwhile, we will also invite some of our friends to sign up as users on our website and simulate shopping on our website to get real data.

For Products’ data, we will crawl information of similar products from other shopping sites like AliExpress, Amazon.

Also, there are some public databases that we will use as a reference, like Kaggle and Google’s Dataset Search. Like on Kaggle, as we type in ‘computer selling’ in their search engine, laptop products’ basic information will appear in the webpage under the link ‘Laptop Specs and latest price’, we can also learn computer products’ selling condition through dataset ‘Amazon TOP 50 selling computer products’.
（relative link: https://www.kaggle.com/datasets/kuchhbhi/latest-laptop-price-list, https://www.kaggle.com/datasets/avishkarpatil23/amazon-top-50-selling-computer-products）


## Functionality & UI mockup:
### 1. Home Page
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6ilky50vej20li0fggmd.jpg)

The home page provides a navigation bar with functionalities like login/register, go to product list and so on. 

### 2. Login/Register page
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6imts24cdj20ew0b13yk.jpg)

The login/register page allows user to login or register.

### 3. Account Page
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6in1pspb7j20ke0ei74k.jpg)

If user is logged in as a customer, then the account page would show options to edit personal details and view purchase history.

### 4. Product Page - Customer
<img width="395" alt="image" src="https://user-images.githubusercontent.com/112656252/192125424-76ee2082-d712-45d5-bddf-418056703ff6.png">

The product page contains a product list that can be filtered with price, condition, and delivery options. This page as well provides product categories and search boxes, helping customers to find products easier.

### 5. Product Detail Page - Customer
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6in2z9nf9j20ly0ggabc.jpg)

The product detail page contains the information about a product, user could view the product information and add the product to cart.

### 6. Cart Page - Customer
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6in3rcdb2j20jk0de74o.jpg)

The cart page gives a list of products the users had added to the cart. Users could edit the number of products and place an order on this page.

### 7. Order Submit Page - Customer
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6in53g6yjj20lw0ewglv.jpg)

This page is to confirm an order has been placed successfully while provide a valid order number. 

### 8. Purchase History Page - Customer
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6in5y8vofj20q00ii0te.jpg)

This page provides a view for users’ purchased product, user could check the order status for this product.

### 9. Order status Page - Customer
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6ingzxi4cj20ke0eidg1.jpg)

This page showed the order status for a specific product with a dynamic process bar.

### 10. Start Page - Seller
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6injltjcfj20q00igmy8.jpg)

If the user logins in as a seller, he will be redirected to this page. The user can choose to upload products, view products, update products, view orders, and view the selling report.

### 11. Upload Product Pages - Seller
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6inkd9puvj20q00ii3yv.jpg)

In this page, the sellers can upload new product to their online shop. The information includes product name, product type(select), price, stock, and description. The sellers are also required to upload an image for  the new product.

### 12. View Product Pages - Seller
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6inocrwywj20q00ikjs1.jpg)

In this page, sellers can view the information about their products. By clicking on the update button, they can enter the Update products page to revise the information of the products.

### 13. Update Products Page - Seller
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6inp97o8mj20lw0em3yn.jpg)

In this page, the sellers can update the information of their products.

### 14. View Order Page - Seller
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6inq9is9cj20ko0e8dg5.jpg)

In this page, the sellers can view their current orders. They can see the customerID, orderID and Status. By clicking on the update page, they can update the status of the order.

### 15. Update order page
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6inv2adiqj20ma0f4mx9.jpg)

In this page, the sellers can change the status of the order.

### 16. Selling Reports - Seller
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6invyjt3wj20q00iadgi.jpg)

In this page, the sellers can view their monthly selling report.

### 17. Main Page - Administrator
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6inwqe2b6j20q00i8wff.jpg)

If the user logins in as an admin, he will be redirected to this page. The user can choose to update information and view orders.

### 18. Current Order Page - Administrator
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6iny0rn6nj20q00ict9b.jpg)

The admin can also view the orders and edit them. They can also see the sellerID of the order.

### 19. Upload Info Page - Administrator
![](https://tva1.sinaimg.cn/large/e6c9d24egy1h6io08we7lj20q00i83ys.jpg)

In this page the admin can change the information on Contact us and About us pages.

