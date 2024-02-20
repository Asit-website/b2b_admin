import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('b2b_user'));

     useEffect(()=>{
 setTimeout(()=>{
  navigate("/dashboard")
 },4000)
     },[])

    return (
        <>
            <div className="welcome_main">
                <div className="welcome_page">
                    <div className="welcome_sect">
                        <h3>Welcome <span>{user.email}</span> to B2B</h3>
                        {/* <div className="log_btn">
                            <NavLink to="/login"><button>Login</button></NavLink>
                            <button onClick={() => {
                                localStorage.removeItem('b2b_user');
                                localStorage.removeItem('b2b_token');
                                alert("logout success")
                                navigate('/login');
                            }}>Logout</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome
