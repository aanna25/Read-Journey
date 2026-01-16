import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/books/selectors";
import { setFilter } from "../../redux/books/slice";
import styles from "./FiltersForm.module.css";

const FiltersForm = () => {
  const dispatch = useDispatch();

  const currentFilter = useSelector(selectFilter);

  const handleSubmit = (values) => {
    const newFilter = {
      title: values.title.trim(),
      author: values.author.trim(),
    };
    dispatch(setFilter(newFilter));
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Filters:</p>
      <Formik 
        initialValues={currentFilter} 
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form className={styles.form}>
          <div className={styles.inputsBlock}>
            <Field
              name="title"
              type="text"
              placeholder="Book title:"
              className={styles.input}
            />
            <Field
              name="author"
              type="text"
              placeholder="The author:"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            To apply
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FiltersForm;