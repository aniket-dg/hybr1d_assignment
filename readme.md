# REST API for an e-commerce marketplace

## Clone the Project
    
    git clone https://github.com/aniket-dg/hybr1d_assignment.git

## Install
    cd hybr1d_assignment
    npm install

## Run the app

    nodemon run app.js

## Server lisen on

    http://localhost:9000/

# REST API

The REST API to the example app is described below.

## Auth APIs


### Request

`POST /users/register/`

    curl --location --request POST 'http://localhost:9000/users/register'
    --header 'Content-Type: application/json' 
    --data-raw '{
         "username": "username",
         "password": "Test@321"
    }'

    # seller: true(optional)            // this attribute is for creating seller

### Response

    {
        "message": "User Created"
    }

### Request

`POST /users/login/`

    curl --location --request POST 'http://localhost:9000/users/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "aniketdg",
        "password": "Test@321"
    }'

### Response

    {
        "message": "Authentication Successfull",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWtldGRnIiwidXNlcklkIjoiNjJlMTYxNzFmMmRmZmE0MTE2Y2VmYmYzIiwiaWF0IjoxNjU4OTg4MzgzLCJleHAiOjE2NTg5OTE5ODN9.ER7lDlj_f2si872gabferqzKQFXKJY6PQhWfuVhsb0c"
    }


## APIs for buyers

### Request

`GET /buyer/list-of-seller/`

    curl --location --request GET 'http://localhost:9000/buyer/list-of-sellers/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWtldGRnIiwidXNlcklkIjoiNjJlMTYxNzFmMmRmZmE0MTE2Y2VmYmYzIiwiaWF0IjoxNjU4OTg4MzgzLCJleHAiOjE2NTg5OTE5ODN9.ER7lDlj_f2si872gabferqzKQFXKJY6PQhWfuVhsb0c"
    }'

### Response

    [
        {
            "_id": "62e17154d9e0a1489412938f"
        },
        {
            "_id": "62e17d9c355a8b0e0a90c6a6"
        }
    ]


### Request

`GET /buyer/seller-catalog/:seller_id`

    curl --location --request GET 'http://localhost:9000/buyer/seller-catalog/62e17d9c355a8b0e0a90c6a6' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWtldGRnIiwidXNlcklkIjoiNjJlMTYxNzFmMmRmZmE0MTE2Y2VmYmYzIiwiaWF0IjoxNjU4OTg4MzgzLCJleHAiOjE2NTg5OTE5ODN9.ER7lDlj_f2si872gabferqzKQFXKJY6PQhWfuVhsb0c"
    }'

### Response

    [
        {
            "_id": "62e1841d68ab31a00df9bd67",
            "name": "Product 1",
            "price": 100,
            "seller": "62e17d9c355a8b0e0a90c6a6",
            "__v": 0
        },
        {
            "_id": "62e1841d68ab31a00df9bd68",
            "name": "Product 2",
            "price": 200,
            "seller": "62e17d9c355a8b0e0a90c6a6",
            "__v": 0
        },
        {
            "_id": "62e1842f68ab31a00df9bd6e",
            "name": "Product 1",
            "price": 100,
            "seller": "62e17d9c355a8b0e0a90c6a6",
            "__v": 0
        }
    ]


### Request

`POST /api/buyer/create-order/:seller_id`

    curl --location --request POST 'http://localhost:9000/buyer/create-order/62e17d9c355a8b0e0a90c6a6' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "orders": [
           {
               "productId": "62e1841d68ab31a00df9bd67",
               "quantity": 3
           },
           {
               "productId": "62e1841d68ab31a00df9bd68",
               "quantity": 30
           }
       ],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWtldGRnIiwidXNlcklkIjoiNjJlMTYxNzFmMmRmZmE0MTE2Y2VmYmYzIiwiaWF0IjoxNjU4OTg4MzgzLCJleHAiOjE2NTg5OTE5ODN9.ER7lDlj_f2si872gabferqzKQFXKJY6PQhWfuVhsb0c"
    }'

### Response

    {
        "result": "Order Placed!"
    }

## APIs for sellers

### Request

`GET /seller/create-catalog`

    curl --location --request POST 'http://localhost:9000/seller/create-catalog/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "products": [
           {
               "name": "Product Name 1",
               "price": 1000
           },
           {
               "name": "Product Name 2",
               "price": 2000
           }
    
       ],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlbGxlcnIiLCJ1c2VySWQiOiI2MmUxN2Q5YzM1NWE4YjBlMGE5MGM2YTYiLCJpYXQiOjE2NTg5ODkyNjcsImV4cCI6MTY1ODk5Mjg2N30.i5sEsqiZv89fp7oZpiUZzoUULoqbnHRAIlGyw8ViRJE"
    }'

### Response

    {
        "result": "Products added!"
    }


### Request

`GET /seller/orders/`

    curl --location --request GET 'http://localhost:9000/seller/orders/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlbGxlcnIiLCJ1c2VySWQiOiI2MmUxN2Q5YzM1NWE4YjBlMGE5MGM2YTYiLCJpYXQiOjE2NTg5ODkyNjcsImV4cCI6MTY1ODk5Mjg2N30.i5sEsqiZv89fp7oZpiUZzoUULoqbnHRAIlGyw8ViRJE"
    }'

### Response

    [
    {
        "_id": "62e2146cd4ab3e0eb434f9da",
        "userId": "62e16171f2dffa4116cefbf3",
        "productName": "Product Name 1",
        "quantity": 1,
        "price": 1000,
        "isOrdered": true,
        "seller": "62e17d9c355a8b0e0a90c6a6",
        "__v": 0
    },
    {
        "_id": "62e2146cd4ab3e0eb434f9dd",
        "userId": "62e16171f2dffa4116cefbf3",
        "productName": "Product Name 2",
        "quantity": 3,
        "price": 6000,
        "isOrdered": true,
        "seller": "62e17d9c355a8b0e0a90c6a6",
        "__v": 0
    },
