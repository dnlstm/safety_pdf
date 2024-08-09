const mongoose = require('mongoose');

// const equipmentSituationSchema = mongoose.Schema({
//     a33: {
//         해당여부: {
//             type: Boolean
//         },
//         특기사항: {
//             type: Boolean
//         },
//         비고: {
//             type: String
//         }
//     }
// });

const equipmentSituationSchema = {
    evaluateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewEvaluation'
    }
};

// const fields = Array(74)
//     .fill()
//     .map((_, i) => i + 1); Array from이 장점이 더 많음

const fields = Array.from({length: 74}, (_, i) => i + 1);

fields.forEach((field) => {
    equipmentSituationSchema[field] = {
        applicable: {
            type: Boolean
        },
        specialSkill: {
            type: Boolean
        },
        note: {
            type: String
        }
    };
});

module.exports = mongoose.model('EquipmentSituation', mongoose.Schema(equipmentSituationSchema));
