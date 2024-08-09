const mongoose = require('mongoose');

const gasAllSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewEvaluation'
        },
        gas: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gas'
        },

        gas2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gas2'
        },

        gas3: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gas3'
        },
        gas4: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gas4'
        },
        gas5: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gas5'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('GasAll', gasAllSchema);
