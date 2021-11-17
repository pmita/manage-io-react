import './App.css'
//ROUTER
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//PAGES
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import Create from './pages/create/Create';
import Project from './pages/project/Project';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
            <Route path='/create' element={<Create />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App

