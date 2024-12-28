# Indiazona


# Indiazona-Backend

## Description
Indiazona-Backend Service is to manage product data in mysql. We can get products list by applying filters like price, brand, color from mysql database using APIs. It is developed using javascript programming language with express.js nodejs framework.

## Installation
We have created https://github.com/sampreeth-007/Indiazona git repository. Clone the Code using below command:
```bash
$ git@github.com:sampreeth-007/Indiazona.git
```

## Running the app

- cd into `indiazona-backend`
- run `npm install`
- Add below params in .env file
```bash
PORT=xxxxxxxxxxxxxxxxxxxxxxxx
PRODUCT_COLORS=xxxxxxxxxxxxxxxxxxxxxxxx
PRODUCT_BRANDS=xxxxxxxxxxxxxxxxxxxxxxxx
DB_HOST=xxxxxxxxxxxxxxxxxxxxxxxx
DB_USER=xxxxxxxxxxxxxxxxxxxxxxxx
DB_PASSWORD=xxxxxxxxxxxxxxxxxxxxxxxx
DB_NAME=xxxxxxxxxxxxxxxxxxxxxxxx
```
- run `npm run start`
- trigger the below API request from postman:
```bash
curl --location 'http://localhost:8090/api/v1/products/list?minPrice=500&maxPrice=10000&brand=Apple%2CSamsung&color=Black%2CWhite&page=1&size=4'
```


# Indiazona-Frontend

## Description
Indiazona-Frontend Service is to display product data in UI. We can get products list by applying filters like price, brand, color. It is developed using javascript programming language with React.js framework.

## Installation
We have created https://github.com/sampreeth-007/Indiazona git repository. Clone the Code using below command:
```bash
$ git@github.com:sampreeth-007/Indiazona.git
```

## Running the app

- cd into `indiazona-frontend`
- run `npm install`
- run `npm start`
- It'll redirect to the web page. We can see the products data by applying filters in UI.