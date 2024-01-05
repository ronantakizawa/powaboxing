import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import CustomTooltip from './CustomToolTip';
import {GraphProps, ComboItem} from "../types"


const Graph: React.FC<GraphProps> = ({ data, combos }) => {

  const  calculateSize = (comboArray: ComboItem[][] | null) => {
    if (!Array.isArray(comboArray)) {
        throw new Error('Input must be an array');
    }

    return Math.ceil(comboArray.length / 2) + 1;
}

const [graphResizeIndex, setGraphResizeIndex] = useState(calculateSize(combos));

const handleSliderChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  setGraphResizeIndex(Number(event.target.value));
};
  
  return (
    <div className="chart-container space-y-4 mb-5">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4 mb-5">
          <h3 className="text-lg font-bold text-white mb">Zoom</h3>
          <input 
            type="range" 
            min="2" 
            max={calculateSize(combos)*2}  
            value={graphResizeIndex}
            onChange={handleSliderChange}
            className="slider" 
          />
        </div>
        <h2 className="text-lg font-bold text-white mb-2 text-center">{data[0].isMultipleFiles ?  "Average Speed" : "Speed Performance"} </h2>
        <div style={{ width: '150%', overflowX: 'auto' }}>
        <LineChart width={300*graphResizeIndex} height={300} data={data}>
          <XAxis dataKey="timestamp" interval="preserveStartEnd" />
          <YAxis label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }} dataKey="speed" />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Line type="monotone" dataKey="speed" stroke="#FFA500" />
        </LineChart>
        </div>
        <div className="text-center mt-2">
            <span className="text-orange-400">Scroll to see data →</span>
          </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center"> {data[0].isMultipleFiles ?  "Average Acceleration" : "Acceleration Performance"} </h2>
        <div style={{ width: '150%', overflowX: 'auto' }}>
        <LineChart width={300*graphResizeIndex} height={300} data={data}>
          <XAxis dataKey="timestamp"/>
          <YAxis label={{ value: 'Acceleration (Gs)', angle: -90, position: 'insideLeft' }} dataKey="acceleration"/>
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Line type="monotone" dataKey="acceleration" stroke="#FFA500" />
        </LineChart>
        </div>
        <div className="text-center mt-2">
            <span className="text-orange-400">Scroll to see data →</span>
          </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white mb-2 text-center">{data[0].isMultipleFiles ?  "Average Force" : "Force Performance"} </h2>
        <div style={{ width: '150%', overflowX: 'scroll' }}>
        <LineChart width={300*graphResizeIndex} height={300} data={data}>
          <XAxis dataKey="timestamp" />
          <YAxis label={{ value: 'Force (Newtons)', angle: -90, position: 'insideLeft' }} dataKey="force"/>
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Line type="monotone" dataKey="force" stroke="#FFA500" />
        </LineChart>
        </div>
      </div>
      <div className="text-center mt-2">
            <span className="text-orange-400">Scroll to see data →</span>
          </div>
    </div>
  );
};

export default Graph;
