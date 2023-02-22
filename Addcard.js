import React, { useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'


 function Addcard() {
    const { register, handleSubmit } = useForm();
    const [alldata, setdata] = useState('');

    useEffect(()=>{
         console.log(alldata);
      axios.post('http://localhost:8080/products/',alldata) 
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
         
    },[alldata])

     const onSubmitt = (data) => {
      console.log('sbmit');
      console.log(data);
      console.log('sbmit');
      setdata(data)
    }


    return (
        <div className='forms'>
            <h1>add your Vacatino</h1>
            <form onSubmit={handleSubmit(onSubmitt)}>
                 <label>
                 image link
                <input type="text" placeholder='image link' {...register('img')} />
                </label>
                <br/> 
                <label>
                When does the  vacation start ?  
                <input type="date" placeholder='season start and end' {...register('time')} />
                </label>
                <br/>
                <label>
                Card Title
                <input type="text" placeholder='Card Title' {...register('Card_Title')} />
                </label>
                <br/>
                <label>
                vacation information
                <textarea placeholder='vacation information' {...register('text')} />
                </label>
                <br/>
                <label>
                how much is cost
                <input type="number" placeholder='how much is cost' {...register('money')} />
                </label>
                <br/>
                <label>
                When does the  vacation end ?
                <input type="date" placeholder='tourism company' {...register('returntime')} />
                </label>
                <br/>
                <input type="submit" />
            </form>

        </div>
    )
}

export default Addcard