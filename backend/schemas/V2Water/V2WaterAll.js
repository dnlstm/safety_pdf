const mongoose = require('mongoose');

const waterAllSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewEvaluation'
        },
        water: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'V2Water'
        },

        water2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'V2Water2'
        },

        water3: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'V2Water3'
        },
        water4: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'V2Water4'
        },
        water5: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'V2Water5'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('V2WaterAll', waterAllSchema);
