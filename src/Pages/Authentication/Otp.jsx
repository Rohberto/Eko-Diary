import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyUser } from '../../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Otp = ({length, onChangeOtp }) => {
const [otp, setOtp] = useState(new Array(length).fill(""));
const [otpError, setOtpError] = useState("");
const {user, loading} = useSelector((state) => state.user);
const dispatch = useDispatch();
const newOtp = [...otp];
const navigate = useNavigate();




const handleChange = (element, index) => {
  const value = element.value;
  if (!value) return;

  newOtp[index] = value;
  setOtp(newOtp);

  if (index < length - 1 && value) {
    element.nextSibling.focus();
  }

  onChangeOtp(newOtp.join(""));
};

const handleBackspace = (element, index) => {
  newOtp[index] = "";
  setOtp(newOtp);

  onChangeOtp(newOtp.join(""));
};
const submitOtp = async () => {
  let otp = newOtp.join("");
  const credentials = {
    userId : user._id,
    otp : otp
  }
  try{
if(otp.length < 4){
setOtpError("Fill all input boxes");
}else{
  setOtpError("");
  const result = await dispatch(verifyUser(credentials));
if(result.payload.status === "VERIFIED"){
  localStorage.setItem("user", JSON.stringify(result.payload.data));
  navigate("/welcome");
}
}}
catch (err) {
console.log(err);
}
}

const handleResendOtp = async () => {
  try{
    const request = await axios.post("http://localhost:5000/auth/resendotp", {userId: user._id, email: user.email, name: user.name});
    const response = request.data;
    if(response.status === "PENDING"){
      alert("OTP has been resent to your mail.")
    }
  }catch (err) {
    console.log(err.message);
  }
  
}
  return (
    <div className='otpContainer'>
      <div className="otpInputFields">
        {
          otp.map((data, index) => (
            <>
             <input type="number" key={index} maxLength="1" value={data} className="otpInputField" 
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    handleBackspace(e.target, index);
                  }
                }}/>
            </>
          ))
        }
      </div>

      <p className="otpText">Enter Unique Code Sent to your email.</p>
      {otpError && (
        <div className='login-error'>{otpError}</div>
      )}
      <div className="otpResendButton">
        <button onClick={handleResendOtp}>Resend OTP code.</button>
      </div>
     <div className="verifyBtnCont"><button className="verifyBtn" onClick={submitOtp}>{loading ? "Loading..." : "Verify"}</button></div> 
      <p className="verifyBackBtn"><Link to="/onboarding">Back</Link></p>
    </div>
  )
}

export default Otp
