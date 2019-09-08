const mongoose = require('mongoose')

const { Schema,model } = mongoose

const userSchema = new Schema({
    __v: {
        type: String,
        // 是否返回该参数
        select: false
    },
    name:{
        type:String,
        // 是否必填
        required: true
    },
    password: {
        type: String,
        required: true,

        select: false 
    }
})

module.exports =  model('User',userSchema)