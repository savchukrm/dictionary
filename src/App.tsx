import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';

import Main from './pages/Main/Main';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index={true} element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
