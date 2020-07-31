const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

module.exports = () => {
  router.get('/', urlController.home);

  router.post('/', urlController.addUrl);

  // GENERAR una URL comodin
  router.get('/:url', urlController.redirectUrl);

  return router;
};
