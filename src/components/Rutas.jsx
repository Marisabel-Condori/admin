import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Docente from './Docente'
import DocentePrueba from './DocentePrueba'
import Estudiante from './Estudiante'

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route exact path='/DocentePrueba' element={<DocentePrueba />} />
                <Route exact path='/Docente' element={<Docente />} />
                <Route exact path='/Estudiante' element={<Estudiante />} />
            </Routes>
        </>
    )
}

export default Rutas