import React , { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddMorbidity from "./AddMorbidity";
import AddVaccine from "./AddVaccine";


export default function Patients({chosed,id}) {
    const [ patient,  setpatient]= useState({});
    const [ vaccinations,  setvaccinations]= useState([]);
    const [ morbidity,  setmorbidity]= useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:3003/api/patient/details/${id}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setpatient(data[0]);
            })
            .catch((err) => {
                alert('failed to connect to the server '+err)
            })
            fetch(`http://localhost:3003/api/patient/vaccination/${id}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setvaccinations(data);
            })
            .catch((err) => {
                alert('failed to connect to the server '+err)
            })
            fetch(`http://localhost:3003/api/patient/morbidity/${id}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setmorbidity(data);
            })
            .catch((err) => {
                alert('failed to connect to the server '+err)
            })
    }, [])
    const deleteMV=(t,code)=>{
        if(t==0)
        fetch(`http://localhost:3003/api/patient/deletev/${code}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setvaccinations(data);
        })
        .catch((err) => {
            alert('failed to connect to the server '+ err)
        })
        else
        fetch(`http://localhost:3003/api/patient/deletem/${code}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setmorbidity(data);
        })
        .catch((err) => {
            alert('failed to connect to the server '+ err)
        })
    }

    
    return <div>
        <h3>Hello {patient.p_firstName} {patient.p_lastName}</h3>
        <h4>Vaccinations</h4>
        <table>
            <tr><th>Date</th><th>Manufacturer</th></tr>
            {vaccinations.map(v=> <tr key={v.v_code}>
            <td>{v.v_date}</td><td>{v.v_manufacturer} </td>
            <button onClick={() => deleteMV(0,v.v_code)}>X</button></tr>)}
        </table>
     {(vaccinations.length<4)&& <AddVaccine id={id}/>}
         <h4>Morbidity</h4>
        <table>
            <tr><th>Date of possitive test</th><th>Date of recovert</th></tr>
            {morbidity.map(m=> <tr key={m.m_code}>
            <td>{m.m_dateOfPositiveTest}</td><td>{m.m_dateOfRecovery} </td>
            <button onClick={() => deleteMV(1,m.m_code)}>X</button></tr>)}
        </table> 
        <AddMorbidity id={id}/>
        
        <br></br>
        <button onClick={() =>{navigate('/patient/details')}}>Update details</button>
        <button onClick={() =>{chosed(''); navigate('/patients')}}>Back</button>
    </div>
}