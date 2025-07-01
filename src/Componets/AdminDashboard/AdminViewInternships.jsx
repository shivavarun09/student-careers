import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Auth/FirebaseConfig/FirebaseConfig';

const AdminViewInternships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const getInternships = async () => {
      try {
        const internshipDocRef = doc(db, 'Notifications', 'internships');
        const internshipsSnap = await getDoc(internshipDocRef);
        if (internshipsSnap.exists()) {
          const data = internshipsSnap.data();
          const allInternships = Object.values(data).flat();
          setInternships(allInternships);
        }
      } catch (error) {
        alert('Error fetching internships');
      }
    };

    getInternships(); 
  }, []);

  return (
    <div>
      {internships.length === 0 ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        internships.map((internship, index) => (
          <p key={index}>{internship.notificationTitle}</p>
        ))
      )}
    </div>
  );
};

export default AdminViewInternships;
