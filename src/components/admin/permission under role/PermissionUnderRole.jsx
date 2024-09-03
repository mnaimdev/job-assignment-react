import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PermissionUnderRole = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState([]);

  const hasPermission = (permissionToCheck) => {
    return permissions.includes(permissionToCheck);
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("/permission/user");
        setPermissions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  useEffect(() => {
    axios
      .get(`/permission_under_role`)
      .then(function (response) {
        if (response.data.status === "success") {
          toast.success(response.data.message);

          // Process the data to map roles and permissions
          const fetchedData = response.data.data.map((role) => ({
            id: role.id,
            name: role.name,
            permissions: role.permissions
              .map((permission) => permission.name)
              .join(", "),
          }));

          setData(fetchedData); // Set the processed data into state
        }

        if (response.data.status === "error") {
          const errorMessage = response.data.message;
          toast.error(errorMessage);
        }
      })
      .catch(function (error) {
        console.log(error);
        let errors = error.response?.data?.errors || "An error occurred";
        toast.error(errors);
      });
  }, []);

  function deletePermissionUnderRole(id) {
    axios
      .delete(`/permission_under_role/delete/${id}`)
      .then(function (response) {
        if (response.data.status === "success") {
          toast.success(response.data.message);

          // Update the permissions list of the specific role by setting it to an empty string
          setData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, permissions: "" } : item
            )
          );
        }

        if (response.data.status === "error") {
          const errorMessage = response.data.message;
          toast.error(errorMessage);
        }
      })
      .catch(function (error) {
        console.log(error);
        let errors = error.response?.data?.errors || "An error occurred";
        toast.error(errors);
      });
  }

  return (
    <>
      <div className="container">
        {hasPermission("create_permission_under_role") && (
          <Link
            to="/permission_under_role/create"
            className="btn btn-primary btn-sm my-3"
          >
            Create New
          </Link>
        )}

        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center m-auto">
                  Permission Under Role List
                </h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Role</th>
                      <th>Permissions</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.permissions}</td>
                        <td>
                          {hasPermission("edit_permission_under_role") && (
                            <Link
                              to={`/permission_under_role/edit/${item.id}`}
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </Link>
                          )}

                          {hasPermission("delete_permission_under_role") && (
                            <button
                              className="btn btn-danger btn-sm mx-1"
                              onClick={() => deletePermissionUnderRole(item.id)}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionUnderRole;
