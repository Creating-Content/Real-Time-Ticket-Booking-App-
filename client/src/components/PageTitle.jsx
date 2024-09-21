// Import the React library, which is necessary for creating React components.
import React from "react";

// Define a functional component named PageTitle.
// It accepts a prop named 'title'.
function PageTitle({ title }) {
  // Render the following JSX code when the component is used.
  return (
    // Render an <h1> (heading) element with specific CSS classes.
    <h1 className="text-xl uppercase">
      {/* Display the 'title' prop value inside the <h1> element. */}
      {title}
    </h1>
  );
}

// Export the PageTitle component so that it can be used in other parts of the application.
export default PageTitle;