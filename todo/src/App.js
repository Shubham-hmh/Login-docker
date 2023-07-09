import './App.css';
import { BrowserRouter, Routes, Route ,Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App(props) {
  const isLoggedIn =true;
  return (
    <>
          <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path='/' >
          <Route index element ={<Login/>} />
            <Route path="update/:email" element ={<Profile/>} />
            <Route path='signup' element={<Signup/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
