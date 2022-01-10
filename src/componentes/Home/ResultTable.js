import React from 'react'
import { Table } from "react-bootstrap/lib";

import { CassiPainel } from "cassi-componentes/dist/Painel";

const ResultTable = ({rows, total}) => {
  return (
    <CassiPainel titulo="Resultado da pesquisa" bsStyle="primary">
      <Table striped hover>
        <thead>
          <tr>
            <th>Data ocorrências</th>
            <th>Quantidade de registros</th>
          </tr>
        </thead>

        {makeTBodyFromApiResult(rows, total)}

      </Table>
    </CassiPainel>
  )
}

const makeTBodyFromApiResult = (rows, total) => {
  // Se tiver resultado
  if(rows && rows.length) {
    return (
      <tbody>
        {rows.map((row, i) => (
          <tr key={`row-${i}`}>
            <td>{row.data}</td>
            <td>{row.total}</td>
          </tr>
        ))}
      <tr>
        <td colSpan={2} className="info">Total de ocorrências: {total}</td>
      </tr>
    </tbody>
    );
  } else {
    return (
      <tbody>
        <tr>
          <td className="warning" colSpan="2">Não foram encontrados registro para os dados informados.</td>
        </tr>
      </tbody>
    )
  }
}

export default ResultTable
