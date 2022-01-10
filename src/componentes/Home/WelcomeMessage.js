import React from 'react'
import { Row, Col } from "react-bootstrap/lib";

const WelcomeMessage = ({userInfo}) => {

  const estiloHome = {
    textAlign: "center",
    color: "#135B9E",
    marginTop: "5%"
  };

  return (
    <Row>
      <Col xs={12} style={estiloHome}>
        <img alt="Logo" src="/img/logo-cassi.png"></img>
        <h1>Olá {userInfo.given_name}! Seja bem-vindo(a).</h1>
        <p>
          Use os filtros acima para pesquisar o período desejado.  <br/>
          Período máximo de um mês.
        </p>
      </Col>
    </Row>
  )
}

export default WelcomeMessage
