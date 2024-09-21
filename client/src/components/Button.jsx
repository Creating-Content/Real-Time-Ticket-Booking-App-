// Importing the React library, which is necessary to use React components and JSX syntax.
import React from "react";

// Defining a functional component called "Button" that takes props as its argument.
function Button({ title, onClick, variant, disabled, fullWidth, type }) {
  // Initializing a variable called "className" with a default CSS class name for the button.
  let className = "bg-primary p-1 text-white";

  // Checking if the "fullWidth" prop is truthy, and if so, adding a class to make the button full width.
  if (fullWidth) {
    className += " w-full";
  }

  // Checking if the "variant" prop is equal to "outlined", and if so, modifying the class to create an outlined button style.
  if (variant === "outlined") {
    // Using the "replace" method to change the class names for an outlined style.
    className = className.replace(
      "bg-primary",
      "border border-primary text-primary bg-white"
    );
  }

  // Returning the JSX code for the button component with the determined class names and attributes.
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

// Exporting the "Button" component so that it can be used in other parts of the React application.
export default Button;