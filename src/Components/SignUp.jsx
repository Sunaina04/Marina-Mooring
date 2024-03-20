import { useState } from "react";
import "./SignUp.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const SignUp=()=>{   

    const validateEmail = (e) => {
            const email=e.target.value;
            if(email.slice(email.length-4)!==".com")
            alert("enter a valid email");
            e.target.value="";
        };

        const validateContact=(e)=>{
            const telephoneNo=e.target.value;
            const num=Number(telephoneNo);
            if(isNaN(num)){
            alert("enter only numeric digits");
                e.target.value="";
        }
            else if(num.toString().length!==10){
                alert("contact no should be of 10 digits");
                e.target.value="";
            }
        }  
    return(    
    <div className="main-container">
            <form>
            <div className="container">
                <div className="signUp_Form">
            <h1>SignUp</h1>
            <div className="input">
            <div className="firstName">
                
                <input type="text" placeholder="First Name" name="firstName" required />
            
                </div>
                <div className="lastName">
                    
                <input type="text" placeholder="Last Name" name="lastName" required />
            
                </div>
                <div className="contact">
                    
                <input type="text" placeholder="Contact No." name="contactNo" required onBlur={validateContact}/>
            
                </div>
                <div className="text">
                <input type="email" placeholder="Email" id="email" name="email" required onBlur={validateEmail}/>
            
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

                            <p style={{ fontSize: "0.90rem" }}>Already have an account?<Link to="/login"> <span style={{ color: "blue", cursor:"pointer" }}>Login</span></Link></p>
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
        </form>

    </div>);
    
}

export default SignUp;