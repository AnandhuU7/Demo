//contact routes
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/add", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    console.log(savedContact);
    res.status(201).json({ msg: "Created successfully" });
  } catch (error) {
    console.log(error);
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.emailAddres
    ) {
      // Changed 11100 to 11000 for the duplicate key error
      res.status(400).json({ msg: "Email already used" });
    } else {
      res.status(500).json({ msg: "Unable to create new contact" });
    }
  }
});

router.get("/read", async (req, res) => {
  try {
    Contact.find()
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to fetch" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to get contacts" });
  }
});

//read-single contact

router.get("/read/:id", (req, res) => {
  try {
    const id = req.params.id;
    Contact.findById(id)
      .then((contact) => {
        console.log(contact);
        res.status(201).json({ contact: contact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "unable to fetch" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to fetch data" });
  }
});

//search
router.get("/search", async (req, res) => {
  try {
    let searchTerm = req.query.searchTerm;
    const searchRegex = new RegExp(searchTerm, "i");
    Contact.find({
      $or: [
        { firstName: searchRegex },
        { lastname: searchRegex }, // corrected from 'lastname' to 'lastName'
        { emailAddres: searchRegex }, // corrected from 'emailAddres' to 'emailAddress'
      ],
    })
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contacts: contacts }); // changed status to 200
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to fetch data" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to fetch contacts" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateContact = req.body;
    if (!id || !updateContact) {
      return res.status(400).json({ msg: "Invalid input" });
    }
    Contact.findOneAndUpdate({ _id: id }, updateContact, { new: true })
      .then((updateContact) => {
        console.log(updateContact);
        res.status(201).json({ updateContact: updateContact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to update" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to update" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    if(id){
    Contact.findByIdAndDelete(id)
      .then((deletedCOntact)=>{
        if (!deletedContact) {
          return res.status(404).json({ msg: "Unable to connect" });
        }
      console.log(deletedCOntact);
      res.status(201).json({msg:"deleted contact"})
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to delete data" });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to delete data" });
  }
});

module.exports = router;
