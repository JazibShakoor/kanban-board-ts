import React, { Fragment } from "react";
import Navbar from "./Components/navbar";
import Container from './mainScreenData/homePage';

const App: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Container />
    </Fragment>)
};

export default App;