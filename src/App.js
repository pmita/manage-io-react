import './App.css'
//ROUTER
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
//PAGES
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
//COMPONENTS
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
//HOOKS
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  //STATE
  const { user, authIsReady } = useAuthContext();

  //FUNCTIONS
  const PrivateRouteToLogin = () => {
    return user ? <Outlet /> : <Navigate to='/login' />;
  }

  const PrivateRouteToHome = () => {
    return user ? <Navigate to='/' /> : <Outlet />;
  }

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Sidebar />
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path='/' exact element={<PrivateRouteToLogin />}>
                <Route path='/' exact element={<Dashboard />} />
              </Route>
              <Route path='/create' element={<PrivateRouteToLogin />}>
                <Route path='/create' element={<Create />} />
              </Route>
              <Route path='/projects/:id' element={<PrivateRouteToLogin />}>
                <Route path='/projects/:id' element={<Project />} />
              </Route>
              <Route path='/login' element={<PrivateRouteToHome />}>
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='/signup' element={<PrivateRouteToHome />}>
                <Route path='/signup' element={<Signup />} />
              </Route>
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App

