
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomToolTip';

type GraphProps = {
  data: Array<{
    name: string | undefined;
    speed: number;
    acceleration: number;
    distance: number;
  }>;
};

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <div className="chart-container space-y-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center">Average Speed </h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line type="monotone" dataKey="speed" stroke="#FFA500" />
        </LineChart>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center">Average Acceleration </h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line type="monotone" dataKey="acceleration" stroke="#FFA500" />
        </LineChart>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center">Average Distance </h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line type="monotone" dataKey="distance" stroke="#FFA500" />
        </LineChart>
      </div>
    </div>
  );
};

export default Graph;
