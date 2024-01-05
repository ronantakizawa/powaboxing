import React, { useState,useCallback } from 'react';
import { calculateStatistics, calculateAggregateStatistics, getPunchData, getCombos } from './datahandler';
import { Statistics, JsonData, ComboItem } from './types';
import StatisticBox from './components/StatisticBox';
import Graph from './components/Graph';
import Combos from './components/Combos';

const FileUpload: React.FC = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [graph, setGraph] = useState<Array<{ speed: number, force: number, acceleration: number, timestamp: string, hand:number | undefined, fistType:string }>>([]);
  const [combos,setCombos] = useState<ComboItem[][] | null>(null);
  const [isMultipleFiles,setIsMultipleFiles] = useState<boolean>(false);

  const processJsonData = (json: JsonData) => {
      const statistics = calculateStatistics(json);
      if (statistics){
        setStats(statistics);
        setIsValidJson(true);
        setGraph(getPunchData(json))
        const combos = getCombos(json);
        setCombos(combos);

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
        force: statistics.forceArray[index],
        acceleration: statistics.accelerationArray[index],
        timestamp: `File# ${index+1}`,
        hand:undefined,
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
        setIsMultipleFiles(false)
        try {
          const text = await files[0].text();
          const jsonData = JSON.parse(text) as JsonData; // Parse the text as JsonData
          processJsonData(jsonData); // Process the single JSON file
        } catch (error) {
          console.error('Error processing file:', error);
          setIsValidJson(false);
        }
      } else {
        setIsMultipleFiles(true)
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
    isMultipleFiles:isMultipleFiles,
    timestamp: item.timestamp,
    hand:item.hand,
    speed: item.speed,
    acceleration: item.acceleration,
    force:item.force,
    fistType:item.fistType

  }));


  return (
    <div className="p-4 max-w-lg mx-auto bg-black text-white">
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file:mb-2 sm:mb-0 sm:file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-700 file:text-white file:bg-gray-800 hover:file:bg-gray-700"
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
                avgForce: stats.avgForce,
                modeHand: stats.modeHand,
                modePunchType: stats.modePunchType
              }} />
              <Graph data={data} />
              {!isMultipleFiles ? <Combos combos={combos} /> : null}
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
