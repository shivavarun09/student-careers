import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Auth/FirebaseConfig/FirebaseConfig';

const AdminViewCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesDocRef = doc(db, 'Notifications', 'skillCourses');
        const coursesSnap = await getDoc(coursesDocRef);
        if (coursesSnap.exists()) {
          const data = coursesSnap.data();
          const allCourses = Object.values(data).flat();
          setCourses(allCourses);
        }
      } catch (error) {
        alert('Error fetching internships');
      }
    };

    getCourses(); 
  }, []);

  return (
    <div>
      {courses.length === 0 ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        courses.map((course, index) => (
          <p key={index}>{course.notificationTitle}</p>
        ))
      )}
    </div>
  );
};

export default AdminViewCourses;
