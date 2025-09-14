import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { deleteUserAPI } from "../../Services/Operation/AdminAPI";

function DeleteUserModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  const { token } = useSelector((state) => state.auth);

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteUserAPI(user?.userId, token);
      console.log("response in delete user API: ", response);
      console.log("response in delete user API: ", JSON.stringify(response));
      if (response.status === 200) {
        onClose(); // Close the modal after deletion
      }
    } catch (error) {
      console.log("Error in delete user API: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <FaTimes />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to delete the user{" "}
            <span className="font-semibold">
              {user.first_name} {user.last_name}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
