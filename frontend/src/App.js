import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Navbar/>
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
        <p className="text-gray-600">Welcome to my React app using Tailwind CSS!</p>
      </div>
    </div>
  );
}

export default App;
