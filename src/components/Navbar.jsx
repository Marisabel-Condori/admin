import {React, useState} from 'react'
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    const [dropdown, setDropdown] = useState(false)
    const abrirDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className="mt-2">
            <div className="navbar navbar-expand navbar-dark bg-dark">
            
            <Dropdown className='float-left mt-2 mx-5' isOpen={dropdown} toggle={abrirDropdown}>
            <DropdownToggle color='dark'>
                Seccion
            <FontAwesomeIcon icon={faBars} color='white' className='mx-3'/>
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem><Link to="/DocentePrueba" className="btn"> DocentePrueba </Link></DropdownItem>
                <DropdownItem><Link to="/Docente" className="btn"> Docente </Link></DropdownItem>
                <DropdownItem><Link to="/Estudiante" className="btn"> Estudiante </Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>


                        {/* <Link to="/Docente" className="btn btn-dark "> Docente </Link>
                        <Link to="/Estudiante" className="btn btn-dark "> Estudiante </Link> */}
                    
                
            </div>
        </div>
    )
}

export default Navbar