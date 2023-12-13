const userModel = require("../userModel/userModel");

const bcrypt = require("bcrypt");

const {validateUser} = require ("../helpers/validator")

//create  a new user
exports.createUser = async (req, res) => {
    try {
        const {error} = validateUser(req.body);
        if(error){
            res.status(500).json({
                message: error.details[0].message
            })
            return;
        } else {
        
        const {firstName, lastName, phoneNumber, username, email, password, confirmPassword} = req.body;
        const passwordHash = await bcrypt.hash(password, 12);
        const confirmPasswordHash = await bcrypt.hash(confirmPassword, 12);
        const newUser = await new userModel({
            firstName: (req.body.firstName).trim().toLowerCase(), 
            lastName: (req.body.lastName).trim().toLowerCase(), 
            phoneNumber: (req.body.phoneNumber).trim().toLowerCase(), 
            username: (req.body.username).trim().toLowerCase(), 
            email: (req.body.email).trim().toLowerCase(), 
            password: passwordHash, 
            confirmPassword: confirmPasswordHash});
       
        //error message checking for user
        if (!newUser) {
            res.status(404).json({
                message: "Registration is not successful",
            })
            return;
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
             res.status(400).json({
                message: "Passwords do not match",
            });
            return;
        }

        // Check for email if existed 
        const checkEmail = await userModel.findOne({ email})
        if (checkEmail){
            res.status(200).json({
                    message:"Email already exists.try another email"
                })
           return;
        }

    // Check for username if existed 
    const checkUsername = await userModel.findOne({username})
        if (checkUsername){
            res.status(401).json({
                message: "Username already exists"
            })
            return;
        }

        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            data: {
                fullname: newUser.lastName+" "+newUser.firstName,
                username: newUser.username,
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
                password: newUser.password
            }
        })
            return;
        }

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};



//get all user
exports.getAllUser = async (req,res) =>{
    try{
        const users = await userModel.find()
        if (users.length ==0){
            res.status(404).json({
                message: "User not found",
            })
        }else{
            res.status(200).json({
                message: `There is ${users.length} users`,
                data: users
            })
        }

    }catch(error){
      res.status(500).json({
        message:"error message" + error.message,
      })
    }
}

//function to login a registered user
exports.logIn = async (req, res) => {

    try {

        const details = {
            username: (req.body.username).trim().toLowerCase(), 
            password: req.body.password };

        const checkUsername = await userModel.findOne({username: details.username});
        if (!checkUsername) {
            res.status(401).json({
                message: "Invalid username!"
            })
            return;
        }

        const passwordCheck = await bcrypt.compare(details.password, checkUsername.password);
        if (!passwordCheck) {
            res.status(401).json({
                message: "Invalid password!"
            })
            return;
        }

        res.status(201).json({
            message: "User successfully logged in",
            data: {
                fullname: checkUsername.firstName+" "+checkUsername.lastName,
                userName: checkUsername.username,
                email: checkUsername.email,
                password: checkUsername.password
            }
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//get one user
exports.getOne = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
        } else {
            const userData = {
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email,
                password: user.password,
            };

            res.status(200).json({
                message: "You're logged in successfully.",
                data: userData
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error" + error.message,
        });
    }
};



//update user
exports.updateUser = async(req, res)=> {
    try{
        const userId = req.params.userId;
        const user = await userModel.findById(userId);
        if(!user){
            res.status(404).json({
                message: "User unable to update",
            })
        }

        userData = {
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            username: req.body.username || user.username,
            phoneNumber: req.body.phoneNumber || user.phoneNumber, 
            email: req.body.email || user.email,
            password: req.body.password || user.password
        }

        if (req.body.password) {
            updatedUserData.password = await bcrypt.hash(req.body.password, 12);
          }

    const userUpdatedData = await userModel.findByIdAndUpdate(userId, userData, {new: true})

    res.status(200).json({
        message: "User updated successfully",
        data: userUpdatedData
    })

    }catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

// delete user
exports.deleteUser = async (req, res)=>{
    try{
        const userId = req.params.userId
         const user = await userModel.findById(userId)
         if (!user) {
            res.status(404).json({
                message: "User not found",
            })
         }
await userModel.findByIdAndDelete(userId)
return res.status(200).json({
    message: "User deleted",
    data: user
})
    }catch (error) {
        res.status(500).json({
            message: "Internal Server Error" + error.message,
        })
    }
}