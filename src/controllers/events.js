const { request, response } = require('express');
// const { validationResult } = require('express-validator');
const EventModel = require('../model/Event');

const getEvent = async (req, res = response) => {
  // const event = new EventModel();
  try {
    const events = await EventModel.find().populate('user', 'name');

    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const createEvent = async (req, res = response) => {
  const event = new EventModel(req.body);
  try {
    event.user = req.uid;
    const eventSaved = await event.save();

    return res.status(201).json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;
  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      evento: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;
  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de borrar este evento',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    await EventModel.findByIdAndDelete(eventId);

    return res.status(200).json({ ok: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

module.exports = { getEvent, deleteEvent, createEvent, updateEvent };
