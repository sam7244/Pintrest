import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import { googleLogout } from '@react-oauth/google';
import logo from '../assets/logowhite.png'
import jwt_decode from 'jwt-decode'
import {client} from '../client'
const Login = () => {
  const navigate = useNavigate()
  const logout = ()=>{
     googleLogout()
   }

  const responseGoogle = async(response)=>{
    console.log('logged in')
    const decode = jwt_decode(response.credential)
    localStorage.setItem('user',JSON.stringify(decode));
    const {name,picture,sub} = decode

    console.log(decode)
    const doc = {
      _id:sub,
      _type:'user',
      username:name,
      image:picture
    }

    client.createIfNotExists(doc).then(()=>{
      navigate('/',{replace:true})
    })
  }

  return (
   <div className='flex justify-start items-center flex-col h-screen'>
    <div className='relative w-full h-full'>
      <video
      src={shareVideo}
      type="video/mp4"
      loop
      controls= {false}
      muted
      autoPlay 
      className='w-full h-full object-cover'
      />
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
        <div className='p-5'>
          <img src={logo} alt="logo" width="130px" />
        </div>
        <div className='shadow-2xl'>
          <GoogleLogin
          auto_select
          onSuccess={(response) => responseGoogle(response)
              
        }
          onError={() => {
          console.log('Login Failed');
          }}

          />
        </div>
     
      </div>
      <div className='flex flex-col items-center justify-center'>
        <button type='button'
        onClick={logout}
        >
          click here to logout
        </button>
      </div>
      
    </div>
   </div>
  )
}

export default Login