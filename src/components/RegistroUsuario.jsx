import React, { useCallback, useState } from "react"
import { Alert, Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap"

import axios from "axios"
import { Apiurl } from '../api/UsuariosApi'
import { Link } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [error, setError] = useState(null)

    const [validate, setValidate] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validatePassword2, setValidatePassword2] = useState(false)
    const [validateNombre, setValidateNombre] = useState(false)
    const [validateApellido, setValidateApellido] = useState(false)

    const [esRegistro, setEsRegistro] = useState(false)

    //*************** VALIDA CAMPOS - email password******************** */
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validateEmailFun = (e) => {
        if (emailRex.test(e.target.value)) {
            setValidate(true)
        } else {
            setValidate(false)
        }
    }
    const validatePassFun = (e) => {
        if (e.target.value.length > 7) {
            setValidatePassword(true)
        } else {
            setValidatePassword(false)
        }
    }
    const validatePassFun2 = (e) => {
        if (e.target.value.length > 7) {
            setValidatePassword2(true)
        } else {
            setValidatePassword2(false)
        }
    }
    const validateNombreFun = (e) => {
        if (!e.target.value.trim()) {
            setValidateNombre(false)
        } else {
            setValidateNombre(true)
        }
    }
    const validateApellidoFun = (e) => {
        if (!e.target.value.trim()) {
            setValidateApellido(false)
        } else {
            setValidateApellido(true)
        }
    }

    //********************* MODAL ********************/
    const [isOpen, setIsOpen] = useState(true)

    const abrirModal = () => {
        setIsOpen(!isOpen)
        { isOpen && <Modal /> }
    }

    //****************** PROCESAR DATOS ******************** */
    const procesarDatos = (e) => {
        e.preventDefault()
        if (esRegistro) {
            registrar(nombre, pass, apellidos, email)
        } else { login(email, pass) }
        // setNombre('')
        // setApellidos('')
        // setEmail('')
        // setPass('')
        setError('')
        console.log('procesando datosssssssss ....');
    }
    /************* LOGIN - GET ************* */
    const login = useCallback(async (emailU, passU) => {
        // console.log('email... ' + emailU + ' pass ' + passU);
        let url = Apiurl + 'login'
        let res = await axios.get(url, { params: { correo: email, password: passU } },)
        console.log('LOGIN.......');
        console.log(res.data);
        if (res.data.status === 'error') {
            setError(res.data.message)
            setTimeout(() => {
                setError(null)
            }, 3000);
        } else {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('nombre', res.data.nombre)
            window.location.pathname = '/'
            abrirModal()
        }
        ///************ GUARDANDO DATOS LOCALMENTE SINGIN****** */
    }, [email, pass])
    /************** REGISTRO PERSONA - POST****************/
    const registrar = useCallback(async (nomU, passU, apeU, emaU) => {
        console.log('///ENVIADOOOOO///')
        let url = Apiurl + "auth"
        let res = await axios.post(url, null, {
            params: { nombre: nomU, ap_paterno: apeU, correo: emaU, password: passU, departamento: '??' }
        })
        console.log('++++++++++++ response registro de usuario')
        console.log(res);
        if (res.data.status === 'error') {
            setError(res.data.message)
            setTimeout(() => {
                setError(null)
            }, 3000);
        } else {
            localStorage.setItem(res.data)
            // window.location.href = '/'
            window.location.pathname = '/'
            abrirModal()
        }
    }, [email])

    return (
        <div className="my-5">
            <Modal isOpen={isOpen}>
                <ModalBody>
                    <center> <h5>{esRegistro ? 'registro de usuario' : 'login de acceso'}</h5> </center>
                    <Form className='form' >
                        {error &&
                            <Alert color="danger">
                                {error}
                            </Alert>
                        }
                        <FormGroup>
                            <Label for='exampleEmail'>Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email@email.com"
                                valid={validate === true} invalid={validate === false}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validateEmailFun(e)
                                }}
                            />
                            {validate === false && email !== '' && <FormFeedback > Email incorrecto</FormFeedback>}
                        </FormGroup>

                        <FormGroup>
                            <Label for='examplePassword'>Contraseña</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="********"
                                valid={validatePassword === true} invalid={validatePassword === false}
                                onChange={e => {
                                    setPass(e.target.value)
                                    validatePassFun(e)
                                }} />
                            {validatePassword === false && pass !== '' && <FormFeedback > Password MENOR 8</FormFeedback>}
                        </FormGroup>
                        {!esRegistro && (
                            <Link to="/Forgot" className="btn btn btn-link rounded-0"> Olvidaste tu contraseña </Link>
                        )}
                        {
                            esRegistro && (
                                <>
                                    <FormGroup>
                                        <Label for='examplePassword2'>Repite la contraseña</Label>
                                        <Input type="password" name="password2" id="examplePassword2" placeholder="********"
                                            valid={validatePassword2 === true} invalid={validatePassword2 === false}
                                            onChange={e => {
                                                setPass2(e.target.value)
                                                validatePassFun2(e)
                                            }}
                                        />
                                        {validatePassword2 === false && pass2 !== '' && <FormFeedback > Password MENOR 8 luego ver si SON IGUALES</FormFeedback>}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label >Nombre</Label>
                                        <Input type="text" placeholder="Ingrese nombre"
                                            valid={validateNombre === true} invalid={validateNombre === false}
                                            onChange={e => {
                                                setNombre(e.target.value)
                                                validateNombreFun(e)
                                            }} />
                                        {validateNombre === false && nombre !== '' && <FormFeedback > no tiene nombre</FormFeedback>}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label >Apellidos</Label>
                                        <Input type="text" placeholder="Ingrese apellidos"
                                            valid={validateApellido === true} invalid={validateApellido === false}
                                            onChange={e => {
                                                setApellidos(e.target.value)
                                                validateApellidoFun(e)
                                            }} />
                                        {validateApellido === false && apellidos !== '' && <FormFeedback > no tiene apellido</FormFeedback>}

                                    </FormGroup>
                                </>
                            )
                        }

                        <Button color="secondary" onClick={procesarDatos}
                            disabled={esRegistro
                                ? validate && validatePassword && validateNombre && validateApellido ? false : true
                                : validate && validatePassword ? false : true
                            }
                        >{esRegistro ? 'Registrarse' : 'Ingresar'}</Button>
                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                <Button className="btn btn-info btn-sm btn-block" onClick={() => setEsRegistro(!esRegistro)}>
                                    {esRegistro ? 'ya estas registrado?' : 'no tienes cuenta?'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}


export default Login