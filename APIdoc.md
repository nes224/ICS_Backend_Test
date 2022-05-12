router.post('/api/auth/addProduct',addProduct)  // สำหรับ add product category 
{
    "plain":"250ml",
    "gender":"female",
    "color":"red",
    "pattern":"test1",
    "figure":"test20",
    "size":"XS"
}

router.put('/api/auth/addProduct/:id',updateProduct) // update product
{
    "plain":"180ml",
    "gender":"female"
}
router.delete('/api/auth/addProduct/:id',deleteProduct) // delete product
router.get('/api/auth/showProduct',showProduct) // query product && filter  || '/api/auth/showProduct?size=5'


router.post('/api/auth/order',order) //สำหรับสั่งซื้อ order หากมีการสั่งซื้อพร้อมชำระเงิน จะเพิ่ม "orderStatus": n , {n = 1,2,3,4...........} n สมมุติเป็นเงินทีจ่าย
{
    "id":1, 
    "quantity":8,
    "number":"test",
    "village":"test1",
    "lane":"lane",
    "road":"road",
    "sub_district":"test3",
    "district":"district",
    "province":"test4",
    "postal_code":30000

    
}

router.put("/api/auth/order/:id",updateOrderPaid) //หากมีการอัพเดทการจ่ายเงินมาที่หลัง
{

    "orderStatus":20

}
router.delete('/api/auth/order/:id',deleteOrder) // deleted ถ้ามีการยกเลิก

router.get('/api/auth/orderList',orderList)  // query order && filter  || '/api/auth/orderList?size=5'
{
    "orderStatus":"paid"
}

//POSTMAN 