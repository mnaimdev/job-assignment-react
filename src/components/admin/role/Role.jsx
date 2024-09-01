import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Role = () => {
    const [data, setData] = useState([{name: ''}]);

    useEffect(() => {
        axios.get(`/role`)
        .then(function (response) {
            console.log(response);

            if (response.data.status == 'success') {
                toast.success(response.data.message);
                setData(response.data.data);
               console.log(data);
            }

            if (response.data.status == 'error') {
                const errorMessage = response.data.message;
                toast.error(errorMessage);
            }
          })
          .catch(function (error) {
            console.log(error);
            let errors = error.response.data.errors;
            toast.error(errors);
          });

    }, []);

  return (
    <>
      <div className="container">
        <Link to="/role/create" className="btn btn-primary btn-sm my-3">Create New</Link>
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center m-auto">Role List</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                
                {
                    data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={`/role/edit/${item.id}`} className="btn btn-primary">Edit</Link>
                                </td>
                            </tr>
                        );
                    })
                }
                 

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
