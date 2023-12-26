import React from 'react';
import { StatisticProps } from '../types';

const Statistic: React.FC<StatisticProps> = ({ title, value }) => {
    // Function to render the value
    const renderValue = () => {
      if (typeof value === 'number') {
        return value.toFixed(2);
      }
      return value;
    };
  
    return (
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="text-gray-400 text-sm font-medium">{title}</div>
          <div className="text-lg font-bold text-white">{renderValue()}</div>
        </div>
      );
    };

export default Statistic;
