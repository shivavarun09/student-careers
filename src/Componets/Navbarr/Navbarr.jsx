import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Auth/FirebaseConfig/FirebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast, Bounce } from "react-toastify";

const NavbarDaisyUi = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successful", {
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
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error during logout:", error); // Debug
      toast.error(`Error: ${error.code}`, {
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

  return (
    <>
      <div className="z-50 drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col drawer-content">
          <div className="sticky top-0 px-4 navbar bg-base-300">
            <div className="flex-none md:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>

            <div className="flex items-center flex-1 px-2 text-xl font-bold">
              <Link to="/" className="no-underline">
                Career's
              </Link>
            </div>

            <div className="hidden md:flex md:justify-center md:items-center">
              <ul className="px-1 menu menu-horizontal">
                {user && (
                  <li>
                    <Link to="/user-dashboard" className="no-underline">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/aboutus" className="no-underline">About Us</Link>
                </li>
                <li>
                  <Link to="/adminlogin" className="no-underline">Admin</Link>
                </li>
                <li>
                  <Link to="/contactus" className="no-underline">Contact Us</Link>
                </li>
                {user ? (
                  <li className="bg-blue-600">
                    <button onClick={() => setShowLogoutModal(true)}>Logout</button>
                  </li>
                ) : (
                  <li >
                    <Link to="/login" className="no-underlin" >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Drawer Side */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="absolute w-auto p-4 rounded-md menu min-h-auto top-16 left-2 bg-base-200">
            {user && (
              <li>
                <Link to="/user-dashboard" className="no-underline">Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/aboutus" className="no-underline">About Us</Link>
            </li>
            <li>
              <Link to="/adminlogin" className="no-underline">Admin</Link>
            </li>
            <li>
              <Link to="/contactus" className="no-underline">Contact Us</Link>
            </li>
            {user ? (
              <li>
                <button onClick={() => setShowLogoutModal(true)}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="no-underline">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold">Are you sure you want to logout?</h2>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowLogoutModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarDaisyUi;