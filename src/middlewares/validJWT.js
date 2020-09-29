const { request, response } = require('express');
const jwt = require('jsonwebtoken');
// const moment = require('moment');

const validJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion',
    });
  }

  try {
    //  iat, exp
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token not valid',
    });
  }

  // console.log(token);

  next();
  // ???
};

module.exports = {
  validJWT,
};
