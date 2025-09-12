const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signUp", userController.signUpUser);
userRouter.post("/login", userController.loginUser);        
userRouter.get("/profile/:id", userController.getUserProfile);
userRouter.put("/updateprofile/:id", userController.updateUserProfile);
userRouter.delete("/deleteprofile/:id", userController.deleteUserProfile);

module.exports = userRouter;