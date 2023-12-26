import React from 'react';
import { TooltipProps } from 'recharts';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-gray-700 p-2 rounded text-white">
          <p className="intro">{`Speed: ${payload[0].payload.speed}`}</p>
          <p className="intro">{`Acceleration: ${payload[0].payload.acceleration}`}</p>
          <p className="intro">{`Distance: ${payload[0].payload.distance}`}</p>
          <p className="intro">{`Fist Type: ${payload[0].payload.fistType}`}</p>
        </div>
      );
    }
    return null;
  };

export default CustomTooltip;