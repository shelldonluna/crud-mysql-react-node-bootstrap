import {useState } from "react";
import Axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [antiguedad,setAntiguedad] = useState();
  const [id,setId] = useState();
  
  const [editar,setEditar] = useState(false);

  const MySwal = withReactContent(Swal)

  const [empleadosList, setEmpleados] = useState([]);
  
  const add =  () => {
    Axios.post("http://localhost:3001/create", {
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      antiguedad:antiguedad
    }).then (() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Has guardado correctamente",
        showConfirmButton: false,
        timer: 1500
      });
    }).catch(function(error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    })
  }

  const limpiarCampos = ()=> {
    setAntiguedad("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    
  }
  
  const update =  () => {
    Axios.put("http://localhost:3001/update", {
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      antiguedad:antiguedad
    }).then (() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Has guardado correctamente",
        //html: "<i>El usuario <strong>"+ nombre +"</strong> fue actualizado correctamente</i>"
        showConfirmButton: false,
        timer: 1500
      });
    }).catch(function(error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    })
  }
  
  const deleteEmpleado = (val) => {
    
      Swal.fire({
                  title: "Confirmar eliminado?",
                  html: "<i>realmente desea eliminar a <strong>"+val.nombre+ "</strong>?</i>",   
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, eliminar."
               
      }).then(res=> {
        if(res.isConfirmed) {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then (() => {
      getEmpleados();
      limpiarCampos();
          Swal.fire({
            title: "Eliminado!",
            text: "El empleado ha sido eliminado.",
            icon: "success",
            timer:1500
          });
        }).catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          });
        })
        }
      })
    
  };


const editarEmpleado = (val) => {
  setEditar (true);

  setNombre(val.nombre);
  setEdad(val.edad);
  setPais(val.pais);
  setCargo(val.cargo);
  setAntiguedad(val.antiguedad);
  setId(val.id)
  
}

  const getEmpleados =  () => {
    Axios.get("http://localhost:3001/empleados").then ((response) => {
      setEmpleados(response.data);
    })
  }

  return ( 
 
    <div class="container">


    <div className="App">
     <div className= "datos">
     
      </div>
      <div className="lista">
       

    
      </div>
    </div>

        <div class="card text-center">
      <div class="card-header">
        Gestión de empleados
      </div>
      <div className="card-body">
          <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input  type="text" 
              onChange={(event)=>{
                setNombre(event.target.value);
              }} 
              className="form-control" value= {nombre} placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Edad:</span>
              <input  type="number" 
              onChange={(event)=>{
                setEdad(event.target.value);
              }} 
              className="form-control" value= {edad} placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">País:</span>
              <input  type="text" 
              onChange={(event)=>{
                setPais(event.target.value);
              }} 
              className="form-control" value= {pais} placeholder="Ingrese el país" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Cargo:</span>
              <input  type="text" 
              onChange={(event)=>{
                setCargo(event.target.value);
              }} 
              className="form-control" value= {cargo} placeholder="Ingrese el Cargo" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
             <span className="input-group-text" id="basic-addon1">Antigüedad:</span>
              <input  type="number" 
              onChange={(event)=>{
                setAntiguedad(event.target.value);
              }} 
              className="form-control" value= {antiguedad} placeholder="Ingrese la antigüedad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

      
      </div>
      <div class="card-footer text-body-secondary">
        {

          editar? 
          <div>
          <button className= 'btn btn-warning m-2' onClick={update} >Actualizar</button> 
           <button className= 'btn btn-info m-2' onClick={limpiarCampos} >Cancelar</button>
          </div>     
          :<button className= 'btn btn-warning' onClick={add} >Registrar</button>
        }
      
      </div>
    </div>
    <div>
    <br/>
    </div>
    <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">País</th>
          <th scope="col">Cargo</th>
          <th scope="col">Antigüedad</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
          empleadosList.map((val,key)=> {
             return (<tr>
              <th scope="row">{ val.id }</th>
              <td>{ val.nombre }</td>
              <td>{ val.edad }</td>
              <td>{ val.pais }</td>
              <td>{ val.cargo }</td>
              <td>{ val.antiguedad }</td>
              <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }} className="btn btn-success">Editar</button>
                      <button type="button"
                              onClick={() => {
                                deleteEmpleado(val);
                              }} className="btn btn-danger">Eliminar</button>
                  </div>
              </td>
            </tr> ) 
        })
        }

    
      
      </tbody>
    </table>
    </div>
  );
}

export default App;
