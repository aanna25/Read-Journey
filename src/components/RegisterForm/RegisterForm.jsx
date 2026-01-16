import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../../utils/validationSchemas";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";

import styles from "./RegisterForm.module.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      resetForm();
    } catch {
      toast.error("Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
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
              styles.nameWrapper,
              touched.name && errors.name
                ? styles.errorMargin
                : styles.defaultMargin
            )}
          >
            <Field
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={clsx(
                styles.nameInput,
                touched.name && errors.name && styles.inputErrorBorder,
                touched.name && !errors.name && styles.inputSuccessBorder
              )}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />
          </div>

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
              type="password"
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
              className={styles.submitButton}
            >
              Registration
            </button>

            <Link to="/login" className={styles.linkLogin}>
              Already have an account?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;