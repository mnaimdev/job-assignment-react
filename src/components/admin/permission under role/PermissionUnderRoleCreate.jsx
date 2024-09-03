import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

const PermissionUnderRoleCreate = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    // Fetch roles and permissions on component mount
    useEffect(() => {
        axios.get('/role')
            .then(response => {
                setRoles(response.data.data);
            })
            .catch(error => {
                toast.error('Failed to fetch roles');
            });

        axios.get('/permission')
            .then(response => {
                setPermissions(response.data.data);
            })
            .catch(error => {
                toast.error('Failed to fetch permissions');
            });
    }, []);

    // Yup validation schema
    const validationSchema = Yup.object({
        role_id: Yup.string().required('The role_id field is required'),
        permission_ids: Yup.array()
            .min(1, 'The permission_id field is required') 
            .required('The permission_id field is required')
    });
    
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        axios.post(`/permission_under_role/store`, {
            role_id: values.role_id,
            permission_id: values.permission_ids // Send the correct array here
        })
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    navigate('/permission_under_role');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                toast.error('Something went wrong. Please try again.');
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
                                <h3 className="m-auto text-center">Permission Under Role Create</h3>
                            </div>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ role_id: '', permission_ids: [] }} // Note the plural 'permission_ids'
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting, values, setFieldValue }) => (
                                        <Form>
                                            <ToastContainer />

                                            <div className="form-group my-2">
                                                <label className="my-1">Select Role</label>
                                                <Field as="select" name="role_id" className="form-control">
                                                    <option value="">Select a role</option>
                                                    {roles.map(role => (
                                                        <option key={role.id} value={role.id}>
                                                            {role.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="role_id" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group my-2">
                                                <label className="my-1">Select Permissions</label>
                                                <div>
                                                    {permissions.map(permission => (
                                                        <div key={permission.id} className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                name="permission_ids" // Note the plural 'permission_ids'
                                                                value={permission.id}
                                                                checked={values.permission_ids.includes(permission.id)}
                                                                onChange={e => {
                                                                    const { checked, value } = e.target;
                                                                    const currentPermissions = [...values.permission_ids];
                                                                    if (checked) {
                                                                        currentPermissions.push(Number(value));
                                                                    } else {
                                                                        const index = currentPermissions.indexOf(Number(value));
                                                                        if (index > -1) {
                                                                            currentPermissions.splice(index, 1);
                                                                        }
                                                                    }
                                                                    setFieldValue('permission_ids', currentPermissions);
                                                                }}
                                                                className="form-check-input"
                                                            />
                                                            <label className="form-check-label">
                                                                {permission.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                                <ErrorMessage name="permission_ids" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group my-3">
                                                <button type="submit" className="btn btn-dark btn-sm" disabled={isSubmitting}>
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

export default PermissionUnderRoleCreate;
