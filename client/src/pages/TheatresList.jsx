// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import Button from "../../components/Button"; // Custom Button component
import { useNavigate } from "react-router-dom"; // Navigation hook
import TheatreForm from "./TheatreForm"; // Component for theatre form
import { GetAllTheatresByOwner, DeleteTheatre } from "../../apicalls/theatres"; // API calls for theatres
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"; // Loading state actions
import { Table, message } from "antd"; // Ant Design components for table and messages
import Shows from "./Shows"; // Component for shows

// Define the main component
function TheatresList() {
  // Retrieve user from Redux store
  const { user } = useSelector((state) => state.users);

  // State variables and their updater functions
  const [showTheatreFormModal = false, setShowTheatreFormModal] =
    useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theatres = [], setTheatres] = useState([]);

  // State variables and their updater functions
  const [openShowsModal = false, setOpenShowsModal] = useState(false);

  // Redux dispatcher and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to fetch theatre data
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // Show loading indicator

      // API call to get theatres owned by the user
      const response = await GetAllTheatresByOwner({
        owner: user._id,
      });

      if (response.success) {
        setTheatres(response.data); // Update theatres state with fetched data
      } else {
        message.error(response.message); // Display error message
      }

      dispatch(HideLoading()); // Hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Hide loading indicator
      message.error(error.message); // Display error message
    }
  };

  // Function to handle theatre deletion
  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading()); // Show loading indicator

      // API call to delete a theatre
      const response = await DeleteTheatre({
        theatreId: id,
      });

      if (response.success) {
        message.success(response.message); // Display success message
        getData(); // Refresh theatre data
      } else {
        message.error(response.message); // Display error message
      }

      dispatch(HideLoading()); // Hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Hide loading indicator
      message.error(error.message); // Display error message
    }
  };

  // Configuration for table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 items-center">
            {/* Icon for deleting a theatre */}
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            {/* Icon for editing a theatre */}
            <i
              className="ri-pencil-line"
              onClick={() => {
                setFormType("edit");
                setSelectedTheatre(record);
                setShowTheatreFormModal(true);
              }}
            ></i>
            {/* Icon for viewing shows */}
            {record.isActive && (
              <span
                className="underline"
                onClick={() => {
                  setSelectedTheatre(record);
                  setOpenShowsModal(true);
                }}
              >
                Shows
              </span>
            )}
          </div>
        );
      },
    },
  ];

  // Fetch theatre data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Render the component's UI
  return (
    <div>
      {/* Button to add a new theatre */}
      <div className="flex justify-end mb-1">
        <Button
          variant="outlined"
          title="Add Theatre"
          onClick={() => {
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
        />
      </div>

      {/* Table to display theatre information */}
      <Table columns={columns} dataSource={theatres} />

      {/* Modal for theatre form */}
      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {/* Modal for shows */}
      {openShowsModal && (
        <Shows
          openShowsModal={openShowsModal}
          setOpenShowsModal={setOpenShowsModal}
          theatre={selectedTheatre}
        />
      )}
    </div>
  );
}

// Export TheatresList component
export default TheatresList;