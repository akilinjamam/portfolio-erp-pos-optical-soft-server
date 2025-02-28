const { runValidator } = require('../../joi_validation');
const { glassTypeValidationSchema } = require('../../joi_validation/glassTypeValidationSchema');
const { createGlassTypeController, deleteGlassTypeController, getGlassTypeController } = require('./glass.controller');


const glassTypeRouter = require('express').Router();


glassTypeRouter.post('/create-glassType', runValidator(glassTypeValidationSchema), createGlassTypeController);

glassTypeRouter.get('/', getGlassTypeController)
glassTypeRouter.delete('/:id', deleteGlassTypeController)

module.exports = glassTypeRouter