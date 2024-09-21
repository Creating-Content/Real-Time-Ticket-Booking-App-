import React, { useEffect } from "react"; // Importing React and useEffect hook from React
import { Col, Row, Table, message } from "antd"; // Importing UI components from Ant Design
import { useDispatch } from "react-redux"; // Importing useDispatch hook from Redux
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Importing Redux actions related to loading indicators
import { GetAllMovies } from "../../apicalls/movies"; // Importing API call functions for movies
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router DOM
import moment from "moment";

// Define a function component called 'Home'.
function Home() {
  const [movies, setMovies] = React.useState([]); // Defining a state variable to store all movies
  const navigate = useNavigate(); // Creating a navigate function using the useNavigate hook
  const dispatch = useDispatch(); // Creating a dispatch function using the useDispatch hook

  // Define a function called 'getData' to fetch all movies from the API.
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // `dispatch` is a function provided to every Redux component by the `react-redux` package.
      const response = await GetAllMovies(); // Calling the API function to fetch all movies
      if (response.success) {
        setMovies(response.data); // Setting the state variable to store the movies
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

  return (
    <div>
      {/* Input field for searching movies */}
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies"
      />
      {/* Displaying a row of movie cards */}
      <Row gutter={[20]} className="mt-2">
        {movies.map((movie) => (
          <Col span={6}>
            <div
              className="card flex flex-col gap-1 cursor-pointer"
              onClick={() =>
                navigate(
                  `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
            >
              <img src={movie.poster} alt="" height={200} />
              <div className="flex justify-center p-1">
                <h1 className="text-md uppercase">{movie.title}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// Exporting the Home component so that it can be imported in other files.
export default Home;