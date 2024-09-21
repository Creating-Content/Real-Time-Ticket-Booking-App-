// Import necessary dependencies and components
import React from "react";
import { Form, Input, Modal, Row, Col, message } from "antd"; // Import Ant Design components
import Button from "../../components/Button"; // Import custom Button component
import { useDispatch } from "react-redux"; // Import useDispatch hook for Redux
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Import Redux actions
import { AddMovie, UpdateMovie } from "../../apicalls/movies"; // Import API call functions
import moment from "moment"; // Import moment library for date manipulation

// Define the MovieForm component
function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) {
  // Format the selected movie's release date using moment if it exists
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  const dispatch = useDispatch(); // Initialize the useDispatch hook

  // Define the function to be called when the form is submitted
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); // Dispatch the ShowLoading action
      let response = null; // Initialize the response variable

      // Determine whether to add or update the movie based on formType
      if (formType === "add") {
        response = await AddMovie(values); // Call AddMovie API function
      } else {
        response = await UpdateMovie({
          ...values,
          movieId: selectedMovie._id, // Pass updated movieId for UpdateMovie
        });
      }

      // Check if API call was successful
      if (response.success) {
        getData(); // Fetch updated data
        message.success(response.message); // Display success message
        setShowMovieFormModal(false); // Close the modal
      } else {
        message.error(response.message); // Display error message
      }
      dispatch(HideLoading()); // Dispatch the HideLoading action
    } catch (error) {
      dispatch(HideLoading()); // Dispatch the HideLoading action in case of error
      message.error(error.message); // Display error message
    }
  };

  return (
    <Modal
      title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"} // Display modal title based on formType
      open={showMovieFormModal} // Control modal visibility
      onCancel={() => {
        // Handle modal cancellation
        setShowMovieFormModal(false); // Close the modal
        setSelectedMovie(null); // Reset selectedMovie
      }}
      footer={null} // No footer content
      width={800} // Set modal width
    >
      {/* Create the form using Ant Design Form component */}
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter={16}>
          {/* Form fields */}
          <Col span={24}>
            <Form.Item label="Movie Name" name="title">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Movie Description" name="description">
              <textarea type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Movie Duration" name="duration">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Language" name="language">
              <select name="" id="">
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Other">Other</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Movie Release Date" name="releaseDate">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <select name="" id="">
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical">Historical</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Thriller">Thriller</option>
                <option value="Western">Western</option>
                <option value="Other">Other</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Poster URL" name="poster">
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>

        {/* Buttons for form actions */}
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowMovieFormModal(false); // Close the modal
              setSelectedMovie(null); // Reset selectedMovie
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

// Export the MovieForm component
export default MovieForm;