const express = require('express')
const router = express.Router()
const {addProduct,updateProduct,deleteProduct,
    showProduct,order,
    updateOrderPaid,
    deleteOrder,
    orderList} = require('../controllers/product')


router.post('/addProduct',addProduct)
router.put('/addProduct/:id',updateProduct)
router.delete('/addProduct/:id',deleteProduct)
router.get('/showProduct',showProduct)
router.post('/order',order)
router.put("/order/:id",updateOrderPaid)
router.delete('/order/:id',deleteOrder)
router.get('/orderList',orderList)
module.exports = router