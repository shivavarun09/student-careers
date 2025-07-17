import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Auth/FirebaseConfig/FirebaseConfig";
import UserChatBot from "../UserChatBot/UserChatBot";
import UserMainContent from "../UserMainContent/UserMainContent";

const UserDashboard = () => {
  const [viewCategoryUser, setViewCategoryUser] = useState("jobs");
  const [showGemini, setShowGemini] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserName(user ? user.displayName || "" : "");
    });

    return () => unsubscribe();
  }, []);

  const handleUserViewCategory = (category) => {
    setViewCategoryUser(category);
    setShowGemini(false);
  };

  const handleGeminiAiModal = () => setShowGemini(true);
  const handleClose = () => setShowGemini(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="user-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <div className="w-full shadow-md navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="user-drawer"
              className="btn btn-square btn-ghost"
              aria-label="open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-bold">
            Welcome, {userName || "User"}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)] bg-gray-100 rounded-md">
          {showGemini ? (
            <UserChatBot onClose={handleClose} />
          ) : (
            <UserMainContent viewCategoryUser={viewCategoryUser} />
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="user-drawer" className="drawer-overlay" aria-label="close sidebar"></label>
        <ul className="min-h-full gap-2 p-4 menu w-80 bg-base-200 text-base-content">
          <li className="mb-2 text-lg font-semibold">
            Hello, {userName || "User"}
          </li>
          <li>
            <button
              className="w-full btn btn-outline btn-success"
              onClick={() => handleUserViewCategory("jobs")}
            >
              Jobs
            </button>
          </li>
          <li>
            <button
              className="w-full btn btn-outline btn-success"
              onClick={() => handleUserViewCategory("internships")}
            >
              Internships
            </button>
          </li>
          <li>
            <button
              className="w-full btn btn-outline btn-success"
              onClick={() => handleUserViewCategory("skillCourses")}
            >
              Skill Courses
            </button>
          </li>
          <li>
            <button
              className="w-full btn btn-outline btn-info"
              onClick={handleGeminiAiModal}
            >
              Ask Gemini AI
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
