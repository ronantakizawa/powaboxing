import FileUpload from './FileUpload';
import viteLogo from './assets/vite.svg'; // Make sure the path to vite.svg is correct

function App() {
  return (
    <div className="App bg-black min-h-screen flex flex-col items-center pt-8 text-white">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">POWA Boxing Data Analysis</h1>
        <img src={viteLogo} alt="Vite logo" className="mr-2 w-16 mb-5" /> 
      </div>
      <FileUpload/>
    </div>
  );
}

export default App;
