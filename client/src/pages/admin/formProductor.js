import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate , useLocation} from 'react-router-dom';
import { AddBodega , UpdateBodega } from '../../actions/action';

export function validate(input) {
  let errors = {};
  if (input.description === '') {
    errors.description = 'Debe indicar un nombre!';
  }
  return errors;
};

function AddProductor() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    id_Prod: state ? state.id_Prod : '',
    description: state ? state.description : '',
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
      if(!state || input.id_Prod === 0){
        dispatch(AddBodega(input))
        alert('Productor agregado con exito!')
      }else{
        dispatch(UpdateBodega(input))
        alert('Productor modifico con exito!')
      }
      navigate('/admin/listProductor')
    } else {
      alert('No puede enviar el formulario vacio!')
    }

  }

  return (
    <div className='bg-[url("https://imagenes.elpais.com/resizer/GbwuHojrXEKNEW0EFyojEsRVUdk=/1960x1470/filters:focal(2388x2668:2398x2678)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/T6P34IJU2FF4JNB47DII5KBIO4.jpg")] bg-cover bg-center m-0 w-full h-screen'>
      <div className='w-full h-full max-w-lg mx-auto' >
        <form onSubmit={e => handleSubmit(e)} className='bg-white shadow-md rounded px-8 pt-10 pb-10 grid'>
          <h1 className='justify-self-center'>COMPLETE EL NOMBRE DEL PRODUCTOR:</h1>

          <div className='mb-4'>
            <label htmlFor="description" className='block text-gray-700 text-sm font-bold mb-2'>Nombre: </label>
            <input type="text" id='description' name='description' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={input.description} onChange={handleChange} />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          <button className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline' type='submit' >{input.id_Prod > 0  ? 'MODIFICAR' : 'AGREGAR'}</button>
        </form>
      </div>
    </div>
  )
}

export default AddProductor