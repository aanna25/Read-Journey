import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/books/operations";
import styles from "./AddBook.module.css";

const AddBook = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    totalPages: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("Pages is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addBook(values)).unwrap();
      resetForm();
      // onOpenSuccessModal();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.labelTitle}>Create your library:</p>      
      <Formik
        initialValues={{ title: "", author: "", totalPages: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.inputGroup}>
            <Field
              name="title"
              type="text"
              placeholder="Book title:" 
              className={styles.input}
            />
            <ErrorMessage name="title" component="p" className={styles.errorMsg} />
          </div>
          <div className={styles.inputGroup}>
            <Field
              name="author"
              type="text"
              placeholder="The author:"
              className={styles.input}
            />
            <ErrorMessage name="author" component="p" className={styles.errorMsg} />
          </div>
          <div className={styles.inputGroup}>
            <Field
              name="totalPages"
              type="number"
              placeholder="Number of pages:"
              className={styles.input}
            />
            <ErrorMessage name="totalPages" component="p" className={styles.errorMsg} />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Add book
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBook;