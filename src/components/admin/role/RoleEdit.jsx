import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

const RoleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`/role/edit/${id}`)
      .then(function (response) {
        if (response.data.status === 'success') {
          setName(response.data.data.name);
        } else if (response.data.status === 'error') {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Something went wrong. Please try again.');
      });
  }, [id]);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('The name field is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.put(`/role/update/${id}`, { name: values.name })
      .then(function (response) {
        if (response.data.status === 'success') {
          toast.success(response.data.message);
          navigate('/role'); // Redirect to roles list after success
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.data.errors) {
          toast.error(error.response.data.errors.name[0]);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 m-auto">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h3 className="m-auto text-center">Role Update</h3>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{ name: name }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, handleChange, values }) => (
                  <Form>
                    <ToastContainer />
                    <div className="form-group my-2">
                      <label className="my-1">Name</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="name" component="div" className="text-danger" />
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
  );
};

export default RoleEdit;
