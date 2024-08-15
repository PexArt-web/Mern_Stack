// login user

const { log } = console

const loginUser = async (req, res)=>{
    try {
        res.json({message: "login user", credentials: {...req.body}})
    } catch (error) {
        res.json({error: error.message})
    }

}

// signup user

const signupUser = async(req, res)=>{
    try {
        res.json({message: 'sign up user', credentials: {...req.body}})
        log(...req.body)
    } catch (error) {
        res.json({error: error.message})
    }
}


module.exports = {
    loginUser,
    signupUser
}