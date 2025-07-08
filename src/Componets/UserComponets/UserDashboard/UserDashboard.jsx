import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserChatBot from "../UserChatBot/UserChatBot";
import { auth } from "../../../Auth/FirebaseConfig/FirebaseConfig";
import UserMainContent from "../UserMainContent/UserMainContent";
import { onAuthStateChanged } from "firebase/auth";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [viewCategoryUser, setViewCategoryUser] = useState("jobs");
  const [showGemini, setShowGemini] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUserName(loggedInUser ? loggedInUser.displayName || "" : "");
    });

    return () => unsubscribe();
  }, []);

  const handleUserViewCategory = (userViewCategory) => {
    setViewCategoryUser(userViewCategory);
    setShowGemini(false);
  };

  const handleGeminiAiModal = () => {
    setShowGemini(true);
  };

  const handleClose = () => {
    setShowGemini(false);
  };

  return (
    <div className="relative flex flex-col h-screen gap-2 p-2 sm:flex-col md:flex-row lg:flex-row">
      {/* Sidebar */}
      <div className="flex flex-col w-full p-4 space-x-2 space-y-4 bg-gray-200 rounded-md md:w-1/4">
        <h2 className="mb-2 text-lg font-semibold text-black">
          Hello, {userName}
        </h2>
        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={() => handleUserViewCategory("jobs")}
          aria-label="View Jobs"
        >
          Jobs
        </button>
        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={() => handleUserViewCategory("internships")}
          aria-label="View Internships"
        >
          Internships
        </button>
        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={() => handleUserViewCategory("skillCourses")}
          aria-label="View Skill Courses"
        >
          Skill Courses
        </button>
        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={handleGeminiAiModal}
          aria-label="Ask Gemini"
        >
          Ask
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full h-screen overflow-y-auto bg-gray-100 rounded-md md:h-full md:w-3/4 scroll-smooth">
        {showGemini ? <UserChatBot /> : <UserMainContent viewCategoryUser={viewCategoryUser} />}
      </div>
    </div>
  );
};

export default UserDashboard;