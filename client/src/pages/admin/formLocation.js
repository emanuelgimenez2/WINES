import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate , useLocation} from 'react-router-dom';
import { AddLocacion , UpdateLocacion} from '../../actions/action';

export function validate(input) {
  let errors = {};
  if (input.description === '') {
    errors.description = 'Debe indicar un nombre!';
  }
  return errors;
};

function AddLocation() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    id_place: state ? state.id_place : '',
    description: state ? state.description : ''
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.description !== '') {
      if(!state || input.id_place === 0){
        dispatch(AddLocacion(input))
        alert('Locacion agregada con exito!')
      }else{
        dispatch(UpdateLocacion(input))
        alert('Locacion modificada con exito!')
      }
      navigate('/admin/listLocation')
    } else {
      alert('No puede enviar el formulario vacio!')
    }

  }


  return (
    <div className='bg-[url("https://mexico.infoagro.com/wp-content/uploads/2020/03/vin%CC%83edo.jpg")] bg-cover bg-center m-0 w-full h-screen'>
      <div className='w-full h-full max-w-lg mx-auto' >
        <form onSubmit={e => handleSubmit(e)} className='bg-white shadow-md rounded px-8 pt-10 pb-10 grid'>
          <h1 className='justify-self-center'>COMPLETE EL NOMBRE DE LA LOCACION:</h1>

          <div className='mb-4'>
            <label htmlFor="description" className='block text-gray-700 text-sm font-bold mb-2'>Nombre: </label>
            <input type="text" id='description' name='description' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={input.description} onChange={handleChange} />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          <button className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline' type='submit' >{input.id_place > 0 ? 'MODIFICAR' : 'AGREGAR'}</button>
        </form>
      </div>
    </div>
  )
}

export default AddLocation