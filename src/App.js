import './App.css';
import ChatbotUI from './components/ChatbotUi';
import { Route, Routes } from 'react-router-dom';  // Remove BrowserRouter as Router
import About from './components/about';
import Authentication from './routes/Auth/authentication.component';
import Navbar from './components/navbar';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatbotUI />} />
        <Route path="/about" element={<About />} />
        <Route path='auth' element={<Authentication></Authentication>}></Route>
      </Routes>
    </>
  );
}

export default App;