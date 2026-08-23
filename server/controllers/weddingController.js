const WeddingItem = require('../models/WeddingItem');
const createCrudController = require('../utils/crudFactory');
module.exports = createCrudController(WeddingItem, 'weddingitems');
