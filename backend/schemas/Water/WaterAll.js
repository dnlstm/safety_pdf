const mongoose = require('mongoose');

const waterAllSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewEvaluation'
        },
        water: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water'
        },

        water2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water2'
        },

        water3: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water3'
        },
        water4: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water4'
        },
        water5: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water5'
        },
        water6: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water6'
        },
        water7: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water7'
        },
        water8: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water8'
        },
        water9: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water9'
        },
        water10: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water10'
        },
        water11: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water11'
        },
        water12: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Water12'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('WaterAll', waterAllSchema);
