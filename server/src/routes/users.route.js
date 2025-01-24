const express = require("express");
const {getUser} = require("../controllers/user/getUser")
const {deleteUser} = require("../controllers/user/deleteUserByid")
const {editUser} = require("../controllers/user/editUser");
const { getCards } = require("../controllers/user/getCardsByAccount");
const { getAccount } = require("../controllers/user/getAcountByuserId");

const userRouter = express.Router();

userRouter.get('/:id', getUser);       
userRouter.put('/:id', editUser);      
userRouter.delete('/:id', deleteUser); 

// Obtener cuenta por User ID
userRouter.get("/:id/account", getAccount);

// Obtener tarjetas por User ID
userRouter.get("/:id/cards", getCards);

module.exports = userRouter;
