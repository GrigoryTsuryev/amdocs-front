import React from "react";

import SonarItem from "./SonarItem";

function Dashboard(response) {
  const { state } = response.location;
  return <SonarItem items={state.issues}></SonarItem>;
}
export default Dashboard;
