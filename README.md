

# Comfort Product Server

```
For run this project in your local machine

1. Clone this repository

2. install dependencies with command    
    -> yarn install or npm install

3. Create Database with sql command line
CREATE DATABASE comfort_product;

4. Update your database configuration on this file
./src/app.module.ts

TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'YOUR_PASS',
    database: 'comfort_product',
    entities: [Product, Comment],
    synchronize: true,
}),

5. Now you can start server with command
    -> yearn run start:dev or npm run start:dev
    -> yarn run start or npm run start
```
### Important Links

##### [Swagger API - http://localhost:8080/api][swigger]

<!-- Links -->
[swigger]: http://localhost:8080/api