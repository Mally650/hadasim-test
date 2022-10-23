import {Popup} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    id:  yup.string().required(),
    datep: yup.date().required(),
    dater: yup.date().required
  }).required();
  

export default function AddMorbidity({ id }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = async data => {
        console.log(data)
        await fetch(`http://localhost:3003/api/patient/addm`, {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                id: data.id,
                datep: data.datep,
                dater:data.dater
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
        <Popup trigger={<button type='button'>Add morbidity</button>} position="right center">
            {close => (
                <div>
                    <a className="close" onClick={close}>
                        X
                    </a>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {(id!='')?<input id="inputEnter" {...register("id")} className="inputs" placeholder="id"  value={id}/>:<input id="inputEnter" {...register("id")} className="inputs" placeholder="id"  />}
          <p>{errors.id?.message}</p>
          <input id="inputEnter" {...register("datep")} className="inputs" placeholder="date of possitive test" />
          <p>{errors.manufactor?.message}</p>
          <input id="inputEnter" {...register("dater")} className="inputs" placeholder="date of recovery" />
          <p>{errors.dater?.message}</p>
          <input type="submit" className="inputs" id="toSubmitEnter" />
        </form> </div>
                    
            )}
        </Popup>
    )
}