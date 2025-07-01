import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Auth/FirebaseConfig/FirebaseConfig";

const AdminViewJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const GetJobs = async () => {
      try {
        const jobRef = doc(db, "Notifications", "jobs");
        const docSnap = await getDoc(jobRef);
        // alert("executed");

        if (docSnap.exists()) {
          console.log(docSnap.data());
          const data = docSnap.data();
          const allJobs = Object.values(data).flat();
          console.log(allJobs);
          setJobs(allJobs);
        } else {
          alert("No jobs found");
        }
      } catch (error) {
        alert("Error fetching jobs");
        console.error(error);
      }
    };

    GetJobs(); 
  }, []);

  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs.length === 0 ? (
        <span className="loading loading-spinner text-primary "></span>
      ) : (
        jobs.map((job, index) => (
          <div key={index} className="p-4 m-2 border rounded shadow-md bg-base-100 ">
            <p><strong>Title:</strong> {job.notificationTitle}</p>
            <p><strong>Description:</strong> {job.notificationDescription}</p>
            <p><strong>Company:</strong> {job.notificationCompany}</p>
            <p><strong>Deadline:</strong> {job.notificationDeadlineDate}</p>
            <p><strong>Link:</strong> <a href={job.notificationLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Apply</a></p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminViewJobs;
