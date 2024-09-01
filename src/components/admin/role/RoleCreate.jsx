import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

const RoleCreate = () => {
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("The name field is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);

    axios
      .post(`/role/store`, {
        name: values.name,
      })
      .then(function (response) {
        if (response.data.status === "success") {
          toast.success(response.data.message);
          navigate("/role");
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
                <h3 className="m-auto text-center">Role Create</h3>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{ name: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <ToastContainer />
                      <div className="form-group my-2">
                        <label className="my-1">Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
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
                          Create
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

export default RoleCreate;
