const express = require('express');

const router = express.Router();

const {createUser,
     getAllUser,
      getOne, 
      updateUser, 
      deleteUser,
       logIn, } = require('../userController/userController');

//endpoint to create user
router.post("/create", createUser )

//endpoint to login
router.post("/login", logIn)

//endpoint to get all user
router.get("/getAll", getAllUser)

//endpoint to get a user
router.get("/getOne/:userId", getOne)

//endpoint to update a user
router.put("/update/:userId", updateUser)

//endpoint to delete a user
router.delete("/delete/:userId", deleteUser)


//import the router
module.exports = router;