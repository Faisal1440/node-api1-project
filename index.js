const express = require ("express")
const server = express()
const shortid = require ("shortid")
//ALLOWS EXPRESS TO READ JSON FROM BODY
server.use(express.json())
//DEFINE ROUTE/MAKERS SERVER API 
server.get("/", (req, res) => {
    res.json({API:"Project"})
})