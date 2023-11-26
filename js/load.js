const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Method = {
GET: 'GET',
POST: 'POST',
};

const Route = {
GET_DATA: '/data',
SEND_DATA: '/404',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body});

const getData = () => load(Route.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData,sendData};
