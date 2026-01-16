import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import styles from "./Filters.module.css";

const Filters = ({ filter, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "all", label: "All books" },
    { value: "unread", label: "Unread" },
    { value: "in-progress", label: "In progress" },
    { value: "done", label: "Finished" },
  ];

  const handleSelect = (value) => {
    setFilter(value);
    setIsOpen(false);
  };

  const currentLabel = options.find((opt) => opt.value === filter)?.label;

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLabel}
        <LuChevronDown
          className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.item} ${
                filter === option.value ? styles.active : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filters;
