import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object({
    id:  yup.string().required(),
  }).required();
  
  export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
    //const navigate = useNavigate();
    const onSubmit = async data => {
      console.log(data)
      await fetch(`http://localhost:3003/api/patient/details/${data.id}`)
        .then(response => response.json())
        .then(data => {
          alert("Hello");
           //navigate('/customer')
        })
        .catch((err) => {
          alert('failed to connect to the server ')
        })
  
    };
  
    return (<div > 
       {/* <img id="logo1" src="../images/logo1.png" alt="Italian Trulli"></img> */}
        <h3>כניסה</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input id="inputEnter" {...register("id")} className="inputs" placeholder="id" />
          <p>{errors.id?.message}</p>
          <input type="submit" className="inputs" id="toSubmitEnter" />
        </form>
       </div>
    );
  }