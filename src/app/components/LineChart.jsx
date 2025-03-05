import React, { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart() {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(500); // Default width

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth); // Get parent div width
      }
    };
    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);
    
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", minWidth: 300 }}> {/* Responsive wrapper */}
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
        width={chartWidth} 
        height={300}
      />
    </div>
  );
}
