const mongoose = require('mongoose');

const picture1Schema = new mongoose.Schema(
    {
        picture1: {type: String}
    },
    {_id: false}
);

const picture2Schema = new mongoose.Schema(
    {
        picture2: {type: String}
    },
    {_id: false}
);

const newPicture1Schema = new mongoose.Schema(
    {
        picture1: {type: String}
    },
    {_id: false}
);

const newPicture2Schema = new mongoose.Schema(
    {
        picture2: {type: String}
    },
    {_id: false}
);

const transformedSchema = new mongoose.Schema(
    {
        equipInput: {type: String},
        equipInput2: {type: String},
        equipInput3: {type: String},
        equipInput4: {type: String}
    },
    {_id: false}
);

const water10Schema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewEvaluation'
        },
        evaluationItems: {
            type: String
        },
        evaluationLocation: {
            type: String
        },

        picture1: [picture1Schema],
        picture2: [picture2Schema],

        evaluationContent: {
            type: String
        },
        evaluationResult: {
            type: String
        },

        improvementResult: {
            type: String
        },

        newPicture1: [picture1Schema],
        newPicture2: [picture2Schema],

        improvementContent: {
            type: String
        },
        transformed: [[transformedSchema]]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Water10', water10Schema);
