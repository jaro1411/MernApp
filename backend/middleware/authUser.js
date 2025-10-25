const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authUser = async(req,res,next) => {

    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: "No authorization token available"})
    }

    const token = authorization.split(' ')[1]

    try {

        const { _id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch(error) {
        console.log(error)
        res.status(401).json({ error: "Unauthorised request"})
    }


}


module.exports = authUser