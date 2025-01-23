const express = require("express");
const {getUser} = require("../controllers/user/getUser")
const {deleteUser} = require("../controllers/user/deleteUserByid")
const {editUser} = require("../controllers/user/editUser")

const userRouter = express.Router();

userRouter.get('/:id', getUser);       
userRouter.put('/:id', editUser);      
userRouter.delete('/:id', deleteUser); 

module.exports = userRouter;
