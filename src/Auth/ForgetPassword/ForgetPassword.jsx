import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../FirebaseConfig/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const methods = await fetchSignInMethodsForEmail(auth, userEmail);
      if (methods.length === 0) {
        toast.error("This email is not registered.");
        return;
      }

      await sendPasswordResetEmail(auth, userEmail);
      toast.success("Password reset email sent.");
    } catch (error) {
      const errorMessage = error?.code ? error.code.replace("auth/", "") : "Unknown error";
      toast.error(`Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <ToastContainer transition={Bounce} />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Send Reset Link
            </button>
          </div>

          <p className="text-sm text-center mt-2">
            Remembered password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
