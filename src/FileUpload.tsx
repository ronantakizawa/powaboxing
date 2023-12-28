import React, { useState,useCallback } from 'react';
import { calculateStatistics, calculateAggregateStatistics,formatTime } from './datahandler';
import { Statistics, JsonData, Punch } from './types';
import StatisticBox from './components/StatisticBox';
import Graph from './components/Graph';

const FileUpload: React.FC = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [graph, setGraph] = useState<Array<{ speed: number, distance: number, acceleration: number, timestamp: string | undefined, fistType:string }>>([]);

  const processJsonData = (json: JsonData) => {
    const firstTimestamp = json.punches[0]?.timestamp || 0;
      const statistics = calculateStatistics(json);
      if (statistics){
        setStats(statistics);
      setIsValidJson(true);
      const graphData = json.punches.map((punch: Punch) => ({
        speed: punch.speed,
        distance:punch.distance,
        acceleration:punch.acceleration,
        timestamp: formatTime(punch.timestamp - firstTimestamp),
        fistType: punch.fistType.toString()
    }));
    setGraph(graphData)

      }
      else {
        setIsValidJson(false);
      }
  };
  
  const processJsonDataMultiple = (jsonDataArray: JsonData[]) => {
    const statistics = calculateAggregateStatistics(jsonDataArray);
    if (statistics) {
      setIsValidJson(true);
      setStats(statistics.aggregatedStats);
      const transformedData = statistics.speedArray.map((speed, index) => ({
        speed: speed,
        distance: statistics.distanceArray[index],
        acceleration: statistics.accelerationArray[index],
        timestamp: undefined,
        fistType: statistics.fistTypeArray[index]
      }));
      
      setGraph(transformedData);
    } else {
      setIsValidJson(false);
    }
  };

  const handleExampleClick = useCallback(async () => {
    try {
      const response = await fetch('/example.json');
      const json = await response.json();
      processJsonData(json);
    } catch (error) {
      console.error('Error fetching example:', error);
      setIsValidJson(false);
    }
  }, []);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (files.length === 1) {
        try {
          const text = await files[0].text();
          const jsonData = JSON.parse(text) as JsonData; // Parse the text as JsonData
          processJsonData(jsonData); // Process the single JSON file
        } catch (error) {
          console.error('Error processing file:', error);
          setIsValidJson(false);
        }
      } else {
        const jsonDataArray = [];
        for (const file of files) {
          try {
            const text = await file.text();
            const jsonData = JSON.parse(text) as JsonData;
            jsonDataArray.push(jsonData); // Add the parsed JSON to the array
          } catch (error) {
            console.error('Error processing file:', error);
            setIsValidJson(false);
            return; // Exit the loop on error
          }
        }
        processJsonDataMultiple(jsonDataArray); // Process multiple JSON files
      }
    }
  }, []);
  
  const data = graph.map(item => ({
    timestamp: item.timestamp,
    speed: item.speed,
    acceleration: item.acceleration,
    distance:item.distance,
    fistType:item.fistType

  }));

  return (
    <div className="p-4 max-w-lg mx-auto bg-black text-white">
      <div className="flex items-center mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-700 file:text-white file:bg-gray-800 hover:file:bg-gray-700"
        />
        <button
          onClick={handleExampleClick}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
          See Example
        </button>
      </div>
      {isValidJson ? (
  <div>
    {stats && (
          <>
          <StatisticBox stats={{
              avgStarRating: stats.avgStarRating,
              avgAcceleration: stats.avgAcceleration,
              avgSpeed: stats.avgSpeed,
              avgDistance: stats.avgDistance,
              modeHand: stats.modeHand,
              modePunchType: stats.modePunchType
            }} />
            <Graph data={data} />
            
            </>
        )}
  </div>
) : (
  <div className="text-red-500 mt-2">Invalid POWA Boxing Data</div>
)}
  </div>
  );
  
};

export default FileUpload;
