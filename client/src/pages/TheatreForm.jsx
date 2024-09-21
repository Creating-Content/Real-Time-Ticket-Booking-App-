// Import necessary libraries and components
import { Form, message, Modal } from "antd";
import React from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { addTheatre, updateTheatre } from "../../apicalls/theatres";

// Define a React component named TheatreForm
function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  // Use the useSelector hook to extract the 'user' object from the Redux store's 'users' slice
  const { user } = useSelector((state) => state.users);

  // Get a reference to the Redux 'dispatch' function
  const dispatch = useDispatch();

  // Define an asynchronous function 'onFinish' to handle form submission
  const onFinish = async (values) => {
    // Assign the owner's ID to the 'owner' property in the 'values' object
    values.owner = user._id;

    try {
      // Dispatch the 'ShowLoading' action to display a loading indicator
      dispatch(ShowLoading());

      let response = null;
      // Check the form type to decide whether to add or update a theatre
      if (formType === "add") {
        // Call the 'addTheatre' API function to add a new theatre
        response = await addTheatre(values);
      } else {
        // Set the 'theatreId' property and call the 'updateTheatre' API function to update a theatre
        values.theatreId = selectedTheatre._id;
        response = await updateTheatre(values);
      }

      // Check if the API response was successful
      if (response.success) {
        // Display a success message and perform necessary actions
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        // Display an error message if the API response was not successful
        message.error(response.message);
      }
      // Dispatch the 'HideLoading' action to hide the loading indicator
      dispatch(HideLoading());
    } catch (error) {
      // Handle errors by displaying an error message and hiding the loading indicator
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Return JSX that renders the theatre form within a Modal
  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal} // Note: Changed 'open' to 'visible'
      onCancel={() => {
        // Close the modal and reset the selected theatre
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        {/* Form fields */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theatre address!" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input theatre email!" }]}
        >
          <input type="text" />
        </Form.Item>
        {/* Buttons for form actions */}
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              // Cancel button action: Close the modal and reset the selected theatre
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

// Export the TheatreForm component as the default export
export default TheatreForm;