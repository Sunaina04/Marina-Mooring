const SignUp=()=>{
    const changeHandle=(e)=>{}
    return <div className="contain">
        <form className="container">
        <h2 className="signup">SignUp</h2>
        
            <input type="text" placeholder="Email" onChange={changeHandle}/>
            <input type="password" placeholder="Create password"/>
            <input type="password" placeholder="Confirm password"/>
            <input type="submit" value="Signup"/>
        
        <h6>Already have an account?<a href="#login">Login</a></h6>
        <h6>or</h6>
        <input type="button" value="Login with facebook"/><br/>
        <input type="button" value="Login with Google"/> 
        </form>   
    </div>
}

export default SignUp;