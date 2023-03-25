import { useState } from 'react';

import TodayAttendance from "./TodayView";
import Weather from "./Weather";


const MainComponent = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleBackButtonClick = () => {
    setCurrentComponent(null);
  };

  const renderCurrentComponent = () => {
    switch (currentComponent) {
      case 'today':
        return <TodayAttendance onBackButtonClick={handleBackButtonClick} />;
      // render other components as needed
      default:
        return (
          <div>
            <Weather/>
            <h1>Welcome to My Attendance App</h1>
            <p>Please select an option below to get started:</p>
            <button onClick={() => handleButtonClick('today')}>Attendance Today</button>
          </div>
        );
    }
  };

  return <div>{renderCurrentComponent()}</div>;
};

export default MainComponent;
