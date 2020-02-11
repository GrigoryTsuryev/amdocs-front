import React from "react";
import Wellcome from "./components/wellcome/Wellcome";
import { withRouter } from 'react-router-dom';


function App() {
  return (
       <Wellcome></Wellcome>
  )
}

export default withRouter(App);