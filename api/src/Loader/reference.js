require('dotenv').config();
const { Profile, Location, Product_state, Productor, Category,User, Review } = require('../db')

async function refLoad() {

    Review.bulkCreate([
        {id_prod:54, id_user:1 ,stars:3 ,description:"Muy bueno para comer con carne"},
        {id_prod:54, id_user:2 ,stars:5 ,description:"Excelente vino"},
        {id_prod:54, id_user:3 ,stars:4 ,description:"Muy buena cosecha el año 2017"},
        {id_prod:54, id_user:3 ,stars:5 ,description:"Un placer este producto!!!"},
        {id_prod:2, id_user:1 ,stars:1 ,description:"Excelente!. Ideal para un buen asado."},
        {id_prod:2, id_user:3 ,stars:3 ,description:"Buen precio"},
        {id_prod:3, id_user:2 ,stars:5 ,description:"Buenisimo!!!"},
        {id_prod:4, id_user:2 ,stars:5 ,description:"Buenisimo!!!"},
    ]).then(() => console.log('Reviews ha sido grabado'));

    User.bulkCreate([
        { id:1, full_name:"Juan Admin", email:"juan.adm@gmail.com", role: 'Admin'},
        { id:2, full_name:"Juan Cliente", email:"juan.cli@gmail.com", role:'User'},
     ]).then(() => console.log('User ha sido grabado'));

    Category.bulkCreate([
        { variety:"Malbec"     ,type:"Tinto", degreeSugar: 'Seco' },
        { variety:"Malbec"     ,type:"Tinto", degreeSugar: 'Semiseco' },
        { variety:"Blend"      ,type:"Tinto", degreeSugar: 'Seco' },
        { variety:"Blend"      ,type:"Tinto", degreeSugar: 'Semiseco' },
        { variety:"Chardonnay"  ,type:"Blanco", degreeSugar: 'Seco' },
        { variety:"Viognier"  ,type:"Blanco", degreeSugar: 'Semiseco' },
        { variety:"Malbec"     ,type:"Rosado", degreeSugar: 'Seco' },
        { variety:"Cabernet Sauvignon"   ,type:"Rosado", degreeSugar: 'Semiseco' },
        { variety:"Cabernet Sauvignon"   ,type:"Rosado", degreeSugar: 'Seco' },
        { variety:"Torrontes"  ,type:"Rosado", degreeSugar: 'Semiseco' },
        { variety:"Merlot"     ,type:"Rosado", degreeSugar: 'Semiseco' },
        { variety:"Malbec"     ,type:"Rosado", degreeSugar: 'Abocado' },
        { variety:"Malbec"     ,type:"Tinto", degreeSugar: 'Abocado' },
        { variety:"Syrah "     ,type:"Tinto", degreeSugar: 'Dulce' },
        { variety:"Cabernet Sauvignon"   ,type:"Tinto", degreeSugar: 'Semiseco' },
]).then(() => console.log('Category ha sido grabado'));

    Profile.bulkCreate([
        { description: 'Administrador' },
        { description: 'Cliente' },
        { description: 'Proveedor' },
    ]).then(() => console.log('Profile ha sido grabado'));

    Product_state.bulkCreate([
        { description: 'Disponible' },
        { description: 'Cancelado' },
        { description: 'Sin Stock' },
    ]).then(() => console.log('Products_State ha sido grabado'));

    Location.bulkCreate([
        { description: 'Mendoza' },
        { description: 'San Juan' },
        { description: 'La Pampa' },
        { description: 'La Rioja' },
        { description: 'Salta' },
        { description: 'Neuquen' },
        { description: 'Rio Negro' },
    ]).then(() => console.log('Location ha sido grabado'));

    Productor.bulkCreate([
        { description: 'Doña Paula' },
        { description: 'Colosso Wines' },
        { description: 'Del Desierto' },
        { description: 'Rosell Boher' },
        { description: 'Las Perdices' },
        { description: 'Putruele' },
        { description: 'Alta Vista' },
        { description: 'Benegas' },
        { description: 'Javier Collovati Vineyards' },
        { description: 'Mascota Vineyards' },
        { description: 'Familia Zuccardi' },
        { description: 'El Esteco' },
        { description: 'Navarro Correas' },
        { description: 'Flechas de Los Andes' },
        { description: 'La Rural' },
        { description: 'Nieto Senetiner' },
        { description: 'Del Fin del Mundo' },
        { description: 'Catena Zapata' },
        { description: 'Humberto Canale' },
        { description: 'Sottano' },
        { description: 'Trapiche' },
        { description: 'Kaiken' },
        { description: 'Lamadrid' },
        { description: 'El Porvenir de Cafayate' },
        { description: 'Fabre Montmayou' },
        { description: 'Luigi Bosca' },
        { description: 'Piedra Negra' },
        { description: 'Mendel' },
        { description: 'Antigal' },
        { description: 'Andeluna' },
        { description: 'Bianchi' },
        { description: 'Enrique Foster' },
        { description: 'Riglos' },
        { description: 'Rolland Collection' },
        { description: 'Santa Julia' },
        { description: 'Alamos' },
        { description: 'Lagarde' },
        { description: 'Susana Balbo Wines' },
        { description: 'Funckenhausen' },
        { description: 'Piattelli Vineyards' },
        { description: 'Cuvelier Los Andes' },
    ]).then(() => console.log('Productor ha sido grabado'));

    
    return 'ok';
}

module.exports = refLoad;



