import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const AssignRoleCreate = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  // Fetch users and roles on component mount
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch users");
      });

    axios
      .get("/role")
      .then((response) => {
        console.log(response);
        setRoles(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch roles");
      });
  }, []);

  // Yup validation schema
  const validationSchema = Yup.object({
    user_id: Yup.string().required("The user_id field is required"),
    role_id: Yup.string().required("The role_id field is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(`/assign_role/store`, {
        role_id: values.role_id,
        user_id: values.user_id,
      })
      .then(function (response) {
        if (response.data.status === "success") {
          toast.success(response.data.message);
          navigate("/assign_role");
        } else if (response.data.status === "error") {
          const errorMessage = response.data.message;
          toast.error(errorMessage);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.data.errors) {
          const errors = error.response.data.errors;
          if (errors.name) {
            toast.error(errors.name[0]);
          }
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 m-auto">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h3 className="m-auto text-center">Assign Role Create</h3>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{ user_id: "", role_id: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <ToastContainer />
                      <div className="form-group my-2">
                        <label className="my-1">Select User</label>
                        <Field
                          as="select"
                          name="user_id"
                          className="form-control"
                        >
                          <option value="">Select a user</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="user_id"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group my-2">
                        <label className="my-1">Select Role</label>
                        <Field
                          as="select"
                          name="role_id"
                          className="form-control"
                        >
                          <option value="">Select a role</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="role_id"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group my-3">
                        <button
                          type="submit"
                          className="btn btn-dark btn-sm"
                          disabled={isSubmitting}
                        >
                          Assign Role
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignRoleCreate;
