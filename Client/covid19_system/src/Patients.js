import React , { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MorbidityGraph from './MorbidityGraph';


export default function Patients({chosed}) {
    const [ patients,  setpatients]= useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:3003/api/patient/details`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setpatients(data);
            })
            .catch((err) => {
                alert('failed to connect to the server '+err)
            })
    }, [])
    const deleteP=(id)=>{
        fetch(`http://localhost:3003/api/patient/delete/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setpatients(data);
        })
        .catch((err) => {
            alert('failed to connect to the server '+ err)
        })
    }
    
    return <div>
        <table>
            <tr><th>iii</th></tr>
            {patients.map(p=> <tr key={p.p_code}>
            <Link to='/patient' onClick={()=>{chosed(p.p_id)}} ><td>{p.p_id}</td></Link><td>{p.p_firstName}</td><td>{p.p_lastName} </td><td>{p.p_address}</td><td>{p.p_houseNum}</td><td>{p.p_city}</td> <td> 
            {p.p_birthDate} </td><td>{p.p_cellphone}</td><td>{p.p_phone}</td><td><button onClick={() => deleteP(p.p_id)}>Delete</button> 
            </td> <td><button onClick={() =>{chosed(p.p_id); navigate('/patient')}}>Details</button> 
            </td> </tr>)}
        </table> 
        <button onClick={() => navigate('/patient')}>Add patient</button>
        <br>
        </br>
        <h1> graph</h1>
        {/* <MorbidityGraph></MorbidityGraph> */}
    </div>
}
       {/* <Link to={{
        pathname: "/patient",
        myProps: {
            patient: p
        }
        }}> */}