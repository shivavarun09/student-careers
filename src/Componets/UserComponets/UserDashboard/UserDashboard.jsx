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
    <div className="relative flex flex-col h-screen gap-2 p-2 md:flex-row">
      {/* Sidebar */}
      <div className="sticky top-0 z-30 flex flex-col w-full gap-4 p-4 bg-gray-200 rounded-md md:w-1/4">
        <h2 className="text-lg font-semibold text-center text-black md:text-left">
          Hello, {userName}
        </h2>

        {/* Mobile/Tablet View Button Group */}
        <div className="block md:hidden">
          <div className="flex flex-wrap justify-center w-full gap-2 btn-group">
            <button
              className="btn btn-outline btn-success"
              onClick={() => handleUserViewCategory("jobs")}
            >
              Jobs
            </button>
            <button
              className="btn btn-outline btn-success"
              onClick={() => handleUserViewCategory("internships")}
            >
              Internships
            </button>
            <button
              className="btn btn-outline btn-success"
              onClick={() => handleUserViewCategory("skillCourses")}
            >
              Skill Courses
            </button>
            <button
              className="btn btn-outline btn-success"
              onClick={handleGeminiAiModal}
            >
              Ask
            </button>
          </div>
        </div>

        {/* Desktop View Vertical Buttons */}
        <div className="hidden md:flex md:flex-col md:gap-2">
          <button
            className="w-full btn btn-outline btn-success"
            onClick={() => handleUserViewCategory("jobs")}
          >
            Jobs
          </button>
          <button
            className="w-full btn btn-outline btn-success"
            onClick={() => handleUserViewCategory("internships")}
          >
            Internships
          </button>
          <button
            className="w-full btn btn-outline btn-success"
            onClick={() => handleUserViewCategory("skillCourses")}
          >
            Skill Courses
          </button>
          <button
            className="w-full btn btn-outline btn-success"
            onClick={handleGeminiAiModal}
          >
            Ask
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-md p-2 h-[calc(100vh-8rem)] md:h-[calc(100vh-1rem)]">
        {showGemini ? (
          <UserChatBot onClose={handleClose} />
        ) : (
          <UserMainContent viewCategoryUser={viewCategoryUser} />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
