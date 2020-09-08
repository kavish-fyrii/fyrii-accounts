import React from "react";

import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontSize: '1.2rem',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))(TableRow);

const typeToName = {
  contributor: 'Bazaar Content Provider',
  'expert-agent': 'Marketplace Expert Agent',
  'expert-advisor': 'Expert Advisor',
}

function PreviousRequests(props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Role Requested</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
          <StyledTableCell>Date Requested</StyledTableCell>
          <StyledTableCell>Date Resolved</StyledTableCell>
          <StyledTableCell>Reason</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.userRequests.map((req) => (
          <StyledTableRow key={req.id}>
            <StyledTableCell>
              {typeToName[req.type]}
            </StyledTableCell>
            <StyledTableCell>
              {req.requestStatus.toUpperCase()}
            </StyledTableCell>
            <StyledTableCell>
              {(new Date(req.createdAt)).toLocaleDateString()}
            </StyledTableCell>
            <StyledTableCell>
              {req.reason ? (new Date(req.updatedAt)).toLocaleDateString() : ''}
            </StyledTableCell>
            <StyledTableCell>
              {req.reason}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PreviousRequests;
