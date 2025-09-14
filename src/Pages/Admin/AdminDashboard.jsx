import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deleteUserAPI,
  getAllUsersAPI,
} from "../../Services/Operation/AdminAPI";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import UserDetailsModal from "./UserDetailsModal";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";

// Show Details Button Component
const ShowDetailsButton = ({ user, onClick }) => {
  return (
    <button
      onClick={() => onClick(user)}
      className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
      title="Show Details"
    >
      <FaEye />
    </button>
  );
};

// Update Button Component
const UpdateButton = ({ user, onClick }) => {
  return (
    <button
      onClick={() => onClick(user)}
      className="p-2 text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
      title="Update"
    >
      <FaEdit />
    </button>
  );
};

// Delete Button Component
const DeleteButton = ({ user, onClick }) => {
  return (
    <button
      onClick={() => onClick(user)}
      className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
      title="Delete"
    >
      <FaTrash />
    </button>
  );
};

function AdminDashboard() {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
    console.log("Update user:", user);
  };

  const handleUpdateSubmit = (user, updatedData) => {
    console.log("Updating user:", user, "with data:", updatedData);
    // Implement update API call here
    // Example: await updateUserAPI(user.id, updatedData, token);
    // Refresh user data after update
    // setUsersData((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...updatedData } : u)));
  };

  const handleDelete = async (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    console.log("Delete user:", user);
  };

  const closeDetailsModal = () => {
    setSelectedUser(null);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await getAllUsersAPI(user.id, token);
        console.log("response in admin dashboard all users : " + response);
        console.log(
          "response in admin dashboard all users : " + JSON.stringify(response)
        );
        if (response.status === 200) {
          setUsersData(response?.data?.users);
        }
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    getUsersData();
  }, []);

  // Handle button actions
  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log("Show details for user:", user);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              User Management
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersData.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.contact_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.verified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.verified ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <ShowDetailsButton
                          user={user}
                          onClick={handleShowDetails}
                        />
                        <UpdateButton user={user} onClick={handleUpdate} />
                        <DeleteButton user={user} onClick={handleDelete} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <UpdateUserModal
        user={selectedUser}
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onUpdate={handleUpdateSubmit}
      />
      <DeleteUserModal
        user={selectedUser}
        isOpen={isDeleteModalOpen}
        onClose={closeDetailsModal}
      />
    </div>
  );
}

export default AdminDashboard;
