const Designer = require('../models/Designer');
const createCrudController = require('../utils/crudFactory');
module.exports = createCrudController(Designer, 'designers');
