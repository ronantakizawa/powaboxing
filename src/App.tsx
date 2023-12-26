import FileUpload from './FileUpload';
import viteLogo from './assets/powaboxing.svg'; // Make sure the path to vite.svg is correct

function App() {
  return (
    <div className="App bg-black min-h-screen flex flex-col items-center pt-8 text-white">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">POWA Boxing Data Analysis</h1>
        <img src={viteLogo} alt="Vite logo" className="mr-2 w-16 mb-5" /> 
      </div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload your POWA Boxing JSON files and get in-depth data analysis.</h2>
        <p>
         Upload 1 file: Analysis on speed, acceleration, and distance from one workout.
        </p>
        <p className="mt-4">
          Upload 2+ files: Analysis in average speed, average acceleration, and average distance over time.
        </p>
      </div>
      <FileUpload />
      <div className="text-center mt-6">
      </div>
    </div>
  );
}

export default App;
