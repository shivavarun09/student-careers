import React, { useState } from 'react';

const DaisyUiAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    type: 'alert-success',
    message: '',
  });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className="p-4 space-y-4">
      <button
        className="btn btn-success"
        onClick={() => showAlert('alert-success', 'Form submitted successfully!')}
      >
        Show Success Alert
      </button>

      <button
        className="btn btn-error"
        onClick={() => showAlert('alert-info', 'Something went wrong!')}
      >
        Show Error Alert
      </button>

      {/* Alert Component */}
      {alert.show && (
        <div className={`alert ${alert.type} shadow-md `}>
          <span className='text-center'>{alert.message}</span>
        </div>
      )}
    </div>
  );
};

export default DaisyUiAlert;
