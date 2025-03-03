"use client";
import React from "react";
import Typography from "@mui/material/Typography";

const Caption = ({ children, color = "text.secondary", align = "center", variant = "caption", sx = {} }) => {
  return (
    <Typography variant={variant} color={color} align={align} sx={{ fontSize: "0.875rem", ...sx }}>
      {children}
    </Typography>
  );
};

export default Caption;
