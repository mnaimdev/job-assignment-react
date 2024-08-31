import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const Register = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const navigate = useNavigate();

    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('The name field is required')
            .min(2, 'Name must be at least 2 characters long'),
        email: Yup.string()
            .email('Invalid email address')
            .required('The email field is required'),
        password: Yup.string()
            .required('The password field is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain one capital letter, one small letter, one number, one special character and minimum 8 characters long'
            ),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        axios.post('/register', {
            name: values.name,
            email: values.email,
            password: values.password,
        })
          .then(function (response) {
            if (response.data.status === 'success') {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else if (response.data.status === 'error') {
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
                if (errors.email) {
                    toast.error(errors.email[0]);
                }
                if (errors.password) {
                    toast.error(errors.password[0]);
                }
            } else {
                toast.error('Something went wrong. Please try again.');
            }
          })
          .finally(() => {
              setSubmitting(false);
              resetForm();
          });
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="card" style={{ marginTop: '200px' }}>
                            <div className="card-header bg-dark text-white">
                                <h3 className="m-auto text-center">Register Form</h3>
                            </div>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ name: '', email: '', password: '' }}
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
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group my-2">
                                                <label className="my-1">Email</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group my-2">
                                                <label className="my-1">Password</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group my-3 d-flex justify-content-between">
                                                <button
                                                    type="submit"
                                                    className="btn btn-dark btn-sm"
                                                    disabled={isSubmitting}
                                                >
                                                    Submit
                                                </button>
                                                <p>Already registered? <Link to="/login">Login</Link></p>
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
}

export default Register;
