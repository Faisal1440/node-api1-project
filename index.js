const express = require ("express")
const server = express()
const shortid = require ("shortid")
//ALLOWS EXPRESS TO READ JSON FROM BODY
server.use(express.json())
//DEFINE ROUTE/MAKERS SERVER API 
server.get("/", (req, res) => {
    res.json({API:"Project"})
})

//----------------DATA-----

let users = [
     {id: "1", name: "Jane Doe",bio: "alive"} ,
	 {id: "2", name: "John Doe",bio: "critical"} ,
	 {id: "3", name: "Jack Doe",bio: "dead"} ,
]

//--------------POST-----------------

server.post('/api/users', (req, res) => {
 const body =req.body
 if (!body.name || !body.bio) {
     res.status(400).json({
        errorMessage:"Please provide name and bio for the user."
     })
 } 

 else if (body.name && body.bio){
    body.id = shortid.generate()
    users.push(body)
    res.status(201).json(body)
 }

 else (
     res.status(500).json({
        errorMessage:"There was an error while saving the user to the database."
     })
 )

})

//-------------GEt----- 

server.get('/api/users', (req, res) => {
    res.json(users)
  if(!users) {
    res.status(500).json({
        errorMessage: "The users information could not be retrieved."})
  } else {
    res.status(200).json();
  }
})

server.get('/api/users/:id', function (req, res){
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if(user){
        res.status(200).json(user)}
        else {
            res.status(404).json({errormessage: "This user with the specified ID does not exist."})
        }
    
})

//------------DELETE----

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const deletes = users.find(user => user.id ==id);

    

    if (deletes) {
        users = users.filter(user => user.id != id);
        res.status(200).json({message: "Successful"})
    }

    else {
        res.status(500).json({message: "This user could not be removed"});
    }
}
)
  //-------------PUT------

  server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id); 
    const user = users.find(user => user.id == id)
    const updateUser= req.body
  
    if(!user){
        res.status(404).json({errorMessage: " The user with the specified ID does not exist"})
    } else if(updateUser.bio !== "" && updateUser.name !== ""){
        users= users.filter(user => user.id !== id)
        res.status(200).json(users)
    } else if(updateUser.bio === "" || updateUser.name === ""){
        res.status(400).json({errorMessage:"Please provide name and bio for the user"})
    } else{
        res.status(500).json({errorMessage: "The user information could not be modified"})
    }
  
  
  })



//----------------start server------
server.listen (8000, ()=> {
    console.log ("SERVER is ALIVE!")
})