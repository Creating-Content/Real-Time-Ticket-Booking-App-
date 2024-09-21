// Import necessary modules and components
import React, { useEffect, useState } from "react"; // Import React dependencies
import { useParams } from "react-router-dom"; // Import useParams hook to get route parameters
import { useDispatch } from "react-redux"; // Import useDispatch hook to get access to the Redux dispatch function
import { message } from "antd"; // Import Ant Design's message component
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Import loading state actions
import { GetShowById } from "../../apicalls/theatres"; // Import API call to get show data by its ID
import moment from "moment"; // Import moment.js to format date and time

function BookShow() {
  // Define a state variable to store the show information.
  const [show, setShow] = React.useState(null); // Store show data from the server
  const [selectedSeats, setSelectedSeats] = React.useState([]); // Store selected seats

  // Get route parameters using useParams
  const params = useParams();
  // Get access to the Redux dispatch function
  const dispatch = useDispatch();

  // Function to fetch show data by its ID
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // Dispatch a loading action
      // Make an API call to get show data by its ID
      const response = await GetShowById({
        showId: params.id, // Pass the show ID as a payload
      });
      // Check if the response is successful
      if (response.success) {
        setShow(response.data); // Set the show data in the state if successful
      } else {
        message.error(response.message); // Display an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatch an action to hide loading state
    } catch (error) {
      dispatch(HideLoading()); // Hide loading state in case of an error
      message.error(error.message); // Display an error message using Ant Design's message component
    }
  };

  // Function to generate seat layout
  const getSeats = () => {
    const columns = 12; // Define the number of columns in the seat layout
    const totalSeats = show.totalSeats; // Get the total number of seats from the show data
    const rows = Math.ceil(totalSeats / columns); // Calculate the number of rows based on total seats and columns

    return (
      <div className="flex gap-1 flex-col p-2 card">
        {/* Generate seat numbers */}
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            // Render seats within the total seat limit
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1; // Calculate seat number
                let seatClass = "seat"; // Default seat class

                // Add 'selected-seat' class if the seat is selected
                if (selectedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " selected-seat"; // Add 'selected-seat' class
                }

                // Add 'booked-seat' class if the seat is already booked
                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " booked-seat"; // Add 'booked-seat' class
                }

                return (
                  seat * columns + column + 1 <= totalSeats && ( // Render seats within the total seat limit
                    <div
                      className={seatClass}
                      onClick={() => {
                        // Check if the seat is already selected
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((item) => item !== seatNumber)
                          ); // Deselect the seat if it's already selected
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]); // Select the seat if it's not already selected
                        }
                      }}
                    >
                      {/* Display seat number */}
                      <h4>{seat * columns + column + 1}</h4>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Fetch show data when the component mounts
  useEffect(() => {
    getData(); // Call the getData function
  }, []); // Pass an empty array as the second argument to avoid infinite loop

  return (
    show && ( // Render the component only if show data is available
      <div>
        {/* shows information */}
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-xl">{show.theatre.name}</h1>
            <h4>{show.theatre.address}</h4>
          </div>

          {/* movie information */}
          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>

          {/* show date and time */}
          <div>
            <h1 className="text-xl">
              {moment(show.date).format("MMMM Do YYYY")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

        {/* seats */}
        <div className="flex justify-center mt-2">{getSeats()}</div>
      </div>
    )
  );
}

// Export the component as the default object
export default BookShow;