const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true,"Firstname is required"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(value);
      },
      message: "Name contains only letters",
    },
  },
  lastname: {
    type: String,
    required: true
  },
  emailAddres:{
    type:String,
    required:true,
    unique:true
  },
  age:{
    type:Number,
    required:false
  },

});

const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;