import React, { useState } from 'react';
import AdminContent from './AdminMainContent';
import AdminMainPost from './AdminMainPost';

const AdminDashboard = () => {
  const [viewCategory, setViewCategory] = useState('jobs');
  const [showPost, setShowPost] = useState(false);

  const handleViewCategory = (category) => {
    setViewCategory(category);
    setShowPost(false);
  };

  const handlePostClick = () => {
    setShowPost(true);
  };

  const handleClosePost = () => {
    setShowPost(false);
  };

  return (
    <div className="relative flex flex-col h-screen gap-2 p-2 md:flex-row">
      {/* Sidebar */}
      <div className="sticky top-0 z-30 flex flex-col w-full gap-4 p-3 bg-gray-200 rounded-md md:w-1/4 ">
        <h2 className="text-lg font-semibold text-center text-black md:text-left">
          Admin Panel
        </h2>

        {/* Mobile/Tablet View Button Group */}
        <div className="block md:hidden">
          <div className="flex flex-wrap justify-center w-full gap-2 btn-group">
            <button className="btn btn-outline btn-success" onClick={handlePostClick}>
              Post
            </button>
            <button className="btn btn-outline btn-success" onClick={() => handleViewCategory("jobs")}>
              Jobs
            </button>
            <button className="btn btn-outline btn-success" onClick={() => handleViewCategory("internships")}>
              Internships
            </button>
            <button className="btn btn-outline btn-success" onClick={() => handleViewCategory("skillCourses")}>
              Skill Courses
            </button>
          </div>
        </div>

        {/* Desktop View Vertical Buttons */}
        <div className="hidden md:flex md:flex-col md:gap-2">
          <button className="w-full btn btn-outline btn-success" onClick={handlePostClick}>
            Post
          </button>
          <button className="w-full btn btn-outline btn-success" onClick={() => handleViewCategory("jobs")}>
            Jobs
          </button>
          <button className="w-full btn btn-outline btn-success" onClick={() => handleViewCategory("internships")}>
            Internships
          </button>
          <button className="w-full btn btn-outline btn-success" onClick={() => handleViewCategory("skillCourses")}>
            Skill Courses
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-md p-2 h-[calc(100vh-8rem)] md:h-[calc(100vh-1rem)]">
        {showPost ? (
          <AdminMainPost onClose={handleClosePost} />
        ) : (
          <AdminContent viewCategory={viewCategory} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
