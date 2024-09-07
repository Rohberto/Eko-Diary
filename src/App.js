import React, {useState, useEffect} from 'react';
import Header from './Components/Header';
import Onboarding from './Pages/Authentication/onboarding';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Authentication/Login';
import SignUp from './Pages/Authentication/Signup';
import Otp from './Pages/Authentication/Otp';
import Welcome from './Pages/Authentication/Welcome';
import ForgotPass from './Pages/Authentication/forgotPass';
import ResetPass from './Pages/Authentication/resetPassword';
import Homepage from './Pages/Homepage/homepage';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from './Store/UserSlice';
import { useLocation } from 'react-router-dom';
import Menu from './Components/Menu';
import EventDetail from './Pages/Homepage/eventDetail';
import CreateEvent from './Pages/Homepage/createEvent';
import { getAllEvents } from './Store/EventsSlice';
import BuyTickets from './Pages/Homepage/BuyTickets';
import NotFoundPage from './Components/NotFoundPage';

const App = () => {
  const [otp, setOtp] = useState("");
  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };
  const location = useLocation();
  const {user} = useSelector((state) => state.user);
  const {loading} = useSelector((state) => state.events);
const dispatch = useDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(isLoggedIn(foundUser));
    }
    dispatch(getAllEvents());
  }, []);

  return (
    <div className='app_container'>
      <Header/>
    <Routes>
      <Route  path='/onboarding' element={user !== null || undefined ? <Navigate replace to="/" />: <Onboarding/>} />
      <Route path='/login' element={user !== null || undefined? <Navigate replace to="/" /> : <Login/>} />
      <Route path='/signup' element={user !== null || undefined? <Navigate replace to="/" /> : <SignUp/>} />
      <Route path='/otp' element={<Otp length={4} onChangeOtp={handleChangeOtp}/>} />
      <Route path='/Welcome' element={<Welcome/>} />
      <Route path='/forgot-password' element={<ForgotPass/>} />
      <Route path='/reset-password/:id/:token' element={<ResetPass/>} />
      <Route path='/' element={<Homepage/>}/>
      <Route path='/event/:id' element={ <EventDetail/>} />
      <Route path='/create-event' element={ <CreateEvent/>} />
      <Route path='/checkout/:id' element={ <BuyTickets/>} />
      <Route path="*" element={<NotFoundPage/>} />
</Routes>
{!location.pathname == "/" && !loading && (<Menu/>)}

    </div>
  )
}

export default App;
