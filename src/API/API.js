
const lerComoJson = respostaHttp => {
  return respostaHttp.json();
};

const interpretarResposta = json => {
  if (json.status) {
    return json.resultado;
  }

  return Promise.reject(json.messages);
};

const executeRequest = url => {
  const myHeaders = new Headers();
  myHeaders.set('Content-Type', 'application/json');
  myHeaders.set('Accept', 'application/json');
  myHeaders.set('Authorization', 'Bearer ' + window.localStorage.getItem('KEYCLOAK_USR_TOKEN'));

  const myRequest = new Request(url, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  });

  return fetch(myRequest);
}

const BASE_API_URL = process.env.REACT_APP_RELATORIOSERPRO_API;

class API {

  static get(filter) {
    return executeRequest(`${BASE_API_URL}/api/RelatorioPorData?inicio=${this.formatDate(filter.dtInicial)}&fim=${this.formatDate(filter.dtFinal)}`)
      .then(lerComoJson)
      .then(interpretarResposta);
  }

  static formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
}

export default API;
