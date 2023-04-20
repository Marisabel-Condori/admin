import React, { useEffect, useState } from 'react'
import { Apiurl } from '../api/UsuariosApi'
import axios from 'axios'

const Estudiante = () => {

  const [listaEstudiantes, setListaEstudiantes] = useState([])

  ///////////////////////// ELIMINAR ESTUDIANTE ////////////////////////////////////////////////////
  const eliminarEstudiante = async(idestudiante) => {
    let url = Apiurl + "estudiante"
    let res = await axios.delete(url, {
      params: { idpersona: idestudiante }
    })
    console.log('++++++++++++ response estudiante ELIMINADO -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se ELIMINOOOOO');
      getEstudiantes()
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  const designarComoDocente = async (idestudiante) => {
    let url = Apiurl + "instructor"
    let res = await axios.post(url, null, {
      params: { idpersona: idestudiante }
    })
    console.log('++++++++++++ response registro de docente')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se designo como docenteeeeeee');
      getEstudiantes()
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }

  useEffect(() => {
    getEstudiantes()
  }, [])

  ///////////// obtiene todos los estudiantes ///////////
  const getEstudiantes = async () => {
    try {
      let url = Apiurl + "estudiantes"
      let estudiantes = await axios.get(url)
      setListaEstudiantes(estudiantes.data)
      return estudiantes;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className='text-center'>Estudiante</h1>
      <ul className="list-group">
        {
          listaEstudiantes.map(card => (
            <li className="list-group-item" key={card.idpersona}>
              <span className="lead">{card.nombre + ' ' + card.ap_paterno + ' ' + card.ci}</span>

              <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => eliminarEstudiante(card.idpersona)}>
                Eliminar
              </button>
              {/* className="btn btn-warning btn-sm float-end"  */}

              <button className={`${card.esDocente === "TRUE" ? 'btn-success' : 'btn-warning'} btn btn-sm float-end mx-2`}
                onClick={() => { card.esDocente === "FALSE" && designarComoDocente(card.idpersona) }}>
                {card.esDocente === 'TRUE' ? 'Es Docente' : 'Designar como docente'}</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Estudiante