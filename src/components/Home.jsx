import React,{useEffect} from 'react'
import splash from '../img/splash.svg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const nav = useNavigate();
  useEffect(()=>{
   setTimeout(() => {
     nav("/login");
   }, 4000);
  },[])
  return (
    <div className='flash'>
        <div className="flash_bg">
             
        </div>
    </div>
  )
}

export default Home
