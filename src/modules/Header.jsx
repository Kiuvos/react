import React from 'react'

const Header = props => {
    return (
        <div className="Header">
            <nav>
                <div className="name">
                    <h2>Tabla react</h2>
                </div>

                <div className="Boton-Agregar">
                    <button className='btn btn-outline-success' onClick={props.doIt}>Agregar Nuevo</button>
                </div>
            </nav>        
        </div>
    )
}

export default Header