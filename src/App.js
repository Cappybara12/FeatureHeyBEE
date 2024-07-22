import './App.css';
import ChatbotUI from './components/ChatbotUi';
import About from './components/about';
import Authentication from './routes/Auth/authentication.component';
import Navbar from './components/navbar';
import { useUserContext } from './contexts/user.context';
import { Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <AppContent />
  );
};

const AppContent = () => {
  const { currentUser } = useUserContext();

  return (
    <>
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/" element={currentUser ? <ChatbotUI /> : <Navigate to="/auth" />} />
        <Route path="/about" element={currentUser ? <About /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={currentUser ? <Navigate to="/" /> : <Authentication />} />
      </Routes>
    </>
  );
};

export default App;
