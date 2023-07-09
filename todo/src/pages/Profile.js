
import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileSchema = yup.object({
  firstname: yup.string().required('First Name is Required'),
  lastname: yup.string().required('Last Name is Required'),
  email: yup.string().email('Email Should be Valid').required('Email Address is Required'),
});

const Profile = () => {
  const token =localStorage.getItem('token');
  const [edit, setEdit] = useState(true);
  const [userState, setUserState] = useState(null);
  const navigate=useNavigate();

  const { email } = useParams();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/single/${email}`);
        const userData = response.data;
        setUserState(userData);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname || '',
      lastname: userState?.lastname || '',
      email: userState?.email || '',
    },
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put('http://localhost:5000/api/user/update', values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEdit(true);

        if (response.status === 200) {
          console.log('Updated');
          toast.success('Profile updated successfully');

        } else {
          console.error('Update request failed:', response);
          toast.error('Failed to update profile');

        }
      } catch (error) {
        console.error('Update failed:', error);
        toast.error('Failed to update profile');

      }
    },
  });

  if (!userState) {
    return <div>Loading user details...</div>;
  }


  return (
    <>
     {/* Logout button */}
     <button  onClick={handleLogout} className="btn btn-primary">Logout</button>
      {/* Rest of the profile update page */}

      <Container class1="profile-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="my-3">Update Profile</h5>
              <FiEdit className="fs-3" onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  disabled={edit}
                  className="form-control"
                  id="example1"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="errors">{formik.touched.firstname && formik.errors.firstname}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  disabled={edit}
                  className="form-control"
                  id="example2"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="errors">{formik.touched.lastname && formik.errors.lastname}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  disabled={edit}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="errors">{formik.touched.email && formik.errors.email}</div>
              </div>

              {edit ? (
                <button type="button" className="btn btn-primary" onClick={() => setEdit(false)}>
                  Edit
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
