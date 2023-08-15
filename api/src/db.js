require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//console.log('sequelize: ', sequelize.models);
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Productor, Location, Category, Product_state, Shopping_cart, Order, Order_item, Review ,Favorite} = sequelize.models;
// Aca vendrian las relaciones
// Relaciones One to One 
Productor.hasMany(Product,{ foreignKey:"id_prod"});
Product.belongsTo(Productor,{ foreignKey:"producer"});

Category.hasMany(Product,{ foreignKey:"id_categ"});
Product.belongsTo(Category,{ foreignKey:"categ"});

Location.hasMany(Product,{ foreignKey:"id_place"});
Product.belongsTo(Location, {foreignKey:"place"});

Product_state.hasOne(Product,{ foreignKey:"id_state"});
Product.belongsTo(Product_state,{foreignKey:"status"});

Shopping_cart.belongsTo(Product,{ foreignKey:'id_prod_cart'});
Product.hasOne(Shopping_cart);

Favorite.belongsTo(Product,{ foreignKey:'id_prod'}); 
Product.hasOne(Favorite);

Order.belongsToMany(Order_item, {through:'DATA'});
Order_item.belongsToMany(Order,{ through:'DATA', foreignKey:'order_id' , onDelete: 'cascade' });

Order_item.belongsTo(Product,{ foreignKey:'product_id'});
Product.hasOne(Order_item);

// Product_state.hasMany(Product);
// Product.belongsTo(Product_state);


// User.hasOne(Profile)
//Profile.belongsTo(User)
// Relaciones Many to Many

User.belongsToMany(Review, { through: 'UsersReview' })
Review.belongsToMany(User, { through: 'UsersReview' })

Review.belongsToMany(Product, { through: 'ProductsReview' })
Product.belongsToMany(Review, { through: 'ProductsReview' })

User.belongsToMany(Product, { through: 'ProductsUsers' })
Product.belongsToMany(User, { through: 'ProductsUsers' })

// Category.belongsToMany(Product,{ through: 'ProductsCategory' })
// Product.belongsToMany(Category,{ through: 'ProductsCategory' })


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
