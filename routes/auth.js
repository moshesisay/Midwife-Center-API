const router = require("express").Router();
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/*
//REGISTER
router.post("/register", async (req,res) => {
    
    const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        role: req.body.role,
    });

    try{
       const savedUser =  await newUser.save();
       res.status(201).json(savedUser)
    }catch(err){
       res.status(500).json(err);  
    }   
})
*/
//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    let newUser;
    if (role === "doctor") {
      newUser = new Doctor({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
        role,
        specialization: req.body.specialization,
        experience: req.body.experience,
        qualification: req.body.qualification
      });
    } else if (role === "patient") {
      newUser = new Patient({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
        role,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        contactNumber: req.body.contactNumber,
        address: req.body.address
      });
    } else {
      return res.status(400).json("Invalid role");
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
/*
router.post("/login", async (req,res)=>{
  try{
    const user = await User.findOne({ username: req.body.username})
    // Check if the user exists
    !user && res.status(401).json("Worng credentials!")
    
    // Decrypt the password
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password, 
        process.env.PASS_SEC
        );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    // Check if the password is correct
    OriginalPassword !== req.body.password && 
       res.status(401).json("Worng credentials!")
       
    const accessToken = jwt.sign(
    {
          id: user._id,
          isAdmin: user.isAdmin,
    }, 
    process.env.JWT_SEC,
        {expiresIn:"3d"}
    );


    const { password, ...others} = user._doc;
    
    res.status(200).json({...others, accessToken});
  } catch (err){
    res.status(500).json(err);
  } 
  
  
})
*/

// LOGIN
router.post("/login", async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });

      // Check if the user exists
      !user && res.status(401).json("Wrong credentials!");

      // Decrypt the password
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      // Check if the password is correct
      originalPassword !== req.body.password &&
          res.status(401).json("Wrong credentials!");

      // Determine the model based on the user's role
      let userModel;
      if (user.role === 'doctor') {
          userModel = Doctor;
      } else if (user.role === 'patient') {
          userModel = Patient;
      } else {
          userModel = User;
      }

      // Find the user in the appropriate model
      const userWithDetails = await userModel.findById(user._id);

      // Create the access token
      const accessToken = jwt.sign(
          {
              id: user._id,
              isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
      );

      const { password, ...others } = userWithDetails._doc;

      res.status(200).json({ ...others, accessToken });
  } catch (err) {
      res.status(500).json(err);
  }
});


module.exports = router;