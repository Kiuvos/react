import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import Header from './Header';

const Tabla = () => {
  const Exepciones_Numeros = ["e", "E", "+", "-", "."];

  const estadoInicial = [
    { id: 1, nombre: 'Jesus', apellido: 'Camargo', edad: 19 },
    { id: 2, nombre: 'Juan', apellido: 'Martinez', edad: 20 },
    { id: 3, nombre: 'Kenneth', apellido: 'Rosales', edad: 21 }
    
  ]
  const [lista, setLista] = useState(estadoInicial);
  const [modalEditar, setmodalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [UsuarioSelecionado, setUsuarioSelecionado] = useState({
    id: 0,
    nombre: '',
    apellido: '',
    edad: 0
  });

  const SelecionarUsuario = (elemento, estado) => {
    setUsuarioSelecionado(elemento);
    (estado === 'editar') ? setmodalEditar(true) : setModalEliminar(true)
  }

  const AgregarUsuario = () => {
    setUsuarioSelecionado(null);
    setModalInsertar(true);
  }

  const insertarUsuarios = () => {
    var valorInsertar = UsuarioSelecionado;
    valorInsertar.id = lista[lista.length - 1].id + 1;
    var dataNueva = lista;
    let nuevousuario = {
      id: valorInsertar.id,
      nombre: valorInsertar.nombre.trim(),
      apellido: valorInsertar.apellido.trim(),
      edad: valorInsertar.edad
    }
    if (nuevousuario.nombre != "" && nuevousuario.apellido != "" && nuevousuario.edad != "") {
      dataNueva.push(nuevousuario);
      setLista(dataNueva);
      setModalInsertar(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los valores',
      }
      )
    }
  }
  const Cambio = (e) => {
    const { name, value } = e.target;
    if (name === "edad") {
      const edad = parseInt(value);
      const esNumeroValido = !isNaN(edad) && edad >= 0;
      setUsuarioSelecionado((prevState) => ({
        ...prevState,
        [name]: esNumeroValido ? edad : 0,
      }));
    } else {
      setUsuarioSelecionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const editar = () => {
    var NuevosDatos = lista;
    NuevosDatos.map(usuario => {
      if (usuario.id === UsuarioSelecionado.id) {
        if (UsuarioSelecionado.nombre.trim() != "" && UsuarioSelecionado.apellido.trim() != "" && UsuarioSelecionado.edad != "0") {
          usuario.nombre = UsuarioSelecionado.nombre.trim()
          usuario.apellido = UsuarioSelecionado.apellido.trim()
          usuario.edad = UsuarioSelecionado.edad
          setLista(NuevosDatos)
          setmodalEditar(false)
          console.log(lista)

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe llenar todos los valores',
          }
          )
        }
      }
    })
  }

  const eliminar = () => {
    setLista(lista.filter(usuario => usuario.id !== UsuarioSelecionado.id));
    setModalEliminar(false);
  }


  return (
    <div className="container">
      <div className="Header">
        <Header
          doIt={AgregarUsuario}
        />
      </div>

      <div className="tabla">

        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              lista.map((elemento, i) => (
                <tr key={i}>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.apellido}</td>
                  <td>{elemento.edad}</td>
                  <td><button className='btn' onClick={() => SelecionarUsuario(elemento, "editar")}><i className="fa-solid fa-pen"></i></button></td>
                  <td><button className='btn' onClick={() => SelecionarUsuario(elemento, "eliminar")}> <i className="fa-solid fa-trash"></i></button></td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* INSERTAR UN NUEVO DATO */}

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Inserte un nuevo usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="number"
              name="id"
              value={lista[lista.length - 1].id + 1}
            />
            <br />

            <label>Nombre</label>
            <input
              pattern="[a-zA-Z ]{2,254}"
              className="form-control"
              type="text"
              name="nombre"
              value={UsuarioSelecionado ? UsuarioSelecionado.nombre : ''}
              onChange={Cambio}
            />
            <br />

            <label>Apellido</label>
            <input
              pattern="[a-zA-Z]"
              className="form-control"
              type="text"
              name="apellido"
              value={UsuarioSelecionado ? UsuarioSelecionado.apellido : ''}
              onChange={Cambio}
            />
            <br />
            <label>Edad</label>
            <input
              className="form-control"
              type="number"
              name="edad"
              value={UsuarioSelecionado ? UsuarioSelecionado.edad : '0'}
              onChange={Cambio}
              onKeyDown={e => Exepciones_Numeros.includes(e.key) && e.preventDefault()}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={() => insertarUsuarios()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      {/* EDITAR UN USUARIO */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={UsuarioSelecionado && UsuarioSelecionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              pattern="[a-zA-Z]"
              className="form-control"
              type="text"
              name="nombre"
              value={UsuarioSelecionado && UsuarioSelecionado.nombre}
              onChange={Cambio}
            />
            <br />

            <label>Apellido</label>
            <input
              pattern="[a-zA-Z]"
              className="form-control"
              type="text"
              name="apellido"
              value={UsuarioSelecionado && UsuarioSelecionado.apellido}
              onChange={Cambio}
            />
            <br />
            <label>Edad</label>
            <input
              className="form-control"
              type="number"
              name="edad"
              value={UsuarioSelecionado && UsuarioSelecionado.edad}
              onChange={Cambio}
              onKeyDown={e => Exepciones_Numeros.includes(e.key) && e.preventDefault()}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setmodalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* ELIMINAR UN USUARIO */}
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el usuario:  {UsuarioSelecionado && UsuarioSelecionado.nombre}  {UsuarioSelecionado && UsuarioSelecionado.apellido}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Tabla