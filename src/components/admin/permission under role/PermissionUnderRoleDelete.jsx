import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PermissionUnderRoleDelete = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    // Fetch roles, permissions, and initial data on component mount
    useEffect(() => {
        
    }, []);


    return (
        <>
          
        </>
    );
};

export default PermissionUnderRoleDelete;
