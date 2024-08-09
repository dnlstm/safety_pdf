const mongoose = require('mongoose');

// Subdocument schema for equipInput
const EquipInputSchema = new mongoose.Schema(
    {
        equipInput: {type: String, required: true},
        equipInput2: {type: String, required: true},
        equipInput3: {type: String, required: false},
        equipInput4: {type: String, required: false},
        equipInput5: {type: String, required: true}
    },
    {_id: false}
);

// EvaliateWater schema for equipInputAll
const EquipInputAllSchema = new mongoose.Schema(
    {
        equipInput: [EquipInputSchema] // Array of EquipInputSchema
    },
    {_id: false}
);

const evaliateWaterSchemaStructure = {
    evaluateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewEvaluation'
    },
    equipInputAll: [EquipInputAllSchema] // Array of EquipInputAllSchema
};

const EvaliateWaterSchema = new mongoose.Schema(evaliateWaterSchemaStructure);

// Create model from the schema
const EvaliateWaterModelver2 = mongoose.model('EvaliateWaterver2', EvaliateWaterSchema);

module.exports = EvaliateWaterModelver2;
