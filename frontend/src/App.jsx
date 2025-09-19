import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Rules from './features/MazeStart/Rules/Rules';
import MazeStart from './features/MazeStart/MazeStart';
import PathChoice from './features/MazeStart/PathChoice/PathChoice';
import DifferentURLSameContent from './features/MazeStart/PathChoice/PathA/DifferentURLSameContent';
import DoorA from './features/MazeStart/PathChoice/PathA/DoorA/DoorA';
import DoorB from './features/MazeStart/PathChoice/PathA/DoorB/DoorB';
import SameURLDifferentContent from './features/MazeStart/PathChoice/PathC/SameURLDifferentContent';
import RandomParameter from './features/MazeStart/PathChoice/PathB/RandomParameter';

function App() {
  const [count, setCount] = useState(0);

  const fetchAPI = async () => {
    const response = await fetch("http://localhost:8080/api");
    const data = await response.json();
    console.log(data.fruits);
  }

  useEffect( () => {
    fetchAPI();
  }, []);

  return (
      <Router>
        <Routes>
          <Route path='/' element = {<MazeStart />}></Route>
          <Route path='/PathChoice' element = {<PathChoice />}></Route>
          <Route path='/Rules' element = {<Rules />}></Route>
          <Route path='/DifferentURLSameContent' element = {<DifferentURLSameContent />}></Route>
          <Route path='/DoorA' element = {<DoorA />}></Route>
          <Route path='/DoorB' element = {<DoorB />}></Route>
          <Route path='/SameURLDifferentContent' element = {<SameURLDifferentContent/>}></Route>
          <Route path='/RandomParameter' element = {<RandomParameter />}></Route>
        </Routes>
      </Router>
  );
}

export default App
