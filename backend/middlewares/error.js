const winston = require('winston')
const { deleteFiles } = require('../routes/products')
function error(error,req,res,next){
    if(error && req.files)
        deleteFiles(req.files)
    console.log(req.files)
    winston.error(error.message,error)
    res.status(500).send( { error:'Something failed' } )
    return;
}
module.exports = error