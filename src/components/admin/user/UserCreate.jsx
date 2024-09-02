import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const UserCreate = () => {
    const navigate = useNavigate();

    // Validation schema using Yup
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

    // Handle form submission
    const handleSubmit = (values, { setSubmitting }) => {
        axios.post('/user/store', values)
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    navigate('/user');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('An error occurred while creating the user');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card mt-5">
                        <div className="card-header bg-dark text-white">
                            <h3 className="text-center m-auto">Create User</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{ name: '', email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="name">Name</label>
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
                                        <div className="form-group mb-3">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="password">Password</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-dark btn-sm"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Creating...' : 'Create'}
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

export default UserCreate;
