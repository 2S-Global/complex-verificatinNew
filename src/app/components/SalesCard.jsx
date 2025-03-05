"use client";

import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";

const SalesCard = ({ title, value, IconComponent, onViewClick }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      {/* Card Header */}
      <CardHeader title={<Typography variant="h6" sx={{ fontSize: "19px" }}>{title}</Typography>}
/>


      {/* Card Content */}
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Dynamic Icon Avatar */}
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              {IconComponent && <IconComponent />} {/* Render passed icon */}
            </Avatar>

            <Box ml={2}>
              <Typography variant="h6">{value}</Typography>
            </Box>
          </Box>

  <VisibilityOutlinedIcon sx={{ color: "#4154f1",cursor:"pointer" }}/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesCard;
