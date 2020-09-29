const moment = require('moment');

const isDate = (value) => {
  let retval = false;
  try {
    const fecha = moment(value);
    if (value !== undefined && fecha.isValid()) {
      retval = true;
    }
    return retval;
  } catch (error) {
    return retval;
  }
};

module.exports = { isDate };
