/*
  Event Router
  /appi/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValid } = require('../middlewares/fieldValid');
const { validJWT } = require('../middlewares/validJWT');
const { isDate } = require('../helpers/isDate');

const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const router = Router();
router.use(validJWT); // => Todas las rutas validaran el token

router.get('/', getEvent);

router.post(
  '/',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'The start date is required').custom(isDate),
    check('end', 'The end date is required').custom(isDate),
    fieldValid,
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'The start date is required').custom(isDate),
    check('end', 'The end date is required').custom(isDate),
    fieldValid,
  ],
  updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;
