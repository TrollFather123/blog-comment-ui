import * as yup from "yup";

export const userSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});


export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required"),
  description: yup
    .string()
    .required("Description is required"),
});



export const commentSchema = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required"),
});