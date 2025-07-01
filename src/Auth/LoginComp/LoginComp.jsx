import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../FirebaseConfig/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const LoginComp = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    loginEmail: "",
    loginPassword: ""
  });

  const { loginEmail, loginPassword } = loginDetails;
  const navigate = useNavigate();

  const handleLoginDetails = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success('Login Successful',{
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      setIsLoggedIn(true)
      setTimeout(()=>{
        navigate('/user-dashboard')
      },3000)
    } catch (error) {
      toast.error(`Error: ${error.code}`,{
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-base-200">
      <ToastContainer autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce} />
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-primary">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="loginEmail"
              value={loginEmail}
              onChange={handleLoginDetails}
              required
              placeholder="Enter your email"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="loginPassword"
              value={loginPassword}
              onChange={handleLoginDetails}
              required
              placeholder="Enter your password"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <button type="submit" className="w-full btn btn-primary">
               {isLoggedIn?(<span className="loading loading-spinner text-accent"></span>):'Login'}
            </button>
          </div>
            <p className="mt-2 text-sm text-center">
            Don't have an Account?{" "}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Create
            </span>
          </p>
          <p className="mt-2 text-sm text-center">
            Forgot Password?{" "}
            <span
              onClick={() => navigate('/resetPassword')}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Reset Password
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginComp;
