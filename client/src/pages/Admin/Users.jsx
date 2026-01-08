import { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");

  // Get all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/all-users");
      setLoading(false);
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/auth/update-user/${selected._id}`,
        {
          name: updatedName,
          email: updatedEmail,
          phone: updatedPhone,
          address: updatedAddress,
        }
      );
      if (data?.success) {
        toast.success("User updated successfully");
        setSelected(null);
        setUpdatedName("");
        setUpdatedEmail("");
        setUpdatedPhone("");
        setUpdatedAddress("");
        setVisible(false);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle Delete
  const handleDelete = async (userId) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!answer) return;
      
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${userId}`);
      if (data?.success) {
        toast.success("User deleted successfully");
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting user");
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Users</h1>

            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="users-table-container">
                <table className="table table-hover table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Address</th>
                      <th scope="col">Role</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td className="fw-bold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || "N/A"}</td>
                        <td>{user.address || "N/A"}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === 1 ? "bg-danger" : "bg-success"
                            }`}
                          >
                            {user.role === 1 ? "Admin" : "User"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => {
                              setVisible(true);
                              setSelected(user);
                              setUpdatedName(user.name);
                              setUpdatedEmail(user.email);
                              setUpdatedPhone(user.phone);
                              setUpdatedAddress(user.address);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users?.length === 0 && (
                  <div className="text-center mt-4">
                    <h5 className="text-muted">No users found</h5>
                  </div>
                )}

                <div className="mt-3">
                  <p className="text-muted">
                    Total Users: <strong>{users?.length}</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
        title="Update User"
      >
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              value={updatedPhone}
              onChange={(e) => setUpdatedPhone(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              value={updatedAddress}
              onChange={(e) => setUpdatedAddress(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update User
          </button>
        </form>
      </Modal>
    </Layout>
  );
};

export default Users;