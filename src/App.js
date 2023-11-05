
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Detail from './components/Detail'
import AddStaff from './components/AddStaff';
import UpdateStaff from './components/UpdateStaff';
import PaginationComponent from './components/PaginationComponent'
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path='/' element={<LoginPage />}></Route >

        <Route path='/home' element={<Home />}></Route >

        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route path='/pagination' element={<PaginationComponent />}></Route>

        <Route exact path='/contact' element={<Contact />}></Route>

        <Route path='/detail/:id' element={<Detail />}></Route>

        <Route path='/addStaff' element={<AddStaff />}></Route>

        <Route path='/updateStaff/:id' element={<UpdateStaff />}></Route>
      </Routes>

    </div>
  );
}

export default App;
