import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import CustomTooltip from './CustomToolTip';
import {GraphProps, ComboItem} from "../types"


const Graph: React.FC<GraphProps> = ({ data, combos }) => {

  const renderComboLines = (comboArray: ComboItem[][] | null) => {
    if (!comboArray) {
      return <></>;
    }
  
    let currentIndex = 0; // Initialize a counter for the index
  
    return comboArray.map(combo => {
      // Extract the indices for the first and last elements in the current combo
      const index = currentIndex + combo.length;

  
      // Update currentIndex for the next iteration
      currentIndex += combo.length;
  
      return (
        <>
          {combo[combo.length - 1] && <ReferenceLine x={index} stroke="white" key={index} strokeDasharray="3 3"/>}
        </>
      );
    });
  };
  
  return (
    <div className="chart-container space-y-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center">{data[0].isMultipleFiles ?  "Average Speed" : "Speed Performance"} </h2>
        <LineChart width={600} height={300} data={data}>
          {renderComboLines(combos)}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timestamp" />
          <YAxis label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }} dataKey="speed" />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line type="monotone" dataKey="speed" stroke="#FFA500" />
        </LineChart>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center"> {data[0].isMultipleFiles ?  "Average Acceleration" : "Acceleration Performance"} </h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timestamp"/>
          <YAxis label={{ value: 'Acceleration (Gs)', angle: -90, position: 'insideLeft' }} dataKey="acceleration"/>
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line type="monotone" dataKey="acceleration" stroke="#FFA500" />
          {renderComboLines(combos)}
        </LineChart>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center">{data[0].isMultipleFiles ?  "Average Force" : "Force Performance"} </h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timestamp" />
          <YAxis label={{ value: 'Force (Newtons)', angle: -90, position: 'insideLeft' }} dataKey="force"/>
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend />
          <Line type="monotone" dataKey="force" stroke="#FFA500" />
          {renderComboLines(combos)}
        </LineChart>
      </div>
    </div>
  );
};

export default Graph;
