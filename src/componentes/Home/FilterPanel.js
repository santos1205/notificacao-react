import React from "react";
import { Row, Col } from "react-bootstrap/lib";

import { Formik, Form } from "formik";
import moment from "moment";

import { CassiPainel } from "cassi-componentes/dist/Painel";
import { CassiFloatDatePicker } from "cassi-componentes/dist/FormFloatLabel";
import { CassiMensagemErrosValidacao } from "cassi-componentes/dist/Form";
import { CassiBotao } from "cassi-componentes/dist/Botao";

const FilterPanel = ({ setFilter }) => {

  const onSubmit = (values) => {
    // só executa se não tiver ocorrido error de validação
    setFilter({
      dtInicial: values.datainicial,
      dtFinal: values.datafinal,
      valid: true
    });
  };

  const validacao = values => {
    const errors = {};
    //validar campos obrigatórios
    if (!values.datainicial && !values.datafinal) {
      errors.required = "Todos os campos são de preenchimento obrigatório";
    }

    //validar datas faltantes
    if (!!values.datainicial && !values.datafinal) {
      errors.data = "Data Final deve ser preenchida";
    }

    if (!values.datainicial && !!values.datafinal) {
      errors.data = "Data Inicial deve ser preenchida";
    }
    //verificação de datas
    if (!!values.datainicial && !!values.datafinal) {
      const dtInicial = moment(values.datainicial, "DD/MM/YYYY", true).format();
      const dtFinal = moment(values.datafinal, "DD/MM/YYYY", true).format();
      const dias = Math.floor(
        moment(dtFinal).diff(moment(dtInicial), "days", true)
      );

      if (dtInicial > dtFinal) {
        errors.intervalo =
          "Data Final deve ser maior ou igual que a Data Inicial";
      }

      if (dias > 31) {
        errors.intervalo =
          "Período de data informado deve compreender o intervalo de no máximo um mês.";
      }
    }

    // Caso aconteça algum erro resetar os filtros
    if(errors) {
      setFilter({})
    }

    return errors;
  };

  return (
    <div>
      <CassiPainel titulo="Filtrar datas para pesquisa" bsStyle="primary">
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            datainicial: "",
            datafinal: ""
          }}
          validate={validacao}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          render={({ setFieldValue, values, errors }) => (
            <Form>
              <CassiMensagemErrosValidacao errors={errors} />
              <Row>
                <Col md={4}>
                  <CassiFloatDatePicker
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    id="datainicial"
                    label="Inicio filtro"
                    placeholder="Inicio do período de pesquisa"
                  />
                </Col>
                <Col md={4}>
                  <CassiFloatDatePicker
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    id="datafinal"
                    label="Fim filtro"
                    placeholder="Fim do período de pesquisa"
                  />
                </Col>
                <Col md={4} style={{ marginTop: "6px" }} className="text-center">
                  <CassiBotao
                    buttonName="Buscar"
                    type="submit"
                    block={false}
                    disabled={false}
                  >
                    Pesquisar
                  </CassiBotao>
                  <CassiBotao
                    buttonName="Limpar"
                    type="reset"
                    onClick={() => {
                      setFilter({
                        dtInicial: "",
                        dtFinal: ""
                      });
                    }}
                    block={false}
                    disabled={false}
                  >
                    Limpar
                  </CassiBotao>
                </Col>
              </Row>
            </Form>
          )}
        ></Formik>
      </CassiPainel>
    </div>
  );
};


export default FilterPanel;
