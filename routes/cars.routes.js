const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/cars.controller');
const router = express.Router();

router.post('/save', createCar);
router.get('/get', getCars);
router.get('/find/:id', getCarById);
router.put('/update/:id', updateCar);
router.delete('/delete/:id', deleteCar);

module.exports = router;
