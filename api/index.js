/*
  Main index File 
  Nota: le saque el BUDA!!!!
*/
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const refLoad= require('./src/Loader/reference.js');
const loadProductos = require('./src/Loader/products')
// Syncing all the models at once.
//conn.sync().then(() => {
conn.sync({ force: true }).then(() => {
  refLoad()
  loadProductos()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

