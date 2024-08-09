const mongoose = require('mongoose');

const joinSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
    password: {
        type: String
    },
    names: {
        type: String
    },
    email: {
        type: String
    },
    office: {
        type: String
    },
    phone: {
        type: String
    }
});

module.exports = mongoose.model('Join', joinSchema);
