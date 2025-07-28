import React, { useEffect, useState } from 'react'
import SignupComp from './Auth/SignupComp/SignupComp'
import LoginComp from './Auth/LoginComp/LoginComp'
import { Routes,Route } from 'react-router-dom'
import ForgetPassword from './Auth/ForgetPassword/ForgetPassword'
import Navbarr from './Componets/Navbarr/Navbarr'
import ContactUs from './Componets/ContactUs/ContactUs'
import AboutUs from './Componets/AboutUs/AboutUs'
import Home from './Componets/Home/Home'
import AdminLogin from './Auth/AdminLogin/AdminLogin'
import AdminDashboard from './Componets/AdminDashboard/AdminDashboard'
import AdminPostNotification from './Componets/AdminDashboard/AdminPostNotification'
import UserDashboard from './Componets/UserComponets/UserDashboard/UserDashboard'
import UserProfile from './Componets/UserComponets/UserProfile/UserProfile'
import Footer from './Componets/Footer/Footer'
import UserChatBot from './Componets/UserComponets/UserChatBot/UserChatBot'
import {toast,ToastContainer,Bounce} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import NotFound from './Componets/NotFound/NotFound'

// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './Auth/FirebaseConfig/FirebaseConfig'
// import { auth } from './Auth/FirebaseConfig/FirebaseConfig'

const App = () => {

  return (
    <div>
      <Navbarr/>
      <Routes>
                <Route path='/*' element={<NotFound/>}/>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginComp/>}/>
        <Route path='/signup' element={<SignupComp/>} />
        <Route path='/resetPassword' element={<ForgetPassword/>}/>
        <Route path='contactus' element={<ContactUs/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}>
        <Route path='/adminDashboard/post-notification' element={<AdminPostNotification/>}/>
        </Route>
                {/* <Route path='/post-notification' element={<AdminPostNotification/>}/> */}

        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>}>
        <Route path='user-profile' element={<UserProfile/>}/>
        <Route path='user-chatbot' element={<UserChatBot/>}/>
        </Route>
      </Routes>
        {/* Global Toast Container */}
      <ToastContainer
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Footer/>
    </div>
  )
}

export default App
