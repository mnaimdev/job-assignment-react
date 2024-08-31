import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const Login = () => {
    const navigate = useNavigate();

    // Define the Yup schema for validation
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('The email field is required.'),
        password: Yup.string()
            .required('The password field is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
            ),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        axios.post('/login', {
            email: values.email,
            password: values.password,
        })
          .then(function (response) {
            if (response.data.status === 'success') {
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
          .finally(() => setSubmitting(false));
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="card" style={{marginTop: '200px'}}>
                            <div className="card-header bg-dark text-white">
                                <h3 className="m-auto text-center">Login Form</h3>
                            </div>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="form-group my-2">
                                                <label className='my-1'>Email</label>
                                                <Field 
                                                    type="email" 
                                                    name="email" 
                                                    className="form-control" 
                                                />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>

                                            <ToastContainer />

                                            <div className="form-group my-2">
                                                <label className='my-1'>Password</label>
                                                <Field 
                                                    type="password" 
                                                    name="password" 
                                                    className="form-control" 
                                                />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>

                                            Haven't any account? <Link to="/register"> Register</Link>

                                            <div className="form-group my-3">
                                                <button type="submit" className="btn btn-dark btn-sm" disabled={isSubmitting}>
                                                    Submit
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
    )
}

export default Login;
