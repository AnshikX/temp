import { useState } from "react";
import PropTypes from "prop-types";

export const LineChart = ({
  data = [
    { label: "Mon", y: 10 },
    { label: "Tue", y: 25 },
    { label: "Wed", y: 18 },
    { label: "Thu", y: 35 },
    { label: "Fri", y: 20 },
    { label: "Sat", y: 40 },
    { label: "Sun", y: 30 },
  ],
  width = 400,
  height = 400,
  strokeColor = "#007bff",
  strokeWidth = 2,
  pointRadius = 4,
  showPoints = true,
  showGrid = true,
  gridColor = "#ddd",
  axisColor = "#333",
  padding = 50,
  xLabels = [],
  yTicks = 5,
  chartTitle = "Line Chart",
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (data.length === 0) return <p>No data</p>;

  const maxX = data.length - 1;
  const maxY = Math.max(...data.map((d) => d.y));

  const scaleX = (width - 2 * padding) / maxX;
  const scaleY = (height - 2 * padding) / maxY;

  const points = data.map((d, i) => ({
    x: padding + i * scaleX,
    y: height - padding - d.y * scaleY,
    label: d.label || xLabels[i] || `Point ${i + 1}`,
    value: d.y,
  }));

  const pathData = points.reduce(
    (acc, point, i) => acc + `${i === 0 ? "M" : "L"}${point.x},${point.y} `,
    ""
  );

  const yStep = maxY / yTicks;

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        {/* Chart Title */}
        <text
          x={width / 2}
          y={padding / 2}
          textAnchor="middle"
          fontSize="18"
          fill={axisColor}
        >
          {chartTitle}
        </text>

        {/* X and Y Axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisColor}
        />
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisColor}
        />

        {/* Y Axis Ticks and Grid */}
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const yVal = i * yStep;
          const y = height - padding - yVal * scaleY;

          return (
            <g key={i}>
              {showGrid && (
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke={gridColor}
                  strokeDasharray="2,2"
                />
              )}
              <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="10">
                {yVal.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {points.map((pt, i) => (
          <text
            key={i}
            x={pt.x}
            y={height - padding + 15}
            textAnchor="middle"
            fontSize="10"
          >
            {pt.label}
          </text>
        ))}

        {/* Line Path */}
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Points */}
        {showPoints &&
          points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={pointRadius}
              fill={strokeColor}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          style={{
            position: "absolute",
            top: hoveredPoint.y - 40,
            left: hoveredPoint.x + 10,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "5px 10px",
            fontSize: "12px",
            pointerEvents: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <strong>{hoveredPoint.label}</strong>
          <br />
          Value: {hoveredPoint.value}
        </div>
      )}
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      y: PropTypes.number,
    })
  ),
  width: PropTypes.number,
  height: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  pointRadius: PropTypes.number,
  showPoints: PropTypes.bool,
  showGrid: PropTypes.bool,
  gridColor: PropTypes.string,
  axisColor: PropTypes.string,
  padding: PropTypes.number,
  xLabels: PropTypes.arrayOf(PropTypes.string),
  yTicks: PropTypes.number,
  chartTitle: PropTypes.string,
};
