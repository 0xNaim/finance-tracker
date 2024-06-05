import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  // Initialize state using useState with the initial value or value from localStorage
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  // Use useEffect to update localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return the state value and setter function
  return [value, setValue];
};

export default useLocalStorage;
