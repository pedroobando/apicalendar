const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../model/User');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email ya se esta registrado',
      });
    }

    user = new UserModel(req.body);

    // Encriptar Contrasena
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y password no validos.',
      });
    }

    // Compare password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y password no validos',
      });
    }
    // Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generar JWT
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
