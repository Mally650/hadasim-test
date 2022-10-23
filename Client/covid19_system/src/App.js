import logo from './logo.svg';
import React, { useState }  from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Patients from './Patients';
import Patient from './Patient';
import DetailsPatient from './DetailsPatient';
import Login from './Login';

function App() {
  const [p,setp]=useState('');
  const chosed=(id)=>{
    console.log(id)
    setp(id);
  }
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Patients chosed={(id)=>chosed(id)}/>} ></Route>
          {/* <Route path='/login' element={<Login />} ></Route> */}
          <Route path='/patient' element={<Patient id={p} chosed={(id)=>chosed(id)}/>}></Route>
          <Route path='/patient/details' element={<DetailsPatient id={p} type={(p!='')?'1':'0'} />}></Route>
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    </div>
  );
}
//  <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
export default App;
