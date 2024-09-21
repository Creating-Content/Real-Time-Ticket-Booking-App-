import React, { useEffect } from "react"; // Importing React and useEffect hook from React
import { Col, Row, Table, message } from "antd"; // Importing UI components from Ant Design
import { useDispatch } from "react-redux"; // Importing useDispatch hook from Redux
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Importing Redux actions related to loading indicators
import { GetMovieById } from "../../apicalls/movies"; // Importing API call functions for movies
import { useNavigate, useParams } from "react-router-dom"; // Importing useNavigate hook from React Router DOM
import moment from "moment"; // Importing moment library for date and time manipulation
import { GetAllTheatresByMovie } from "../../apicalls/theatres"; // Importing API call functions for theatres

function TheatresForMovie() {
  // get all theatres for a movie
  const tempDate = new URLSearchParams(window.location.search).get("date"); // Getting the date from the URL query parameters
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  ); // Defining a state variable to store the date

  const [movie, setMovie] = React.useState([]); // Defining a state variable to store all movies
  const [theatres, setTheatres] = React.useState([]); // Defining a state variable to store all movies
  const navigate = useNavigate(); // Creating a navigate function using the useNavigate hook
  const dispatch = useDispatch(); // Creating a dispatch function using the useDispatch hook
  const params = useParams(); // Creating a params variable using the useParams hook

  // Define a function called 'getData' to fetch all movies from the API.
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // `dispatch` is a function provided to every Redux component by the `react-redux` package.
      const response = await GetMovieById(params.id); // Calling the API function to fetch all movies
      if (response.success) {
        setMovie(response.data); // Setting the state variable to store the movies
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading()); // `dispatch` is a function provided to every Redux component by the `react-redux` package.
      const response = await GetAllTheatresByMovie({
        date,
        movie: params.id,
      }); // Calling the API function to fetch all movies
      if (response.success) {
        setTheatres(response.data); // Setting the state variable to store the movies
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  // The useEffect hook is used to run the 'getData' function when the component is mounted.
  useEffect(() => {
    getData();
  }, []); // Passing an empty array as the second argument ensures that the 'getData' function is called only once.

  // Use the useEffect hook to run the 'getTheatres' function when the 'date' state variable changes.
  useEffect(() => {
    getTheatres();
  }, [date]); // Passing the 'date' state variable as the second argument ensures that the 'getTheatres' function is called whenever the 'date' state variable changes.

  // Render the component content
  return (
    movie && (
      <div>
        {/* Display movie information */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl uppercase">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration: {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date: {moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="text-md">Genre: {movie.genre}</h1>
          </div>
          <div>
            <h1 className="text-md">Select Date</h1>
            {/* Input field to select date */}
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>
        <hr />
        {/* Display theatre information */}
        <div className="mt-1">
          <h1 className="text-xl uppercase">Theatres</h1>
        </div>
        <div className="mt-1 flex flex-col gap-1">
          {/* Map through each theatre */}
          {theatres.map((theatre) => (
            <div className="card p-2">
              <h1 className="text-md uppercase">{theatre.name}</h1>
              <h4 className="text-md">Address : {theatre.address}</h4>
              <div className="divider"></div>
              <div className="flex gap-2">
                {/* Map through each show in the theatre */}
                {theatre.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div
                      className="card p-1 cursor-pointer"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      {/* Display show time */}
                      <h4>{moment(show.time, "HH:mm").format("hh:mm A")}</h4>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

// Export the component as the default object
export default TheatresForMovie;