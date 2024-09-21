import React, { useEffect, useState } from "react";
import { GetAllTheatres, updateTheatre } from "../../apicalls/theatres";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { Table, message } from "antd";

// Define the TheatresList component
function TheatresList() {
  // Initialize state for storing theatre data
  const [theatres = [], setTheatres] = useState([]);
  const dispatch = useDispatch(); // Access the dispatch function for Redux actions

  // Function to fetch theatre data from the API
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // Show loading indicator
      const response = await GetAllTheatres(); // Fetch theatre data
      if (response.success) {
        setTheatres(response.data); // Update state with fetched data
      } else {
        message.error(response.message); // Display error message
      }
      dispatch(HideLoading()); // Hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Hide loading indicator in case of an error
      message.error(error.message); // Display error message
    }
  };

  // Function to handle changing the status of a theatre
  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading()); // Show loading indicator
      const response = await updateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      }); // Update theatre status via API call
      if (response.success) {
        message.success(response.message); // Display success message
        getData(); // Refresh theatre data
      } else {
        message.error(response.message); // Display error message
      }
      dispatch(HideLoading()); // Hide loading indicator
    } catch (error) {
      dispatch(HideLoading()); // Hide loading indicator in case of an error
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
      // Render the status text based on isActive value
      render: (text, record) => {
        if (record.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      // Render action links for approving or blocking
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Block
              </span>
            )}
            {!record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData(); // Fetch theatre data when the component mounts
  }, []);

  // Render the component's UI
  return (
    <div>
      {/* Render the Ant Design Table component with columns and data */}
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}

// Export the TheatresList component
export default TheatresList;