import { React, useEffect, useState } from 'react'
import axios from "axios"
import { Apiurl } from '../api/UsuariosApi'
import RegistroDocente from './RegistroDocente'

const Docente = () => {

  const [listaDocentes, setListaDocentes] = useState([])
  const [tarea, setTarea] = useState('')
  const [listaTareas, setListaTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  console.log('listaaaaaaaaaaaaaaaa');
  console.log(listaDocentes);  

  const agregarDocente = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Elemento vacio')
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea)

    setListaTareas([
      ...listaTareas, { id: '22', tarea: tarea }
    ])
    setTarea('')
    setError(null)
  }
  const eliminarDocente = async (idpersona) => {
    let url = Apiurl + "instructor"
    let res = await axios.delete(url, {
      params: { idpersona: idpersona }
    })
    console.log('++++++++++++ response docente ELIMINADO -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se ELIMINOOOOO');
      getDocentes()
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }

  const editar = item => {
    //console.log(item)
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const editarDocente = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Elemento vacio')
      setError('Escriba algo por favor...')
      return
    }
    const nuevoArray = listaTareas.map(item => item.id === id ? { id, tarea: tarea } : item)
    setListaTareas(nuevoArray)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getDocentes()
  }, [])

  ///////////// obtiene todos los docentes ///////////
  const getDocentes = async () => {
    try {
      let url = Apiurl + "instructor"
      let docentes = await axios.get(url)
      setListaDocentes(docentes.data)
      return docentes;
    } catch (error) {
      console.log(error);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h1 className='text-center'>Docente</h1>
      <hr />
      <div className='row'>
        <div className='col-8'>
          <h4 className='text-center'>Lista de Docentes</h4>
          <ul className="list-group">
            {
              listaDocentes.length === 0 ? <li className="list-group-item">No hay docentes</li>
                :
                listaDocentes.map(item => (
                  <li className="list-group-item" key={item.idpersona}>
                    <span className="lead">{item.nombre + ' ' + item.ap_paterno + ' ' + item.email}</span>
                    <button className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => eliminarDocente(item.idpersona)}>
                      Eliminar
                    </button>
                    <button className="btn btn-warning btn-sm float-end"
                      onClick={() => editar(item)}>Editar</button>
                  </li>
                ))
            }
          </ul>
        </div>
        <div className='col-4'>
          <h4 className="text-center">
            {modoEdicion ? 'Editar docente' : 'Añadir docente'}
          </h4>
            <RegistroDocente/>
          {/* <form onSubmit={modoEdicion ? editarDocente : agregarDocente} >
            {
              error ? <span className="text-danger">{error}</span> : null
            } */}

            {/* <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese docente"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            /> */}
            {/* <div className="d-grid gap-2">
              {modoEdicion ? <button className="btn btn-warning " type="submit">Editar</button>
                : <button className="btn btn-dark " type="submit">Agregar</button>}

            </div> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default Docente