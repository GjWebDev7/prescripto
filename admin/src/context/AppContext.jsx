import { createContext } from "react";

// Create the AppContext
export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Environment variables
  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Array of month names for formatting
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Function to format the date (e.g., "20_01_2000" => "20 Jan 2000")
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    const day = dateArray[0];
    const month = Number(dateArray[1]) - 1; // Adjust month to 0-indexed array
    const year = dateArray[2];

    // Check if the month index is valid
    if (month >= 0 && month < months.length) {
      return `${day} ${months[month]} ${year}`;
    } else {
      return "Invalid date format"; // Handle invalid month
    }
  };

  // Function to calculate age (e.g., "20_01_2000" => 24)
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  // Context value to be shared
  const value = {
    backendUrl,
    currency,
    slotDateFormat,
    calculateAge,
  };

  // Return the provider with context value
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
