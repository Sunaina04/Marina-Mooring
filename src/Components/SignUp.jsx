const SignUp=()=>{
    const changeHandle=(e)=>{}
    return <div>
        <form className="signUpForm">
            <div className="container">
            <h2 className="signup">SignUp</h2>
            <input type="text" placeholder="Email" name="email" required onChange={changeHandle}/>
            <input type="password" placeholder="Create password" name="pwd" required/>
            <input type="password" placeholder="Confirm password" name="pwd_confirm" required/>
            <input type="submit" value="Signup" className="signUpBtn"/>
        
        <h6 style={{width:"50%",textAlign:"center"}}>Already have an account?<a href="#login">Login</a></h6>
        <h6 style={{width:"50%",textAlign:"center"}}>------or------</h6>
        <input type="button" value="Login with facebook" className="facebookBtn"/><br/>
        <input type="button" value="Login with Google" className="googleBtn"/> 
        </div>
        </form> 

    </div>
}

export default SignUp;