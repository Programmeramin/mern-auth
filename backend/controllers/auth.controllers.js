


/**
 @description signup
 @method POST
 @route api/auth/signup
 @access public
 */
export const signup = async (req, res) =>{
      res.send("signup route");
}



/**
 @description login
 @method POST
 @route api/auth/login
 @access public
 */
 export const login = async (req, res) =>{
    res.send("login route");
}


/**
 @description logout
 @method POST
 @route api/auth/logout
 @access public
 */
 export const logout = async (req, res) =>{
    res.send("logout route");
}

