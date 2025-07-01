import React, { useState } from 'react';
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { db } from '../../Auth/FirebaseConfig/FirebaseConfig';
import { arrayUnion, doc, serverTimestamp, setDoc } from 'firebase/firestore';

const AdminMainPost = ({modal}) => {
  const [notificationDetails, setNotificationDetails] = useState({
    notificationCategory: "",
    notificationType: '',
    notificationTitle: '',
    notificationDescription: '',
    notificationPublishDate: '',
    notificationDeadlineDate: "",
    notificationCompany: "",
    notificationLink: "",
    
  });


  const handalNotificationDetails = (e) => {
    const { name, value } = e.target;
    setNotificationDetails((prev) => ({ ...prev, [name]: value }));
  };

const handalNotification = async (e) => {
  e.preventDefault();
  const {
    notificationType,
    notificationTitle,
    notificationDescription,
    notificationDeadlineDate,
    notificationCompany,
    notificationLink,
    notificationCategory,
  } = notificationDetails;

  try {
    const docRef = doc(db, 'Notifications', `${notificationType}s`);

    const notificationData = {
      notificationTitle,
      notificationDescription,
      notificationDeadlineDate,
      notificationCompany,
      notificationLink,
      notificationCategory,
      notificationPublishDate: new Date().toISOString().slice(0,10), 
      id: crypto.randomUUID()

    };

    const updateData = {
      [notificationCategory]: arrayUnion(notificationData),
    };

    await setDoc(docRef, updateData, { merge: true });

    toast.success('Notification posted successfully',{
position: "top-right",
autoClose: 2500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});

    // setNotificationDetails({
    //   notificationCategory: "",
    //   notificationType: '',
    //   notificationTitle: '',
    //   notificationDescription: '',
    //   notificationPublishDate: '',
    //   notificationDeadlineDate: "",
    //   notificationCompany: "",
    //   notificationLink: "",
    // });
  } catch (error) {
    console.error(error);
    toast.error(`Error: ${error.code}`,{
position: "top-right",
autoClose: 2500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
  }
};


  const {
    notificationType,
    notificationTitle,
    notificationDescription,
    notificationDeadlineDate,
    notificationCompany,
    notificationLink,
    notificationCategory,
  } = notificationDetails;

  return (
    <div className="container p-1 lg:p-4">
      <ToastContainer autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}  />
      <h1 className="my-4 text-3xl text-center">Post Notification</h1>
      
          <Form onSubmit={handalNotification}>
            <Form.Group className="mb-2">
              <Form.Label>Select Branch</Form.Label>
              <Form.Select onChange={handalNotificationDetails} required value={notificationCategory} name="notificationCategory">
                <option value="">Select Branch</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="eee">EEE</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Select Notification Type</Form.Label>
              <Form.Select onChange={handalNotificationDetails} required value={notificationType} name="notificationType">
                <option value="">Select Notification Type</option>
                <option value="job">Job</option>
                <option value="internship">Internship</option>
                <option value="skillCourse">Skill Course</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Notification Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job or Internship or Course Name"
                onChange={handalNotificationDetails}
                value={notificationTitle}
                required
                name="notificationTitle"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                onChange={handalNotificationDetails}
                value={notificationCompany}
                required
                name="notificationCompany"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Notification Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Notification Description"
                onChange={handalNotificationDetails}
                value={notificationDescription}
                required
                name="notificationDescription"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Notification Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter or Paste Notification Link"
                onChange={handalNotificationDetails}
                value={notificationLink}
                required
                name="notificationLink"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Notification Deadline</Form.Label>
              <Form.Control
                type="date"
                onChange={handalNotificationDetails}
                value={notificationDeadlineDate}
                required
                name="notificationDeadlineDate"
              />
            </Form.Group>

            <Form.Group className="mt-3 text-center">
              <Button type="submit" variant="primary">
                Post Notification
              </Button>
            </Form.Group>
          </Form>
    </div>
  );
};

export default AdminMainPost;
