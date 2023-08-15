# PG Database Definition 

## __Files__
```javascript
Products 
   Products_Offers // Ofertas
   ProductsUsers   // Archivo de favoritos 
Orders             // Carrito de Compras
   Order_items     // Detalle del carrito de compras (productos)
User 
References
```
[Look at DER image](https://dbdiagram.io/d/62bf0e5969be0b672c8227b8)

## __Version 1.6__

```
Created 
    Loader/references.js 
Use in
    api/Index.js 
Action
    carga la tabla de referencias     
```

```javascript
//Postman Links to try 

http://localhost:3001/products      get
    ID   http://localhost:3001/products?id=1
    NAME http://localhost:3001/products?name=SUTER
http://localhost:3001/references    get
http://localhost:3001/references    post 
       Example Body
           { "id_ref":"3","cod":"0","descrip":"Tarjetas de credito"}
```

## User 
// Postan Links 
```javascript 
http://localhost:3001/User       get
http://localhost:3001/User       post
       Example Body
    {"email":"jhon.doe@gmail.com","full_name":"Jhon Doe","profile":"2","status":1}
    {"email":"jhon.administrator@gmail.com","full_name":"Jhon Administrator","profile":"1","status":1}

http://localhost:3001/User?id=1      put
    {"email":"jhonadministra@gmail.com","full_name":"Jhon Administrator","profile":"1","status":1}

Email http://localhost:3001/User?name=juan Get
```