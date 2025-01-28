const express = require('express');
const { save_car, get_car, update_car, find_car, delete_car } = require('../controller/user.controller');
const router = express.Router();


router.post('/save', save_car)
router.get('/get', get_car)
router.put('/update/:id', update_car)
router.get('/find', find_car)
router.delete('/find', delete_car)



module.exports = router;
