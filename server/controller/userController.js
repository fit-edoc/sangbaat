const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");




module.exports.register = async(req,res)=>{

    try {

        const {username,password,email} = req.body;
        const usernameCheck =await userModel.findOne({username})

        if(usernameCheck){
           return res.status(500).send({success: false,message: 'username already used'});
        }
        
        const emailCheck = await userModel.findOne({email})


        if(emailCheck){
            return res.status(500).send({success: false,message: 'email already used',});
        }

        const hashPassword = await  bcrypt.hash(password,10)

        
        
       
        const user = await userModel.create({username,password:hashPassword,email})
 const token = generateToken({id:user._id,name:user.username})
        await user.save()
        return res.status(200).send({success: true,message: 'signup successfully',token});
    } catch (error) {
        console.log(error)
        res.status(501).send({success: false,message: 'signup controller not working',});
    }

}



module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
     const token = generateToken({id:user._id,name:user.username})
     return res.status(200).send({success: true,message: 'signup success',user,token});
  } catch (ex) {
    next(ex);
  }
};


module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};


module.exports.setAvatar = async(req,res)=>{

    try {
        console.log("body",req.body)
        const userId = req.params.id
        const avatarImage = req.body.image

        const userData = await userModel.findByIdAndUpdate(
            userId,
            {
                isAvtarSet:true,
                avatarImage
            },{new:true}
            
        )

    return res.json({
        image:userData.avatarImage,
        avtar:userData.isAvtarSet
    })
        
    } catch (error) {
        console.log(error)
        res.status(501).send({success: false,message: 'setavatar controller not working',});
        
    }
}



module.exports.logout = async (req,res)=>{


  try {
    
    if(!req.params.id) return res.status(500).send({success: false,message: 'user id required',});
    onlineUsers.delete(req.params.id)
    return res.status(500).send({success: false,message: 'logout successfully',});
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false,message: 'api logout not working',error});
  }
}