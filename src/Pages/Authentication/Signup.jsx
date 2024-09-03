import React, {useState} from 'react';
import Google from "../../Images/google.svg";
import Facebook from "../../Images/facebook.svg";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLoginUser, loginuser, signUser } from '../../Store/UserSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, error, loading} = useSelector((state) => state.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
      e.preventDefault();
      try{
        let userCredentials = {
  name, email, password
        }
        const result = await dispatch(signUser(userCredentials));
       if(result.payload.status === "PENDING"){
        setEmail("");
        setName("");
        setPassword("");
        navigate("/otp");
       }

      }catch (err){
        console.log(err.message);
      }
  }
  return (
    <div className='signupContainer'>
      <div className="socialLogin">
      <GoogleLogin 
      
  onSuccess={async (credentialResponse) => {
    let credentials = {credential: credentialResponse.credential, client_id: credentialResponse.clientId};
   try{
    const result = await dispatch(googleLoginUser(credentials));
    if(result.payload.status === "SUCCESS"){
      localStorage.setItem("user", JSON.stringify(result.payload.data));
      navigate("/homepage");
     }
   }catch(err){
    console.log(err.message);
   }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
      </div>

      <form className="loginFormContainer" onSubmit={handleSignUp}>
        <div className="inputContainer">
        <label htmlFor="username">username:</label>
        <input type="text" name="username" id="signup-name" onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="inputContainer">
        <label htmlFor="email">email:</label>
        <input type="email" name="email" id="signup-email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      
      <div className="inputContainer">
      <label htmlFor="password">password:</label>
      <input type="password" name="password" id="signup-password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      {error && (
        <div className='login-error'>{error}</div>
      )}
      <button className="loginBtn" type='submit'>{loading ? "Loading..." : "Sign Up"}</button>
      </form>
      <Link to="/login" className="loginBackBtn">Already have an account? Login.</Link>
    </div>
  )
}

export default SignUp;
