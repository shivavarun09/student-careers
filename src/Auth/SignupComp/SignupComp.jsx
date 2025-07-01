import React, { useState } from "react";
import { auth, db } from "../FirebaseConfig/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupComp = () => {
  const navigate = useNavigate();
  const [isSigned,setIsSigned] = useState(false)
  const [studentSignupDetails, setStudentSignupDetails] = useState({
    studentName: "",
    studentEmail: "",
    studentDegreeSpecialization: "",
    studentDegreeSpecializationYear: "",
    studentPassword: "",
  });

  const {
    studentName,
    studentEmail,
    studentDegreeSpecialization,
    studentDegreeSpecializationYear,
    studentPassword,
  } = studentSignupDetails;

  const handleStudentSignup = (e) => {
    const { name, value } = e.target;
    setStudentSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const createUserAndDb = async (e) => {
    e.preventDefault();
    try {
      let studentCredentials = await createUserWithEmailAndPassword(
        auth,
        studentEmail,
        studentPassword
      );
      await updateProfile(studentCredentials.user,{displayName:studentName})      
      await setDoc(doc(db, 'users', `${studentDegreeSpecialization}`), {
        studentName,
        studentEmail,
        studentDegreeSpecialization,
        studentDegreeSpecializationYear,
      });

      toast.success("Account created successfully!", {
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
      setIsSigned(true)
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(`Signup Failed: ${error.code.replace("auth/", "")}`, {
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
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h1 className="mb-6 text-4xl font-bold text-center text-primary">Create Account</h1>
        <ToastContainer autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}  />
        <form onSubmit={createUserAndDb} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="studentName"
              value={studentName}
              onChange={handleStudentSignup}
              required
              className="w-full input input-bordered"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="studentEmail"
              value={studentEmail}
              onChange={handleStudentSignup}
              required
              className="w-full input input-bordered"
            />
            <p className="mt-1 text-xs text-gray-500">We’ll never share your email with anyone else.</p>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Degree Specialization</span>
            </label>
            <select
              name="studentDegreeSpecialization"
              value={studentDegreeSpecialization}
              onChange={handleStudentSignup}
              required
              className="w-full select select-bordered"
            >
              <option value="">Select degree</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
            </select>
          </div>

          {studentDegreeSpecialization !== "" && (
            <div>
              <label className="label">
                <span className="label-text">Current Year</span>
              </label>
              <select
                name="studentDegreeSpecializationYear"
                value={studentDegreeSpecializationYear}
                onChange={handleStudentSignup}
                required
                className="w-full select select-bordered"
              >
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          )}

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="studentPassword"
              value={studentPassword}
              onChange={handleStudentSignup}
              required
              className="w-full input input-bordered"
            />
          </div>

          <button type="submit" className="w-full rounded btn btn-primary">
              {isSigned?(<span className="loading loading-spinner text-accent"></span>):'Sign up'} 
          </button>

          <p className="mt-2 text-sm text-center">
            Already have an account?{" "}
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

export default SignupComp;



