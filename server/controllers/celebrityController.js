const Celebrity = require('../models/Celebrity');
const createCrudController = require('../utils/crudFactory');
module.exports = createCrudController(Celebrity, 'celebrities');
