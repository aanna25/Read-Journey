import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/auth/operations";
import { loginSchema } from "../../utils/validationSchemas";

import clsx from "clsx";
import toast from "react-hot-toast";
import styles from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword] = useState(false);

  // const toggleShowPassword = () => {
  //   setShowPassword((prev) => !prev);
  // };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(login(values)).unwrap();
      resetForm();
    } catch {
      toast.error("Login failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form className={styles.formContainer}>
          <div
            className={clsx(
              styles.inputWrapper,
              styles.emailWrapper,
              touched.email && errors.email
                ? styles.errorMargin
                : styles.defaultMargin
            )}
          >
            <Field
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={clsx(
                styles.emailInput,
                touched.email && errors.email && styles.inputErrorBorder,
                touched.email && !errors.email && styles.inputSuccessBorder
              )}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={clsx(styles.inputWrapper, styles.passwordWrapper)}>
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={clsx(
                styles.passwordInput,
                touched.password && errors.password && styles.inputErrorBorder,
                touched.password &&
                  !errors.password &&
                  styles.inputSuccessBorder
              )}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.footer}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(styles.submitButton, styles.primaryButton)}
            >
              Log In
            </button>

            <Link to="/register" className={styles.linkRegister}>
              Don’t have an account?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
