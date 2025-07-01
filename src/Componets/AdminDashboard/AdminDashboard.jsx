import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminContent from './AdminMainContent';
import AdminPostNotification from './AdminPostNotification';
import AdminMainContent from './AdminMainContent';
import AdminMainPost from './AdminMainPost';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [viewCategory, setViewCategory] = useState('jobs');
  const [showPost, setShowPost] = useState(false); 

  const handleViewCategory = (category) => {
    setViewCategory(category);
    setShowPost(false)
  };

  const handlePostClick = () => {
    setShowPost(true); // 
  };



  return (
    <div className="relative flex flex-col h-screen gap-2 p-1 md:flex-row lg:flex-row">
      {/* Sidebar */}
      <div className="sticky top-0 z-30 w-full p-4 space-x-2 space-y-4 bg-gray-200 rounded-md md:w-1/4 join-vertical">
        <h2 className="mb-2 text-lg font-semibold text-white">Admin Panel</h2>

        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={handlePostClick} 
        >
          Post
        </button>

        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={() => handleViewCategory('jobs')}
        >
          View Jobs
        </button>
        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={() => handleViewCategory('skillCourses')}
        >
          View Courses
        </button>
        <button
          className="md:w-full sm:w-auto btn btn-outline btn-success"
          onClick={() => handleViewCategory('internships')}
        >
          View Internships
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-4 overflow-hidden overflow-y-auto bg-gray-200 rounded-md md:w-3/4 scroll-smooth">
        {/* <h1 className="mb-4 text-2xl font-bold text-center text-green-700">Admin Dashboard</h1> */}
        {showPost?<AdminMainPost/>:<AdminContent viewCategory={viewCategory} />
}
      </div>

      {/* Modal for Posting Notification
      <Modal show={showPostModal} onHide={handleClosePostModal} size="auto">
        <Modal.Header closeButton>
          <Modal.Title>Post Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminMainContent/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePostModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AdminDashboard;
