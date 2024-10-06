const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  type: { type: String, required: true },
  geometry: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  properties: {
    parameter: {
      PRECTOTCORR: { type: Object, required: true }
    },
    header: { type: Object, required: true },
    messages: { type: [String] },
    parameters: { type: Object, required: true },
    times: { type: Object, required: true }
  }
});

module.exports = mongoose.model('Weather', weatherSchema);
