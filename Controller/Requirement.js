const Requirement = require('../Models/Requirement');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//API to Create the requirement
function create(req, res) {
    // let user =req.userdata.email;
    const NewRequirement = new Requirement({
        Details: req.body.Details,
        Skills: req.body.Skills,
        Client: req.body.Client,
        Location: req.body.Location,
        EOY: req.body.EOY,
        Expiry_date: req.body.Expiry_date,
        Created_by: req.userdata.email
    }); 

    NewRequirement.save().then(result => {
        res.status(201).json({
            message: "Requirement Created Successfully",
            post: result
        });
    })
        .catch(error => {

        })
  
}

//API to show the requirement by ID
function Show(req, res) {
Requirement.find({_id:req.query.id}).then(result=>{
    res.status(201).json({
        message: "Requirement retrieved Successfully",
        post: result
    });
})
.catch(error => {

})
}

//Api to get all Requirement
function all(req, res) {
    Requirement.find({}).then(result=>{
        res.status(201).json({
            message: "All Requirement retrieved Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
}

//Api to update the Requirement
function update(req, res) {
    Requirement.findByIdAndUpdate(req.params.id,req.body).then(result => {
        res.status(201).json({
            message: "Requirement Updated Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}
//Api to destory the Requirement
function destroy(req,res)
{
    Requirement.findByIdAndDelete(req.params.id).then(result=>{
        res.status(201).json({
            message: "Requirement deleted Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
}

module.exports={
    create:create,
    Show:Show,
    all:all,
    update:update,
    destroy:destroy
}