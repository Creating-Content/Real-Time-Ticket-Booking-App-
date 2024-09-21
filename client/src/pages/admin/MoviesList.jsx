// Import necessary modules and components
import React from "react";
import Button from "../../components/Button"; // Importing a custom Button component
import MovieForm from "./MovieForm"; // Importing a component to manage movie forms
import moment from "moment"; // Importing a library for working with dates
import { Table, message } from "antd"; // Importing UI components from Ant Design
import { useDispatch } from "react-redux"; // Importing useDispatch hook from Redux
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Importing Redux actions related to loading indicators
import { DeleteMovie, GetAllMovies } from "../../apicalls/movies"; // Importing API call functions for movies
import { useEffect } from "react"; // Importing useEffect hook for side effects

function MoviesList() {
  // State management using React hooks
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");

  const dispatch = useDispatch(); // Accessing the dispatch function from Redux

  // Function to fetch movie data from API
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // Dispatching a Redux action to show loading indicator
      const response = await GetAllMovies(); // Calling the API function to get all movies
      if (response.success) {
        setMovies(response.data); // Updating state with fetched movie data
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  // Function to handle movie deletion
  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading()); // Dispatching a Redux action to show loading indicator
      const response = await DeleteMovie({
        movieId,
      });
      if (response.success) {
        getData(); // Fetching updated data after successful deletion
        message.success(response.message); // Displaying a success message using Ant Design's message component
      } else {
        message.error(response.message); // Displaying an error message using Ant Design's message component
      }
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Dispatching a Redux action to hide loading indicator
      message.error(error.message); // Displaying an error message using Ant Design's message component
    }
  };

  // Configuration for the columns in the table
  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return (
          <img
            src={record.poster}
            alt="poster"
            height="60"
            width="80"
            className="br-1"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY"); // Formatting the release date using the moment library
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {/* Icon for deleting a movie */}
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            {/* Icon for editing a movie */}
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModal(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  // Fetch movie data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // JSX rendering of the component
  return (
    <div>
      <div className="flex justify-end mb-1">
        {/* Button to open the movie form modal for adding a movie */}
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        />
      </div>

      {/* Table to display movie data */}
      <Table columns={columns} dataSource={movies} />

      {/* Conditionally rendering the MovieForm component */}
      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

// Exporting the component
export default MoviesList;