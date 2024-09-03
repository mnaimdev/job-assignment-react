import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Permission = () => {
  const [data, setData] = useState([]);

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
      .get(`/permission`)
      .then(function (response) {
        console.log(response);

        if (response.data.status === "success") {
          toast.success(response.data.message);
          setData(response.data.data);
          console.log(response.data.data);
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

  const deletePermission = (id) => {
    axios
      .delete(`/permission/delete/${id}`)
      .then(function (response) {
        console.log("Delete response:", response); // Log the response
        if (response.data.status === "success") {
          toast.success(response.data.message);

          setData((prevData) => {
            console.log("Previous Data:", prevData); // Log the previous data
            const newData = prevData.filter((item) => item.id !== id);
            console.log("Updated Data:", newData); // Log the updated data
            return newData;
          });
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
  };

  return (
    <>
      <div className="container">
        {hasPermission("create_permission") && (
          <Link to="/permission/create" className="btn btn-primary btn-sm my-3">
            Create New
          </Link>
        )}

        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center m-auto">Permission List</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            {hasPermission("edit_permission") && (
                              <Link
                                to={`/permission/edit/${item.id}`}
                                className="btn btn-primary btn-sm"
                              >
                                Edit
                              </Link>
                            )}

                            {hasPermission("delete_permission") && (
                              <button
                                onClick={() => deletePermission(item.id)}
                                className="btn btn-danger mx-1 btn-sm"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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

export default Permission;
