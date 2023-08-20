// TODO было бы не плохо получать адрес из .env

const { NODE_ENV = 'dev' } = process.env;
const allowedCors = [
  'http://ilyushindenis-15-front.nomoredomainsicu.ru',
  'https://ilyushindenis-15-front.nomoredomainsicu.ru',
  'http://localhost:3000',
  'https://localhost:3000',
];

// в режиме разработки резрешается обращаться к серверу с любого сервиса
if (NODE_ENV === 'dev') {
  allowedCors.push('*');
}

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
