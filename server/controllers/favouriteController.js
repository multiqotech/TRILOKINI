const FavouriteItem = require('../models/FavouriteItem');
const createCrudController = require('../utils/crudFactory');
module.exports = createCrudController(FavouriteItem, 'favouriteitems');
