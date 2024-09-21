// Import necessary components from the 'react-router-dom' library for routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import individual page components from their respective files
import Home from './pages/Home'; // Import the Home page component
import Login from './pages/Login'; // Import the Login page component
import Register from './pages/Register'; // Import the Register page component
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import { useSelector } from 'react-redux'; // Import the useSelector hook from Redux
import Profile from './pages/Profile'; // Import the Profile page component
import Admin from './pages/Admin'; // Import the Admin page component

// Import CSS stylesheets to apply styles to the application
import "./stylesheets/alignments.css"; // Import alignment styles
import "./stylesheets/sizes.css"; // Import size-related styles
import "./stylesheets/form-elements.css"; // Import styles for form elements
import "./stylesheets/custom.css"; // Import custom styles
import "./stylesheets/theme.css"; // Import theme-related styles
import TheatresForMovie from './pages/TheatresForMovie'; // Import the TheatresForMovie page component
import BookShow from './pages/BookShow'; // Import the BookShow page component

// Define the main functional component 'App' that represents the application
function App() {
  const { loading } = useSelector(state => state.loaders); // Get the 'loading' state from the redux store

  // Return the JSX code for the component
  return (
    <div>
      {/* If the 'loading' state is true, display the loader */}
      {loading && (
        <div className='loader-parent'>
          <div className="loader"></div>
        </div>
      )}

      {/* Wrap the entire application with 'BrowserRouter' to enable routing */}
      <BrowserRouter>
        {/* Define the routes for the application using 'Routes' component */}
        <Routes>
          {/* Define the route for the home page. When the path is '/', render the 'Home' component */}
          {/* ProtectedRoute is a custom component that checks if the user is logged in and redirects to the login page if not */}
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/movie/:id' element={<ProtectedRoute><TheatresForMovie /></ProtectedRoute>} />
          <Route path='/book-show/:id' element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />

          {/* Define the route for the login page */}
          {/* When the path is '/login', render the 'Login' component */}
          <Route path='/login' element={<Login />} />

          {/* Define the route for the registration page */}
          {/* When the path is '/register', render the 'Register' component */}
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the 'App' component as the default export of this file
export default App;