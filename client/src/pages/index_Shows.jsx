// Importing required dependencies and components from external libraries and files.
import { Col, Form, Modal, Row, Table, message } from "antd";
import React from "react";
import Button from "../../../components/Button"; // Importing a custom Button component.
import { GetAllMovies } from "../../../apicalls/movies"; // Importing API call functions.
import { useDispatch } from "react-redux"; // Importing Redux hook for dispatching actions.
import { ShowLoading, HideLoading } from "../../../redux/loadersSlice"; // Importing Redux actions for loading state.
import { useEffect } from "react"; // Importing React hook for side effects.
import {
  AddShow,
  DeleteShow,
  GetAllShowsByTheatre,
} from "../../../apicalls/theatres"; // Importing API call functions.
import moment from "moment"; // Importing moment.js library for date and time manipulation.

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  // Defining a functional component named Shows with props.

  // Defining state variables using React hooks.
  const [view, setView] = React.useState("table"); // State for controlling view mode.
  const [shows, setShows] = React.useState([]); // State for storing show data.
  const [movies, setMovies] = React.useState([]); // State for storing movie data.
  const dispatch = useDispatch(); // Getting the dispatch function from Redux.

  // Defining an asynchronous function to fetch data from APIs.
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // Dispatching a Redux action to show loading state.
      const moviesResponse = await GetAllMovies(); // Calling the GetAllMovies API.
      if (moviesResponse.success) {
        setMovies(moviesResponse.data); // Updating the movies state with API response data.
      } else {
        message.error(moviesResponse.message); // Displaying an error message if API call fails.
      }

      // Calling the GetAllShowsByTheatre API.
      const showsResponse = await GetAllShowsByTheatre({
        theatreId: theatre._id, // Passing the theatre ID as a parameter.
      }); // Calling the GetAllShowsByTheatre API.
      if (showsResponse.success) {
        setShows(showsResponse.data); // Updating the shows state with API response data.
      } else {
        message.error(showsResponse.message); // Displaying an error message if API call fails.
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading state.
    } catch (error) {
      message.error(error.message); // Displaying an error message if an exception occurs.
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading state.
    }
  };

  // Defining an asynchronous function to handle adding a new show.
  const handleAddShow = async (values) => {
    try {
      dispatch(ShowLoading()); // Dispatching a Redux action to show loading state.
      const response = await AddShow({
        ...values,
        theatre: theatre._id,
      }); // Calling the AddShow API with provided values.
      if (response.success) {
        message.success(response.message); // Displaying a success message if API call is successful.
        getData(); // Fetching updated data from APIs.
        setView("table"); // Switching the view mode to "table".
      } else {
        message.error(response.message); // Displaying an error message if API call fails.
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading state.
    } catch (error) {
      message.error(error.message); // Displaying an error message if an exception occurs.
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading state.
    }
  };

  // Defining an asynchronous function to handle deleting a show
  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading()); // Dispatching an action to show a loading spinner
      // Deleting a show using an API call and updating the 'shows' state upon success
      const response = await DeleteShow({
        showId: id,
      });
      if (response.success) {
        message.success(response.message); // Displaying a success message using Ant Design's 'message' component
        getData(); // Fetching updated data
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's 'message' component
      }
      dispatch(HideLoading()); // Dispatching an action to hide the loading spinner
    } catch (error) {
      dispatch(HideLoading()); // Dispatching an action to hide the loading spinner
      message.error(error.message); // Displaying an error message using Ant Design's 'message' component
    }
  };

  // Configuration for the table columns
  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      // Custom rendering for the 'date' column
      render: (text, record) => {
        return moment(text).format("MMM Do YYYY"); // Formatting the date using the 'moment' library
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
      // Custom rendering for the 'movie' column
      render: (text, record) => {
        return record.movie.title; // Displaying the title of the associated movie.
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
      // Custom rendering for the 'availableSeats' column
      render: (text, record) => {
        return record.totalSeats - record.bookedSeats.length; // Calculating available seats by subtracting booked seats from total seats.
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      // Custom rendering for the 'action' column
      render: (text, record) => {
        return (
          // Rendering a delete icon if there are no booked seats for the show
          <div className="flex gap-1 items-center">
            {record.bookedSeats.length === 0 && (
              <i
                className="ri-delete-bin-line"
                onClick={() => {
                  handleDelete(record._id); // Triggering the handleDelete function when clicking the delete icon.
                }}
              ></i>
            )}
          </div>
        );
      },
    },
  ];

  // Fetching data when the component mounts using the 'useEffect' hook
  useEffect(() => {
    getData();
  }, []);

  // Rendering the component's UI
  return (
    // Ant Design's Modal component for showing the modal
    <Modal
      title="" //SHOWS
      open={openShowsModal} // Controlled by the 'openShowsModal' prop
      onCancel={() => setOpenShowsModal(false)} // Handling modal close
      width={1400} // Setting the width of the modal
      footer={null} // Hiding the footer
    >
      {/* Displaying the theater name */}
      <h1 className="text-primary text-md uppercase mb-1">
        Theatre : {theatre.name}
      </h1>
      <hr />

      {/* Displaying the theater address */}
      <div className="flex justify-between mt-1 mb-1 items-center">
        {/* Displaying either "Shows" or "Add Show" based on the current view */}
        <h1 className="text-md uppercase">
          {view === "table" ? "Shows" : "Add Show"}
        </h1>
        {/* Displaying an "Add Show" button when in the "table" view */}
        {view === "table" && (
          <Button
            variant="outlined"
            title="Add Show"
            onClick={() => {
              setView("form"); // Switching to the "form" view when clicking the "Add Show" button.
            }}
          />
        )}
      </div>

      {/* Conditional rendering based on the 'view' state */}
      {view === "table" && <Table columns={columns} dataSource={shows} />}

      {/* Conditional rendering based on the 'view' state */}
      {view === "form" && (
        // Rendering the form for adding a new show
        <Form layout="vertical" onFinish={handleAddShow}>
          {/* A form for adding a new theater show */}
          <Row gutter={[16, 16]}>
            {/* Form input fields for show details */}
            <Col span={8}>
              {/* Input field for show name */}
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input show name!" }]}
              >
                <input />
              </Form.Item>
            </Col>

            <Col span={8}>
              {/* Input field for show date */}
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input show date!" }]}
              >
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
                {/* Setting the minimum date to today */}
              </Form.Item>
            </Col>

            <Col span={8}>
              {/* Input field for show time */}
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please input show time!" }]}
              >
                <input type="time" />
              </Form.Item>
            </Col>

            <Col span={8}>
              {/* Input field for movie */}
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Please select movie!" }]}
              >
                {/* Select field for selecting a movie */}
                <select>
                  <option value="">Select Movie</option>
                  {movies.map((movie) => (
                    <option value={movie._id}>{movie.title}</option>
                  ))}{" "}
                  {/* Displaying all the movies */}
                </select>
              </Form.Item>
            </Col>

            <Col span={8}>
              {/* Input field for ticket price */}
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>

            <Col span={8}>
              {/* Input field for total seats */}
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please input total seats!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-1">
            {/* Cancel and Save buttons */}
            <Button
              variant="outlined"
              title="Cancel"
              onClick={() => {
                setView("table");
              }}
            />
            {/* Submit button */}
            <Button variant="contained" title="SAVE" type="submit" />
          </div>
        </Form>
      )}
    </Modal>
  );
}

// Exporting the Shows component as the default export.
export default Shows;