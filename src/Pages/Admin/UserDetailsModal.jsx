import React from "react";
import { FaTimes } from "react-icons/fa";
function UserDetailsModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Full Name:</span>
            <p className="text-gray-600">
              {user.first_name} {user.last_name}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>
            <p className="text-gray-600">
              {user.email ? (
                <a href={`mailto:${user.email}`}>{user.email}</a>
              ) : (
                "NA"
              )}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Role:</span>
            <p className="text-gray-600 capitalize">{user.role}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Contact Number:</span>
            <p className="text-gray-600">
              {user.contact_no ? (
                <a href={`telto:${user.contactNumber}`}>{user.contact_no}</a>
              ) : (
                "NA"
              )}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">State:</span>
            <p className="text-gray-600">{user.state}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Country:</span>
            <p className="text-gray-600">{user.country}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Pin Code:</span>
            <p className="text-gray-600">{user.pinCode}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Verified:</span>
            <p className="text-gray-600">{user.verified ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Created At:</span>
            <p className="text-gray-600">
              {new Date(user.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsModal;
