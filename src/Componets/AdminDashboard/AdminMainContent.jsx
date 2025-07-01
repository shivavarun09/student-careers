import { arrayRemove, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Auth/FirebaseConfig/FirebaseConfig';

const AdminMainContent = ({ viewCategory }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeletePost = async (selectedPostIndex) => {
    const post = data[selectedPostIndex];
    const postCategory = post.notificationCategory;

    try {
      const docRef = doc(db, 'Notifications',`${viewCategory}`);
      await updateDoc(docRef, {
        [postCategory]: arrayRemove(post),
      });

      // Fetch updated document
      const updatedDataSnap = await getDoc(docRef);
      if (updatedDataSnap.exists()) {
        const updatedData = updatedDataSnap.data();
        // Flatten the arrays in the document into a single array
        const allData = Object.values(updatedData).flat();
        setData(Array.isArray(allData) ? allData : []);
      } else {
        setData([]);
      }

      alert('Post removed');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const docRef = doc(db, 'Notifications',`${viewCategory}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Flatten all arrays in the document into a single array
          const allData = Object.values(data).flat();
          setData(Array.isArray(allData) ? allData : []);
        } else {
          setData([]);
        }
      } catch (error) {
        alert('Error fetching courses');
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
  }, [viewCategory]);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 shadow-xl card bg-base-100 animate-pulse"
            >
              <div className="card-body">
                <h2 className="text-center card-title">
                  <div className="w-1/2 h-4 mx-auto mb-2 bg-gray-300 rounded"></div>
                  <div className="w-1/4 h-3 mx-auto bg-gray-300 rounded"></div>
                </h2>
                <p className="w-full h-3 mb-2 bg-gray-300 rounded"></p>
                <p className="w-5/6 h-3 mb-2 bg-gray-300 rounded"></p>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                  <div className="w-1/3 h-3 bg-gray-300 rounded"></div>
                </div>
                <div className="justify-center mt-4 card-actions">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : data.length === 0 ? (
        <div className="col-span-3 mt-4 text-lg font-medium text-center text-gray-500">
        {`  🚫 No ${viewCategory} available at the moment.`}
        
        </div>
      ) : (
        data.map((singleData, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-xl card bg-base-100"
          >
            <div className="card-body">
                 <figure>
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Card" />
  </figure>
              <h2 className="text-center card-title text-primary">
                {singleData.notificationCompany.toUpperCase()}
                <span className="text-sm text-gray-600">
                  {singleData.notificationTitle}
                </span>
              </h2>
            
              <p className="text-sm text-gray-600">
                {singleData.notificationDescription}
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <strong>Deadline:</strong> {singleData.notificationDeadlineDate}
                </p>
                <p>
                  <strong>Published:</strong> {singleData.notificationPublishDate}
                </p>
              </div>
              <div className="justify-center mt-2 card-actions">
                <button
                  className="btn btn-warning"
                  onClick={() => handleDeletePost(index)}
                >
                  Delete
                </button>
                <button className="btn btn-warning">Edit</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminMainContent;