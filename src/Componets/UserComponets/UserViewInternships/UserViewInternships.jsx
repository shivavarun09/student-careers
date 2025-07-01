import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../Auth/FirebaseConfig/FirebaseConfig';
const UserViewInternships = () => {
  const [internships, setInternships] = useState([]);
  const [isloading,setIsLoading] = useState(true)
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
      finally{
        setIsLoading(false)
      }
    };

    getInternships(); 
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isloading?(
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
      ) : internships.length===0?(
          <div className="col-span-3 mt-4 text-lg font-medium text-center text-gray-500">
          🚫 No Internships available at the moment.
        </div>
      ): (
        internships.map((singleInternship, index) => (
  <div
            key={index}
            className="border border-gray-200 shadow-xl card bg-base-100"
          >
            <div className="card-body">
              <h2 className="text-center card-title text-primary">
                {singleInternship.notificationCompany.toUpperCase()}
                <span className="text-sm text-gray-600">
                  {singleInternship.notificationTitle}
                </span>
              </h2>

              <p className="text-sm text-gray-600">
                {singleInternship.notificationDescription}
              </p>

              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <strong>Deadline:</strong> {singleInternship.notificationDeadlineDate}
                </p>
                <p>
                  <strong>Published:</strong> {singleInternship.notificationPublishDate}
                </p>
              </div>

              <div className="justify-center mt-2 card-actions">
                <a
                  href={singleInternship.notificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserViewInternships;
