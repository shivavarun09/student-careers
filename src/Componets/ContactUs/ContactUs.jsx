import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../Auth/FirebaseConfig/FirebaseConfig';

const ContactUs = () => {
  const [contactForm, setContactForm] = useState({
    userName: '',
    userEmail: '',
    userQuery: '',
    userQueryType: '',
  });

  const { userName, userEmail, userQuery, userQueryType } = contactForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'userFormQuerys', 'userQuerys');
    const queryData = {
      userName,
      userEmail,
      userQuery,
      userQueryType,
    };
    try {
      await setDoc(docRef,
        {
          [userQueryType]: arrayUnion(queryData),
        },{ merge: true }
      );

      toast.success('Your query has been submitted!');
      setContactForm({
        userName: '',
        userEmail: '',
        userQuery: '',
        userQueryType: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 m-auto">
      <ToastContainer />
      <div className="mb-1">
        <p className="text-lg text-center text-blue-500">
          If you have any questions, concerns, or need help, just drop us a message using the form below.
        </p>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Contact Us</h2>

          <div className="mb-3">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              name="userEmail"
              value={userEmail}
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="label">
              <span className="label-text">Query Type</span>
            </label>
            <select
              name="userQueryType"
              value={userQueryType}
              onChange={handleChange}
              className="w-full select select-bordered"
              required
            >
              <option value="">Select query type</option>
              <option value="general">General</option>
              <option value="login">Login</option>
              <option value="signup">Signup</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="label-text">Your Query</span>
            </label>
            <textarea
              name="userQuery"
              value={userQuery}
              onChange={handleChange}
              rows="4"
              className="w-full textarea textarea-bordered"
              placeholder="Enter your query"
              required
            ></textarea>
          </div>

          <button type="submit" className="text-center btn btn-primary">
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
