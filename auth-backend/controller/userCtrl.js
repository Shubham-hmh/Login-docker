
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");



const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        //create new user 
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error("User Already Exists !")
    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists or not 
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
      const token = generateToken(findUser?._id);
     
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: token
        });
    }
    else {
        throw new Error("Invalid Credentials !");
    }

});


const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Access the user ID from the authenticated user

    if (userId) {
      const body = req.body;

      // Update the data using findByIdAndUpdate
      const updatedUser = await User.findByIdAndUpdate(userId, body, {
        new: true, // Return the updated user object
      });

      if (updatedUser) {
        return res.status(201).send({ msg: "Record Updated" });
      } else {
        return res.status(404).send({ error: "User not found" });
      }
    } else {
      return res.status(401).send({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});


const getAll =asyncHandler(async (req,res)=>{
  try{
    const getData =await User.find();
    res.json(getData);
  }
  catch(error){
    res.send(error);
  }
})
  

//**GET ; http://localhost:5000/api/user/example@123 */
// const getUser = asyncHandler(async(req, res) =>{
//   const {email}=req.params;
//   console.log(email);
//   try {
//       if(!email) return res.status(501).send({error:"Invalid email"});
//       User.findOne({email},function(err,user){
//           if(err) return res.status(500).send({err});
//           if(!user)return res.status(501).send({error:"Couldn't find User"});


//           /**Remove password from user */
//           //Mongoose return unnecessary data with object so convert it into json.
//           const {password , ...rest} =Object.assign({},user.toJSON());

//           return res.status(201).send(rest);
//       })
      
//   } catch (error) {
//       return res.status(404).send({error:"Can not find User Data"})
//   }

// });

const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);

    if (!email) {
      return res.status(400).send({ error: "Invalid email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Remove sensitive data from the user object
    const { password, ...rest } = user.toObject();

    return res.status(200).send(rest);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};


// logout functionality .
const logout = asyncHandler(async (req, res) => {

    if (!user) {
   
        return res.sendStatus(204); //forbidden
    }

    return res.sendStatus(204);
});

module.exports = {
    createUser, loginUserCtrl,logout,updateUser,getAll,getUser
  
}