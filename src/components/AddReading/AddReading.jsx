import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddReading.module.css";


const AddReading = ({ isReading, onStart, onStop, totalPages }) => {
  const validationSchema = Yup.object().shape({
    page: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .integer("Must be an integer")
      .min(1, "Minimum 1 page")
      .when([], {
        is: () => totalPages != null,
        then: (schema) => schema.max(totalPages, `Max pages is ${totalPages}`),
      })
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!isReading) {
      onStart(Number(values.page)); 
    } else {
      onStop(Number(values.page));
    }
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {isReading ? "Stop page:" : "Start page:"}
      </h3>
      
      <Formik
        initialValues={{ page: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.inputWrapper}>
              <label htmlFor="page" className={styles.label}>
                Page number:
              </label>
              <Field
                id="page"
                name="page"
                type="number"
                placeholder="0"
                className={`${styles.input} ${
                  errors.page && touched.page ? styles.inputError : ""
                }`}
              />
              <ErrorMessage name="page" component="div" className={styles.error} />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {isReading ? "To stop" : "To start"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddReading;