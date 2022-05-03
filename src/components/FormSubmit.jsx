// import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const FormSubmit = () => {
  //initialValues/onSubmit/validate/validationSchema/
  //formik.values/formik.errors/formik.touched
  //formik.handleChange/formik.handleSubmit/formik.handleBlur
  //all props to pass into input and relate to formik =>{...formik.getFieldProps("name or email ...")}
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      comfirmPassword: "",
    },
    validateOnMount:true,
    onSubmit: (values) => {
      //وقتی سابمیت کردی لاگ میگیره
      //   console.log(values);
    },
    // validate: (values) => {
    //   //با هر تغییری لاگ میگیره
    //   //   console.log(values);
    //   let errors = {};
    //   if (!values.name) errors.name = "please enter your name";
    //   if (!values.email) errors.email = "please enter your email";
    //   if (!values.password) errors.password = "please enter your password";
    //   else if (values.password.length < 6) errors.password = "less than 6";
    //   return errors;
    // },
    validationSchema: yup.object({
      name: yup.string().required("please enter your name"),
      email: yup
        .string()
        .required("please enter your email")
        .email("Invalid Email"),
      phoneNumber: yup
        .string()
        .required("please enter your phone number")
        .matches(/^[0-9]{11}$/, "Phone number is not valid")
        .nullable(),
      password: yup
        .string()
        .required("please enter your password")
        .min(6, "less than 6 character")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
           "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
         ),
      comfirmPassword: yup
        .string()
        .required("please enter your comfirm password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="form-control">
        {formik.errors.name && formik.touched.name && (
          <p className="error">{formik.errors.name}</p>
        )}
        <input
          type="text"
          name="name"
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.name}
          {...formik.getFieldProps("name")}
        />
        <label> Name: </label>
      </div>
      <div className="form-control">
        {formik.errors.email && formik.touched.email && (
          <p className="error">{formik.errors.email}</p>
        )}
        <input type="text" name="email" {...formik.getFieldProps("email")} />
        <label> Email: </label>
      </div>
      <div className="form-control">
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <p className="error">{formik.errors.phoneNumber}</p>
        )}
        <input
          type="text"
          name="phoneNumber"
          {...formik.getFieldProps("phoneNumber")}
        />
        <label> Phone Number: </label>
      </div>
      <div className="form-control">
        {formik.errors.password && formik.touched.password && (
          <p className="error">{formik.errors.password}</p>
        )}
        <input
          type="text"
          name="password"
          {...formik.getFieldProps("password")}
        />
        <label> Password: </label>
      </div>
      <div className="form-control">
        {formik.errors.comfirmPassword && formik.touched.comfirmPassword && (
          <p className="error">{formik.errors.comfirmPassword}</p>
        )}
        <input
          type="text"
          name="comfirmPassword"
          {...formik.getFieldProps("comfirmPassword")}
        />
        <label>Comfirm Password: </label>
      </div>

      <button type="submit" disabled={!formik.isValid} >submit</button>
    </form>
  );
};

export default FormSubmit;
