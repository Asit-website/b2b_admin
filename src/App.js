import logo from './logo.svg';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/auth/Login';
import MainState from './context/MainState';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import StudentLogin from './components/auth/StudentLogin';
import ForgotPass from './components/auth/ForgotPass';
import GetOtp from './components/auth/GetOtp';
import ResetPassword from './components/auth/ResetPassword';
import Otp from './components/auth/Otp';
import CreateSubscription from './components/CreateSubscription';
import ViewSubscription from './components/ViewSubscription';
// import OtpInput from './components/auth/OtpInput';
function App() {
  return (
    <>
      <MainState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/studentLogin' element={<StudentLogin/>}/>
            <Route path='/welcome' element={<Welcome/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="forgotPassword" element={<ForgotPass/>}/>
            <Route path="/getOtp" element={<GetOtp/>} />
            <Route path='reset-password' element={<ResetPassword/>}/>
            <Route path='/otpInp' element={<Otp/>}/>
            <Route path='/createSubs' element={<CreateSubscription/>}/>
            <Route path='/viewSub' element={<ViewSubscription/>}/>
          </Routes>
        </BrowserRouter>
      </MainState>
    </>

  );
}

export default App;
