import React,{useState} from 'react'
import lax from '../../img/lax.svg'
import logoSis from '../../img/logosis.svg';
import vect from '../../img/vect.svg';
import vect1 from '../../img/vect1.svg';
import { useMain } from '../../hooks/useMain';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const StudentLogin = () => {
    const navigate = useNavigate();
    const { StudentLogin,setStudent } = useMain();
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ans = await StudentLogin(value);
        console.log(ans);
       
        // notify(ans.status, ans.message);
        if (ans.status) {
            setStudent(ans.user);
            toast.success("login success");
            localStorage.setItem('b2b_user', JSON.stringify(ans.user));
            localStorage.setItem('b2b_token', ans.token);
            
           navigate("/")
        }
        else{
            alert("invalid User")
        }
    }
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
                        <input required name='email' value={value.email} onChange={handleChange} type="email" placeholder='Email' />
                        </div>
                        <div className='t_inp'>
                        <img className='vect1' src={vect1} alt="vect1" />
                        <input required name='password' value={value.password} onChange={handleChange} type="password" placeholder='Password' />
                        </div>
                        <div className="forgot">
                            <p>Forgot Password?</p>
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

export default StudentLogin
