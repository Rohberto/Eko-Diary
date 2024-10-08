import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetUser } from '../../Store/UserSlice';

const ResetPass = () => {
    const {error, loading} = useSelector((state) => state.user);
    const [password, setPassword] = useState("");
    const [passwordReset, setPasswordReset] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id, token} = useParams();
    const handleSubmit = async (e) => {
        const details = {
            password,
            id,
            token
        }
        try{
            e.preventDefault();
            const result = await dispatch(resetUser(details));
            if(result.payload.status === "SUCCESS"){
                setPasswordReset(true);
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        }catch(err){

        }
    }
    return (
    <div className='passwordContainer'>
          <h4 className="forgotHeading">
            Reset Password
        </h4>
       
       {
        passwordReset && (
            <p className='reset-message'>Your password has been reset.</p>
        )
       }
        <form className="forgetFormContainer" onSubmit={handleSubmit}>
      

        <div className="inputContainer">
        <label htmlFor="username">password:</label>
        <input type="password" name="username" id="forgotPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      {error && (
        <div className='login-error'>{error}</div>
      )}

      <button className="loginBtn" type='submit'>{loading ? "Loading..." : "RESET"}</button>
        </form>
    </div>
  )
}

export default ResetPass;
