import React from 'react';
import Container from '../components/Container';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {registerUser} from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const signUpSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name is Required"),
    email: yup.string().email("Email Should be Valid").required("Email Address is Required "),
    password: yup.string().required("password is Required"),
});

const Signup = () => {
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: "",
        },
        validationSchema: signUpSchema,
        onSubmit: async(values) => {
          try {
            const response = await axios.post('http://localhost:5000/api/user/register', values);
    
            if (response.status === 200) {
              navigate('/');
            } else {
              // Handle error response
              console.error('Sign-up request failed:', response);
            }
          } catch (error) {
            // Handle network or other errors
            console.error('Sign-up request failed:', error);
          }
        },
    });


    return (
        <>
            <Container className="login-wrapper py-5 home-wrapper-2">
  <div className="row">
    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      <div className="auth-card">
        <h3 className="text-center mb-3">Sign Up</h3>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-15"
        >
          <CustomInput
            type="name"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange("firstname")}
            onBlur={formik.handleBlur("firstname")}
            placeholder="First Name"
          />
          <div className="error">
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <CustomInput
            type="name"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange("lastname")}
            onBlur={formik.handleBlur("lastname")}
            placeholder="Last Name"
          />
          <div className="error">
            {formik.touched.lastname && formik.errors.lastname}
          </div>
          <CustomInput
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            placeholder="Email"
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
         
          <CustomInput
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            placeholder="Password"
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <div>
            <div className="d-flex mt-3 justify-content-center align-items-center gap-15">
              <button className="button border-0" type='submit'>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</Container>

        </>
    )
}

export default Signup