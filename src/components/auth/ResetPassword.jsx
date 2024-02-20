import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useMain } from '../../hooks/useMain'
import toast from 'react-hot-toast';
import lax from '../../img/lax.svg'
import logoSis from '../../img/logosis.svg';
import vect from '../../img/vect.svg';
import vect1 from '../../img/vect1.svg';
const ResetPassword = () => {
    const { changePassword } = useMain();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (value.password === value.password1) {
            const ans = await changePassword({ email: JSON.parse(localStorage.getItem('b-reset')).email, password: value.password });
            console.log(ans);

            if (ans.status) {
                toast.success("success");
                navigate("/login");
            }
            else {
                toast.error("error")
            }
        }
        else {
            toast.error("password and confirm password must be same")
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
                            <h3>Log In</h3>
                            <form className='form_inp' onSubmit={handleSubmit}>
                                <div className='t_inp'>
                                    <img className='vect' src={vect} alt="vect" />
                                    <input name='password' value={value.password} onChange={handleChange} type="text" placeholder='Enter password' />
                                </div>
                                <div className='t_inp'>
                                    <img className='vect1' src={vect1} alt="vect1" />
                                    <input name='password1' value={value.password1} onChange={handleChange} type="password" placeholder='Enter confirm password' />
                                </div>
                                <div className="forgot">
                                    <NavLink to="/forgotPassword"><p>Forgot Password?</p></NavLink>
                                </div>
                                <button className='login'>Log in</button>
                                <h4 className='terms'>Terms of Use and Privacy Policy.</h4>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
