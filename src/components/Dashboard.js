import React from "react";

import SonarItem from "./SonarItem";

function Dashboard(response) {
  const { issues } = response.location.state;
  console.log(issues);
  return <SonarItem items={issues.sonarIssues}></SonarItem>;
}
export default Dashboard;
