const Candidate = require('../Models/Candidate');

//API to Submit Candidate profile
function Submit(req, res) {
    const NewCandidate = new Candidate({
        Name: req.body.Name,
        email: req.body.email,
        Notice_Period: req.body.Notice_Period,
        Current_CTC: req.body.Current_CTC,
        Expected_CTC: req.body.Expected_CTC,
        req_id: req.params.id 
    }); 

    NewCandidate.save().then(result => {
        res.status(201).json({
            message: "Candidate Profile submitted Successfully",
            post: result
        });
    })
        .catch(error => {

        })
  
}
 
//API to Display profiles by Requirement ID
function Show(req, res) {
    console.log(req.params.id)
    Candidate.find({req_id:req.params.id}).then(result=>{
        res.status(201).json({
            message: "Candidate Profiles retrieved Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
    }

//Api to Display all Profiles Available in the System
function all(req, res) {
    Candidate.find({}).then(result=>{
        res.status(201).json({
            message: "All Profiles retrieved Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
}

//Api to update the Profile by profile id
function update(req, res) {
    Candidate.findByIdAndUpdate(req.params.id,req.body).then(result => {
        res.status(201).json({
            message: "Profile Updated Successfully",
            post: result
        });
    })
        .catch(error => {

        })
}

//Api to destory the Profile by id
function destroy(req,res)
{
    Candidate.findByIdAndDelete(req.params.id).then(result=>{
        res.status(201).json({
            message: "Profile deleted Successfully",
            post: result
        });
    })
    .catch(error => {
    
    })
}

module.exports={
    Submit:Submit,
    Show:Show,
    all:all,
    update:update,
    destroy:destroy
}