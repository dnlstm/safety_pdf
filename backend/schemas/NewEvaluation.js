const mongoose = require('mongoose');

const newevaluationSchema = mongoose.Schema(
    {
        userid: {
            admin: {
                type: String
            },
            userid: {
                type: String
            }
        },
        buildingName: {
            type: String
        },

        buildingAddress: {
            type: String
        },
        buildingStructure: {
            type: String
        },
        floorArea: {
            type: String
        },
        buildingArea: {
            type: String
        },
        groundFloor: {
            type: String
        },
        baseFloor: {
            type: String
        },
        mainUse: {
            type: String
        },
        cirCularspeedUse: {
            type: String
        },
        picture: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('NewEvaluation', newevaluationSchema);
