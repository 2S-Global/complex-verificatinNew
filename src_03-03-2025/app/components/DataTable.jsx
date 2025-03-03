"use client";

import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

const DataTable = ({ fields, data }) => {
  const [searchText, setSearchText] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // ✅ Generate columns dynamically
  const columns = useMemo(() => {
    return fields.map((field) => ({
      field: field.name,
      headerName: field.label,
      flex: 1,
      minWidth: 150,
    }));
  }, [fields]);

  // ✅ Filter rows based on search input
  const filteredRows = useMemo(
    () =>
      data.filter((row) =>
        Object.values(row).join(" ").toLowerCase().includes(searchText.toLowerCase())
      ),
    [data, searchText]
  );

  return (
    <Box sx={{ width: "100%", p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ✅ Right-aligned Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ width: "200px" }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {/* ✅ Ensure pagination works properly */}
      <Box sx={{ flexGrow: 1, height: 'auto', width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[10]} // ✅ Only allow 20 rows per page
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default DataTable;
