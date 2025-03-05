"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BasicTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Occupation</TableCell>
            <TableCell align="center">Approve By</TableCell>
            <TableCell align="center">Date</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
  {rows.map((row, index) => (
    <TableRow key={index}>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.occupation}</TableCell>
      <TableCell align="center">{row.approvedBy}</TableCell>
      <TableCell align="center">{row.date}</TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
