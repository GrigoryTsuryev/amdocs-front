import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

export default function SonarItem(response) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project</StyledTableCell>
            <StyledTableCell>Message</StyledTableCell>
            <StyledTableCell>Link</StyledTableCell>
            <StyledTableCell>Severity</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response.items.map(item => (
            <StyledTableRow key={item.key}>
              <StyledTableCell component="th" scope="row">
                {item.project.split(":")[2]}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.message}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <a
                  href={`http://illin018:9000/dashboard/index?id=${item.component}`}
                >
                  Link
                </a>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.severity}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.status}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
