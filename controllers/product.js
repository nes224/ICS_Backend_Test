const db = require('../models')
const bcrypt = require('bcrypt')
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

exports.addProduct =async(req,res) =>{
    const {plain,color,gender,pattern,figure,size} = req.body 
    const product = await db.category.create({
        plain:plain,
        color:color,
        gender:gender,
        pattern:pattern,
        figure:figure,
        size:size,
    })
    return res.status(200).json({msg:`AddProduct is success `})
}

exports.updateProduct = async(req,res) =>{

    try{
        const {plain,gender,color,pattern,figure,size} = req.body 
        await db.category.update({plain:plain,gender:gender,color:color,pattern:pattern,figure:figure,size:size},{
            where:{
                id: req.params.id
            }
        })
        return res.status(200).json({msg:"Updated !!!!!"})
    }catch(error){
        return res.json({msg:error})
    }
}

exports.deleteProduct = async(req,res) =>{
    try{
        const deleteProduct = await db.category.destroy({where:{id:req.params.id}})
        return res.status(200).json({msg:"Delete product !!!"})
    }catch(error){
        return res.json({msg:error})
    }
}

exports.showProduct = async(req,res)=>{
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    const {plain,color,gender,pattern,figure,size1} = req.body
    const product = await db.category.findAndCountAll({limit, offset})
    const response = getPagingData(product, page, limit);
    const item = response.item
    const item1 = response.totalItems 
    const itemPage = response.totalPages

    const filterItem = item.filter(items => items.plain === plain|| 
        items.color === color || items.gender === gender|| 
        items.pattern === pattern || items.figure ===figure || 
        items.size === size1)

    if(plain || color || gender || pattern || figure || size1){
        return res.json({data:filterItem,itemCount:item1,page:itemPage})
    }else{
        return res.json({response})
    }
}

exports.order = async(req,res)=>{
    const {id,quantity} = req.body
    const {number,village,lane,road,sub_district,district,province,postal_code} = req.body
    const {orderStatus} = req.body
    const BuyOrderitem = []
    const today = new Date()
    const orderProduct = await db.category.findAll({where:{
        id:id
    }})

    const countItem = orderProduct.map(item=> item.id)
    const itemAc = 1*quantity
    BuyOrderitem.push(itemAc)

    if(orderStatus){
        await db.order.create({orderCount:BuyOrderitem[0],paid_date:today,orderStatus:"pain",categoryId:id})
    }else{
        await db.order.create({orderCount:BuyOrderitem[0],notPaid_date:today,orderStatus:"have_not_paid",categoryId:id})
    }
    const maxId = await sequelize.query("select MAX(id) as id from oders",{
        replacements: { status: 'active' },
        type: QueryTypes.SELECT
    })

    const Address = await db.address.create({number:number,village:village,lane:lane,road:road,sub_district:sub_district,district:district,province:province,
        postal_code:postal_code,orderId:maxId[0].id})

    return res.json({msg: `You have buy order list ${countItem} with quantity ${BuyOrderitem}`
    , DetailOfProduct :orderProduct 
    ,Address:Address})

}

exports.updateOrderPaid = async(req,res) =>{
    try{
        const id = req.params.id
        const {orderStatus} = req.body
        const date = new Date()
        if(orderStatus && id){
            const paid = await db.order.update({orderStatus:"paid",paid_date:date},{where:{
                id:id
            }})
            return res.status(200).json({msg: paid})
        }else{
            return res.json({msg:"need required orderStatus about payment and orderID !"})
        }

    }catch(error){
        return res.status(400).json({msg:error})
    }

}

exports.deleteOrder = async(req,res)=>{
    try{
        const id = req.params.id 
        const order = await db.order.destroy({where:{
            id:id
        }})
        return res.status(200).json({msg:"Delete order is sucessfully"})
    }catch(error){
        return res.json({msg:error})
    }
}

exports.orderList = async(req,res) =>{
    try{
        const { page, size, title } = req.query;
        const {orderStatus} = req.body
        const { limit, offset } = getPagination(page, size);
        const orderList = await db.order.findAndCountAll({limit, offset})
        const response = getPagingData(orderList, page, limit);
        const itemResponse1 = response.item
        const itemResponse = response.totalItems 
        const itemPage = response.totalPages

        const ItemFilter = itemResponse1.filter(items => items.orderStatus === orderStatus )
        
        if(orderStatus=== "paid" || orderStatus  ){
            return res.status(200).json({itemCount: itemResponse,data: ItemFilter,page:itemPage})
        }else{
            return res.status(200).json({msg:orderList})
        }
    
    }catch(error){
        return res.status(401).json({msg:error})
    }
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: item } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, item, totalPages, currentPage };
};
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};