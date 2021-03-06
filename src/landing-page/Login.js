import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import axios from 'axios'
import { connect } from 'react-redux'
import { setToken } from '../actions'

function Registro(props) {
  const [clave, setclave] = useState("");

  const [usuario, setusuario] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!usuario) {
      alert("debe digitar usuario")
    }
    if (!clave) {
      alert("debe digitar clave")
    }
    await axios.post("https://hackathonredis.herokuapp.com/singin", {
      username: usuario,
      password: clave
    }).then(response => {
      console.log(props.setToken(response.data.token))
      if (response.data === "The email doesn't exists") {
        alert("The email doesn't exists")
      } else {
        if (response.data.auth === false) {
          alert("contraseña incorrecta")
        } else {
          alert("Login exitoso")         
          if (response.data.userType == "0") {
            props.history.push("/comprador")
          } else {
            props.history.push("/inicioProductor")
          }

        }
      }


    })
      .catch(e => console.error("problema fetching data", e));
  }

  return (
    <div className="fondo2">
      <div className="container d-flex justify-content-center align-items-center  pt-5 ">
        <div className="row no-gutters h-100">
          <div className="center-form">
            <Form className="loginForm" onSubmit={handleLogin}>
              <h1 id="title-login">Ingresar </h1>

              <Input
                placeholder="Ingrese usuario"
                onChange={(e) => setusuario(e.target.value)}
                id="apellido"
                name="apellido"
                className="m-2"
                value={usuario}
                autoComplete="on"
              />

              <Input
                type="password"
                placeholder="Ingrese Clave"
                onChange={(e) => setclave(e.target.value)}
                id="clave"
                name="clave"
                className="m-2"
                value={clave}
                autoComplete="off"
              />

              <br />

              <button className="button black" value="Registro">
                Ingresar
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = {
  setToken
}
export default connect(null, mapDispatchToProps)(Registro)