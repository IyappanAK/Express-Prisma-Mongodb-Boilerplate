const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('../../config/config');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API',
      version: '3.0.0',
      description: 'Example docs',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/v1`,
      },
    ],
  },
  apis: ['swagger.yaml'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
