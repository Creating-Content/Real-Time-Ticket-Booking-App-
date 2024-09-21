// Importing the necessary libraries and components
import React, { useEffect } from "react"; // Importing the React library, used for creating React components
import { Form, message } from "antd"; // Importing the 'Form' component from the 'antd' library, a UI component library for React
import Button from "../../components/Button"; // Importing a custom 'Button' component from a file located at '../../components/Button'
import { Link, useNavigate } from "react-router-dom"; // Importing the 'Link' component from the 'react-router-dom' library, used for navigation in a React application
import { LoginUser } from "../../apicalls/users"; // Importing the 'LoginUser' function from a file located at '../../apicalls/users'
import { useDispatch } from "react-redux"; // Importing the 'useDispatch' hook from the 'react-redux' library
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Importing the 'HideLoading' and 'ShowLoading' actions from a file located at '../../redux/loadersSlice'

// Defining the 'Register' functional component
function Register() {
  const navigate = useNavigate(); // Creating a navigate function using the 'useNavigate' hook from the 'react-router-dom' library
  const dispatch = useDispatch(); // Creating a dispatch function using the 'useDispatch' hook from the 'react-redux' library
  // Creating a function 'onFinish' that will be called when the form is submitted successfully
  const onFinish = async (values) => {
    // console.log("Success:", values); // Output the form values to the console

    try {
      dispatch(ShowLoading()); // Dispatching the 'ShowLoading' action to show the loading indicator
      const response = await LoginUser(values); // Calling the 'LoginUser' function with the form values as the argument
      dispatch(HideLoading()); // Dispatching the 'HideLoading' action to hide the loading indicator
      if (response.success) {
        message.success(response.message); // Displaying a success message if the login was successful
        localStorage.setItem("token", response.data); // Storing the JWT token in the browser's local storage
        window.location.href = "/"; // Redirecting the user to the home page
      } else {
        message.error(response.message); // Displaying an error message if the login was unsuccessful
      }
    } catch (error) {
      dispatch(HideLoading()); // Dispatching the 'HideLoading' action to hide the loading indicator
      message.error(error.message); // Displaying an error message if an error occurred while processing the request
    }
  };

  // The 'useEffect' hook runs once after the component is mounted
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // If a token is found in local storage, redirect the user to the home page
    }
  }, []);

  // Rendering the component's UI using JSX
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">BookMyMovie - LOGIN</h1>
        <hr />
        {/* 'Form' component from Ant Design */}
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          {/* Email input field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>

          {/* Password input field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          {/* Container for the login button and registration link */}
          <div className="flex flex-col mt-2 gap-1">
            {/* Custom 'Button' component */}
            <Button fullWidth title="LOGIN" type="submit" />

            {/* Link to the registration page */}
            <Link to="/register" className="text-primary">
              {" "}
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

// Exporting the 'Register' component as the default export
export default Register;