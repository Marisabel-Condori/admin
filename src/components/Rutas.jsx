import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Docente from './Docente'
import Docente from './Docente'
import Estudiante from './Estudiante'

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route exact path='/Docente' element={<Docente />} />
                <Route exact path='/Docente' element={<Docente />} />
                <Route exact path='/Estudiante' element={<Estudiante />} />
            </Routes>
        </>
    )
}

export default Rutas