
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Contact from './components/Contact';
import Detail from './components/Detail'
import AddGame from './components/AddGame';
import UpdateGame from './components/UpdateGame';
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path='/' element={<LoginPage />}></Route >

        <Route path='/home' element={<Home />}></Route >

        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route path='/contact' element={<Contact />}></Route>

        <Route path='/detail/:id' element={<Detail />}></Route>

        <Route path='/addGame' element={<AddGame />}></Route>

        <Route path='/updateGame/:id' element={<UpdateGame />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
