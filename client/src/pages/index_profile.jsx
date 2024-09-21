// Importing the 'React' object from the 'react' module.
import React from "react";
// Importing the 'Tabs' component from the 'antd' module.
import { Tabs } from "antd";
// Importing the 'useSelector' and 'useDispatch' hooks from the 'react-redux' module.
import { useSelector, useDispatch } from "react-redux";
// Importing the 'PageTitle' component from the 'components' module.
import PageTitle from "../../components/PageTitle";
// Importing the 'TheatresList' component from the 'components' module.
import TheatresList from "./TheatresList";

// Defining the 'Profile' component.
function Profile() {
  // Component's JSX structure starts here.
  return (
    <div>
      {/* Rendering the 'PageTitle' component with the title "Profile". */}
      <PageTitle title="Profile" />

      {/* Rendering the 'Tabs' component for tabbed interface. */}
      <Tabs defaultActiveKey="1">
        {/* First tab pane: 'Booking' */}
        <Tabs.TabPane tab="Booking" key="1">
          Booking
        </Tabs.TabPane>

        {/* Second tab pane: 'Theatres' */}
        <Tabs.TabPane tab="Theatres" key="2">
          {/* Rendering the 'TheatresList' component within the 'Theatres' tab. */}
          <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
  // Component's JSX structure ends here.
}

// Exporting the 'Profile' component as the default export of this module.
export default Profile;