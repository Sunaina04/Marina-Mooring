import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/LoginForm';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
    </Routes>
    </>
  );
}

export default App;
