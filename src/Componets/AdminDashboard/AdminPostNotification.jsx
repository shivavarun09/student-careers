import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../Auth/FirebaseConfig/FirebaseConfig';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';

const AdminPostNotification = () => {
  const [notificationDetails, setNotificationDetails] = useState({
    notificationCategory: '',
    notificationType: '',
    notificationTitle: '',
    notificationDescription: '',
    notificationPublishDate: '',
    notificationDeadlineDate: '',
    notificationCompany: '',
    notificationLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
        notificationPublishDate: new Date().toISOString().slice(0, 10),
      };
      const updateData = {
        [notificationCategory]: arrayUnion(notificationData),
      };

      await setDoc(docRef, updateData, { merge: true });
      toast.success('Notification posted successfully');

      setNotificationDetails({
        notificationCategory: '',
        notificationType: '',
        notificationTitle: '',
        notificationDescription: '',
        notificationPublishDate: '',
        notificationDeadlineDate: '',
        notificationCompany: '',
        notificationLink: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.code}`);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="my-4 text-3xl text-center">Post Notification</h1>
      <Form onSubmit={handleSubmit}>
        {/* Your form groups (unchanged) */}
        <Form.Group className="mb-2">
          <Form.Label>Select Branch</Form.Label>
          <Form.Select
            onChange={handleChange}
            required
            value={notificationDetails.notificationCategory}
            name="notificationCategory"
          >
            <option value="">Select Branch</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
          </Form.Select>
        </Form.Group>
        {/* ...Rest of the form groups same as before... */}
        <Form.Group className="mt-3 text-center">
          <Button type="submit" variant="primary">
            Post Notification
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AdminPostNotification;
