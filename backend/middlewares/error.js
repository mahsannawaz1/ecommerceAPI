const winston = require('winston')
function error(error,res,res,next){
    winston.error(error.message,error)
    res.status(500).send( { error:'Something failed' } )
    return;
}
module.exports = error