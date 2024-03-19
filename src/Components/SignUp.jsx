import "./SignUp.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const SignUp=()=>{
    const changeHandle=(e)=>{}
    return <div className="main-container">
        
            <div className="container">
                <div className="signUp_Form">
            <h1>SignUp</h1>
            <div className="input">
                <div className="email">
                <input type="text" placeholder="Email" name="email" required onChange={changeHandle}/>
            
                </div>
                <div className="password">
                <input type="password" placeholder="Create password" name="pwd" required/>

                </div>
                <div className="confirmPassword">
                <input type="password" placeholder="Confirm password" name="pwd_confirm" required/>
                </div>
            </div>
            <div className="signUp-btn">
                            <button>SignUp</button>

                            <p style={{ fontSize: "0.90rem" }}>Already have an account? <span style={{ color: "blue", cursor:"pointer" }}>Login</span></p>
                        </div>
                        <div className="other">
                            <hr />

                        </div>
        
                        <div className="btn-Container">
                            <div className="btn-facebook">
                                <button>

                                    <div className="iconFacebook">

                                        <FaFacebook fontSize={20} />

                                        <span style={{ marginLeft: "4rem", }}>
                                            Login with Facebook
                                        </span>

                                    </div>

                                </button>
                            </div>
                            <div className="btn-google">
                                <button>

                                    <div className="iconGoogle">

                                        <FcGoogle fontSize={20} />

                                        <span style={{ marginLeft: "4rem" }}>
                                            Login with Google
                                        </span>


                                    </div>



                                </button>


                            </div>
                        </div>

        </div>
        </div>
            

    </div>
}

export default SignUp;