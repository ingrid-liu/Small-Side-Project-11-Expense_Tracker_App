const routes = require('express').Router();
const controller = require('../controller/controller');     // require a file

routes.route('/api/categories')
    .get(controller.create_Categories);



module.exports=routes;