import { React, useCallback, useEffect, useState } from 'react'
import axios from "axios"
import { Apiurl } from '../api/UsuariosApi'
import { Label } from "reactstrap"

const Docente = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repitePassword, setRepitePassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [celular, setCelular] = useState('')
  const [idPersonaD, setIdPersonaD] = useState('')
  const [error, setError] = useState(null)
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const [listaDocentes, setListaDocentes] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [habilitaEditaPassword, setHabilitaEditaPassword] = useState(false)

  // console.log('edita pass..................... habilitaEditaPassword');
  // console.log(habilitaEditaPassword);

  const agregarDocente = e => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Escriba el nombre por favor...')
      return
    }
    if (!apellidos.trim()) {
      setError('Escriba los apellido por favor...')
      return
    }
    if (!celular.trim()) {
      setError('Escriba el celular por favor...')
      return
    }

    if (!email.trim()) {
      setError('Escriba el email por favor...')
      return
    } else {
      if (!emailRex.test(email)) {
        setError('Email incorrecto')
        return
      }
    }

    if (!password.trim()) {
      setError('Escriba el password por favor...')
      return
    }
    if (!repitePassword.trim()) {
      setError('Repita el password por favor...')
      return
    }
    if (password !== repitePassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    registrarDocente(nombre, apellidos, celular, email, password)
    setError(null)
  }
  
  /************** REGISTRO DOCENTE - POST****************/
  const registrarDocente = useCallback(async (nomD, apeD, celD, emaD, passD) => {
    let url = Apiurl + "authDocente"
    let res = await axios.post(url, null, {
      params: { nombre: nomD, ap_paterno: apeD, correo: emaD, password: passD, celular: celD, departamento: '??' }
    })
    console.log('++++++++++++ response registro de docente')
    console.log(res);
    if (res.data.status === 'error') {
      setError(res.data.message)
      setTimeout(() => {
        setError(null)
      }, 3000);
    } else {
      setNombre('')
      setApellidos('')
      setCelular('')
      setEmail('')
      setPassword('')
      setRepitePassword('')
      getDocentes()
    }
  }, [],)

  ///////////////////////// ELIMINAR DOCENTE //////////////////////////////////////////////////////////////////////////////////////////
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

  ///////////////////////// EDITAR DOCENTE //////////////////////////////////////////////////////////////////////////////////////////
  const editar = item => {
    console.log(item)
    setHabilitaEditaPassword(true)
    setModoEdicion(true)
    // setTarea(item.tarea)
    setNombre(item.nombre)
    setApellidos(item.ap_paterno)
    setCelular(item.celular)
    setEmail(item.email)
    setIdPersonaD(item.idpersona)
    setPassword('')
    setRepitePassword('')
  }

  const editarDocente = e => {
    e.preventDefault()
    if (!nombre.trim()) {
      console.log('Elemento vacio')
      setError('Escriba el nombre por favor...')
      return
    }
    if (!apellidos.trim()) {
      console.log('Elemento vacio')
      setError('Escriba los apellido por favor...')
      return
    }
    if (!celular.trim()) {
      console.log('Elemento vacio')
      setError('Escriba el celular por favor...')
      return
    }
    if (!email.trim()) {
      console.log('Elemento vacio')
      setError('Escriba el email por favor...')
      return
    }
    // if (!password.trim()) {
    //   console.log('Elemento vacio')
    //   setError('Escriba el password por favor...')
    //   return
    // }
    // if (!repitePassword.trim()) {
    //   console.log('Elemento vacio')
    //   setError('Repita el password por favor...')
    //   return
    // }
    // if (password!==repitePassword) {
    //   console.log('Las contraseñas no son iguales');
    //   setError('Las contraseñas no coinciden')
    //   return
    // }
    ////////////// UPDATE ////////////////
    editarDocenteBD(idPersonaD, nombre, apellidos, email, celular)
    // getDocentes()
    setModoEdicion(false)
    setNombre('')
    setApellidos('')
    setEmail('')
    // setPassword('')
    // setRepitePassword('')
    setCelular('')
    setHabilitaEditaPassword(!habilitaEditaPassword)
    // setIdPersonaD('')
    setError(null)
  }
  const editarDocenteBD = async (idpersonaD, nombreD, apellidoD, emailD, celularD) => {
    let url = Apiurl + "instructor"
    let res = await axios.patch(url, null, {
      params: { idpersona: idpersonaD, nombre: nombreD, ap_paterno: apellidoD, correo: emailD, celular: celularD }
    })
    console.log('++++++++++++ response docente UPDATE -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      getDocentes()
      console.log('ya se EDITOOOOOOOOO');
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////// obtiene todos los docentes ///////////
  useEffect(() => {
    getDocentes()
  }, [])

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
        <div className='col-4 mb-3'>
          <h4 className="text-center">
            {modoEdicion ? 'Editar docente' : 'Añadir docente'}
          </h4>
          <form onSubmit={modoEdicion ? editarDocente : agregarDocente} >
            {
              error ? <span className="text-danger">{error}</span> : null
            }<br />
            <Label>Nombre</Label>
            <input type="text" className="form-control mb-2" placeholder="Ingrese nombre"
              onChange={e => setNombre(e.target.value)} value={nombre}
            />
            <Label>Apellidos</Label>
            <input type="text" className="form-control mb-2" placeholder="Ingrese apellidos"
              onChange={e => setApellidos(e.target.value)} value={apellidos}
            />
            <Label>Celular</Label>
            <input type="text" className="form-control mb-2" placeholder="Ingrese numero de celular"
              onChange={e => setCelular(e.target.value)} value={celular}
            />
            <Label>Email</Label>
            <input type="email" className="form-control mb-2" placeholder="docente@gmail.com"
              // emailRex.test(e.target.value)
              onChange={e => setEmail(e.target.value)} value={email}
            // onChange={e => emailRex.test(e.target.value)} value={email}
            />
            {modoEdicion &&
              <>
                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={e => setHabilitaEditaPassword(!habilitaEditaPassword)} />
                  <label className="form-check-label">
                    Editar Contraseña
                  </label>
                </div>
                <Label>Ingresa contraseña anterior</Label>
                <input type="password" className="form-control mb-2" placeholder="********" disabled={habilitaEditaPassword}
                // onChange={e => setPasswordAnterior(e.target.value)} value={password}
                />
              </>
            }
            <Label>Contraseña</Label>
            <input type="password" className="form-control mb-2" placeholder="********" disabled={habilitaEditaPassword}
              onChange={e => setPassword(e.target.value)} value={password}
            />
            <Label>Repite contraseña</Label>
            <input type="password" className="form-control mb-2" placeholder="********" disabled={habilitaEditaPassword}
              onChange={e => setRepitePassword(e.target.value)} value={repitePassword}
            />
            <div className="d-grid gap-2">
              {modoEdicion ? <button className="btn btn-warning " type="submit">Editar</button>
                : <button className="btn btn-dark " type="submit">Agregar</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Docente