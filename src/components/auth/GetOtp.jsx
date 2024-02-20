import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useMain} from '../../hooks/useMain'
import toast from 'react-hot-toast';
import lax from '../../img/lax.svg'
import logoSis from '../../img/logosis.svg';
// import vect from '../../img/vect.svg';
const GetOtp = () => {
    const { sendOtp, submitOtp } = useMain();
    const navigate = useNavigate();

    const resend = async () => {
        let ans = await sendOtp({ email: JSON.parse(localStorage.getItem('b-reset')).email });
        console.log(ans);
        if (ans.status) {
            localStorage.setItem('b-reset', JSON.stringify({ email: JSON.parse(localStorage.getItem('b-reset')).email, otp: ans.otp }));
            toast.success("success")
        }
        else {
            toast.error("not success")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let otp1='';
        let b1 = document.querySelectorAll('.signin_input');
        for(let i of b1)
        {
            otp1+=i.children[0].value;
        }

        const ans = await submitOtp({ otp: JSON.parse(localStorage.getItem('b-reset')).otp, otp1 });
        console.log(ans);

        if (ans.status) {
            toast.success("success")
            navigate("/reset-password");
        }
        else {
            toast.error("error")
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
                            <h3>Check your email</h3>
                            <p>We’ve sent a code to <span>{JSON.parse(localStorage.getItem('b-reset'))?.email}</span></p>
                            <form className='form_inp' onSubmit={handleSubmit}>
                            <div className='otp_screen'>
                                <div className="signin_input">
                                    <input className='form-control' maxLength="1"  type="text" />
                                </div>
                                <div className="signin_input">
                                    <input className='form-control'  maxLength="1" type="text" />
                                </div>
                                <div className="signin_input">
                                    <input className='form-control'  maxLength="1" type="text" />
                                </div>
                                <div className="signin_input">
                                    <input className='form-control'  maxLength="1" type="text" />
                                </div>
                            </div>
                                <button  className='login lofin'>Verify</button>
                                <div className="verify_again">
                                <p >Didn’t get a code? <span style={{cursor:"pointer"}} onClick={resend}>Click to resend</span> </p>
                            </div>
                                <h4 className='terms'>Terms of Use and Privacy Policy.</h4>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetOtp
