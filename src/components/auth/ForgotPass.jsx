import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useMain } from '../../hooks/useMain'
import toast from 'react-hot-toast';
import lax from '../../img/lax.svg'
import logoSis from '../../img/logosis.svg';
import vect from '../../img/vect.svg';
const ForgotPass = () => {
    const { sendOtp } = useMain();
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
        otp: '',
        password: '',
        password1: ''
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const send = async (e) => {
        e.preventDefault();

        let ans = await sendOtp({ email: value.email });
        console.log(ans);
        console.log(ans.status);
        if (ans.status) {
            localStorage.setItem('b-reset', JSON.stringify({ email: value.email, otp: ans.otp }));
            toast.success("login success");
            navigate('/getOtp');
        }
        else {
            // notify(ans.status, ans.message);
            toast.error("not success");
        }
    };
    return (
        <>
            <div className='login_system'>
                <div className="login_type">
                    <div className="auth_left">
                        <div className="auth_bg">
                            <h3><span> Welcome to </span>JA Discovery <br /> Center</h3>
                            <div className="spalsh_icon">
                                <img src={lax} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="auth_right">
                        <div className="form_right">
                            <div className="logo_rt">
                                <img src={logoSis} alt="" />
                            </div>
                            <h3>Forgot Password</h3>
                            <form className='form_inp' onSubmit={send}>
                                <div className='t_inp'>
                                    <img className='vect' src={vect} alt="vect" />
                                    <input name='email' value={value.email} onChange={handleChange} type="email" placeholder='Enter Email' />
                                </div>
                                <button type='submit' className='login'>Reset Password</button>
                                <h4 className='terms'>Terms of Use and Privacy Policy.</h4>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPass
