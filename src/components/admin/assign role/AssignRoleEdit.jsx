import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const AssignRoleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [initialValues, setInitialValues] = useState({
    user_id: "",
    role_id: "",
  });

  // Fetch users, roles, and current assignment on component mount
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
        setRoles(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch roles");
      });

    // Fetch the current role assignment
    axios
      .get(`/assign_role/edit/${id}`)
      .then((response) => {
        const data = response.data.data;
        setInitialValues({
          user_id: data.user_id,
          role_id: data.role_id,
        });
      })
      .catch((error) => {
        toast.error("Failed to fetch role assignment");
      });
  }, [id]);

  // Yup validation schema
  const validationSchema = Yup.object({
    user_id: Yup.string().required("The user_id field is required"),
    role_id: Yup.string().required("The role_id field is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .put(`/assign_role/update/${id}`, {
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
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 m-auto">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h3 className="m-auto text-center">Edit Assigned Role</h3>
              </div>
              <div className="card-body">
                <Formik
                  enableReinitialize={true} // This will update the form when initialValues changes
                  initialValues={initialValues}
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
                          Update
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

export default AssignRoleEdit;
