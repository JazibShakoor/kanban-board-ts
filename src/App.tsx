import React, { Fragment } from "react";
import Navbar from "./Components/navbar";
import HomePage from './mainScreenData/homePage';

const App: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <HomePage />
    </Fragment>)
};

export default App;
