# Category
            GET    url: http://localhost:3001/category    

# Filtros    
            GET    url: http://localhost:3001/filters    (todos los campos necesarios para los select)
            GET    url: http://localhost:3001/filters/product BODY {"type":"Blanco"}

# Place  (Provincia)         
            GET    url: http://localhost:3001/location
            POST   url: http://localhost:3001/location  BODY
                           {"description":"Mendoza, San Rafael"}
            PUT    url: http://localhost:3001/location BODY
                           {"id_place":8,"description":"San Rafael, Mendoza, Argentina"}
            DELETE url: http://localhost:3001/location BODY {id_place:7}

# Products
            GET    url: http://localhost:3001/products
    By Name GET    url: http://localhost:3001/products?name=Pinot    QUERY
    Detail  GET    url: http://localhost:3001/products/detail/1
            POST   url: http://localhost:3001/products
                        {"name": "Vino TORO Tetra",
                         "price": 250,"place": 1,"categ": 1,"summary": "Vino tinto Patero",
                         "producer": 1,"alcohol": "60%",
                         "image": "https://http2.mlstatic.com/D_NQ_NP_734474-MLA50030342693_052022-O.webp"
                         }
            DELETE url: http://localhost:3001/products/62  
            
# Productor
            GET    url: http://localhost:3001/productor
            POST   url: http://localhost:3001/productor  BODY {"description":"Quilmes"}
            PUT    url: http://localhost:3001/productor
            DELETE url: http://localhost:3001/productor  Body {"id_Prod":42}

# Profile  (perfil de usuarios)
            GET    url: http://localhost:3001/profile
            POST   url: http://localhost:3001/profile    BODY {"description":"Invitados"}
            PUT    url: http://localhost:3001/profile    Body {"id":1,"description":"Administradores"}
            DELETE url: http://localhost:3001/profile    Body {"id":1}

# Users            
            GET    url: http://localhost:3001/User
    Detail  GET    url: http://localhost:3001/User/perfil?profile=1
            POST   url: http://localhost:3001/User
                BODY {"email":"jhonadm@g.com",
                      "full_name":"Jhon Surname",
                      "profile":1,
                      "status":1}
            PUT    url: http://localhost:3001/User?id=4 
                BODY {"email":"jhonadministra@gmail.com",
                      "full_name":"Jhon Administrator",
                      "profile":1,
                      "status":1}
            DELETE url: http://localhost:3001/User?id=4

# Order   no instalado aun....
```
            POST   url: http://localhost:3001/orders
            GET    url: http://localhost:3001/orders?user_id=12 req.query
            PUT    url: http://localhost:3001/orders?ID=1          QUERY / BODY
            DELETE url: http://localhost:3001/orders?ID=1
```
