import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth}from '../FirebaseConfig/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer,Bounce} from 'react-toastify'
const AdminLogin = () => {
  const navigate = useNavigate()
  const [isloggedin,setIsLoggedIn] = useState(false)
  const [adminLoginDetails,setAdminLoginDetails]= useState({
    adminEmail:"",
    adminPassword:""
  })
  const {adminEmail,adminPassword} = adminLoginDetails;
  const getAdminLoginDetails=(e)=>{
    let {name,value}= e.target;
    setAdminLoginDetails((prevstate)=>({...prevstate,[name]:value}))
  }
  const handleAdminLogin=async(e)=>{
    e.preventDefault();
// console.log(adminLoginDetails)
// alert("Admin Lgin Successful")
try{
const admin = await signInWithEmailAndPassword(auth,adminEmail,adminPassword)
toast.success(`login succesfful`,{
position: "top-right",
autoClose: 2500,
onClose:()=>{navigate('/adminDashboard')},
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
})
setIsLoggedIn(true)
// setTimeout(()=>{
//   navigate('/adminDashboard')
// },3000)
}catch(error){
      toast.error(`login Failed: ${error.code.replace("auth/", "")}`,{
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      transition:Bounce ,
      });
}

  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h1 className="mb-6 text-4xl font-bold text-center text-primary">Admin Login</h1>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="adminEmail"
              value={adminEmail}
              onChange={getAdminLoginDetails}
              required
              className="w-full input input-bordered"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="adminPassword"
              value={adminPassword}
              onChange={getAdminLoginDetails}
              required
              className="w-full input input-bordered"
            />
          </div>

          <button type="submit" disabled={isloggedin} className="w-full rounded btn btn-primary">
{isloggedin?(<span className="loading loading-spinner text-accent"></span>):'Login'}
          </button>

          <p className="mt-2 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer "
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AdminLogin
