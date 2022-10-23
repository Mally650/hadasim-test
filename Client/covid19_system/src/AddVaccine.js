import {Popup} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    id:  yup.string().required(),
    manufactor: yup.string().required(),
    date: yup.date().required
  }).required();
  

export default function AddVaccine({ id }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = async data => {
        console.log(data)
        await fetch(`http://localhost:3003/api/patient/addv`, {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                id: data.id,
                manufactor: data.manufactor,
                date:data.date
            })
        })
            .then(response => response.json())
            .then(data => {
                alert("added")
            })
            .catch((err) => {
                alert('failed to connect to the server ')
            })
      };
    return (
        <Popup trigger={<button type='button'>Add vaccination</button>} position="right center">
            {close => (
                <div>
                    <a className="close" onClick={close}>
                        X
                    </a>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {(id!='')?<input id="inputEnter" {...register("id")} className="inputs" placeholder="id"  value={id}/>:<input id="inputEnter" {...register("id")} className="inputs" placeholder="id"  />}
          <p>{errors.id?.message}</p>
          <input id="inputEnter" {...register("manufactor")} className="inputs" placeholder="manufactor" />
          <p>{errors.manufactor?.message}</p>
          <input id="inputEnter" {...register("date")} className="inputs" placeholder="date" />
          <p>{errors.date?.message}</p>
          <input type="submit" className="inputs" id="toSubmitEnter" />
        </form> </div>
                    
            )}
        </Popup>
    )
}