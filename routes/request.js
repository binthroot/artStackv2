const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestControllers');

router.get('/:id', requestController.getRequest);

router.post('/createRequest', requestController.createRequest);

module.exports = router;