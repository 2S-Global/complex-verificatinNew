"use client";

import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
// ✅ Function to check if a value is an image URL
const isImageURL = (value) => {
  return (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  );
};

const DataTable = ({ fields, data,handleViewDetails  }) => {
  const [searchText, setSearchText] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // ✅ Generate columns dynamically with renderCell logic
  const columns = useMemo(() => {
    return fields.map((field) => ({
      field: field.name,
      headerName: field.label,
      minWidth: field.minWidth || 150, // ✅ Set minimum width (Default: 150)
      width: field.width || "auto", // ✅ Optional fixed width
      flex: field.flex !== undefined ? field.flex : 1, // ✅ Allow control over flex
      align: "center", // ✅ Center text horizontally
      headerAlign: "center", // ✅ Center header text
      renderCell: (params) => {
        if (field.name === "action" && field.icon) {
          return (
            <IconButton onClick={() => handleViewDetails(params.row.action)}>
            {field.icon}
          </IconButton>
          );
        }
        return (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {isImageURL(params.value) ? (
              <img
                src={params.value}
                alt="Image"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
            ) : (
              params.value || "-"
            )}
          </Box>
        );
      },
    }));

    
  }, [fields]);
  
  // ✅ Adjust row height dynamically for images
  const getRowHeight = (params) => {
    if (!params?.row) return 75; // Default row height
    return Object.values(params.row).some((value) => isImageURL(value)) ? 100 : 75;
  };

  // ✅ Filter rows based on search input
  const filteredRows = useMemo(
    () =>
      data.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
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

      {/* ✅ Paginated Table */}
      <Box sx={{ flexGrow: 1, height: "auto", width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[10]} // ✅ Limit Rows Per Page
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          disableSelectionOnClick
          getRowHeight={getRowHeight} // ✅ Dynamic row height for images
          rowHeight={75} // ✅ Ensure enough space between rows
          sx={{
            "& .MuiDataGrid-row": {
              maxHeight: "none !important", // Force override MUI row height limits
              minHeight: "auto !important",
            },
            "& .MuiDataGrid-cell": {
              padding: "12px", // ✅ Increase padding for better spacing
              display: "flex",
              justifyContent: "center", // ✅ Center horizontally
              alignItems: "center", // ✅ Center vertically
            },
            "& .MuiDataGrid-columnHeader": {
              display: "flex",
              justifyContent: "center", // ✅ Center column headers
              alignItems: "center",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
