import './assets/bootstrap.css'
import './assets/custom.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {

  const handle = () => {
    console.log('hello');
  }

  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route index element={<Dashboard />} />
        <Route path='/login' element={<Login onSend={handle} />} />
      </Route>
    </Routes>
  )
}

export default App
