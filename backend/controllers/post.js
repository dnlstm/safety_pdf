const Post = require('../schemas');
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const SVGtoPDF = require('svg-to-pdfkit');

const Water = require('../schemas/Water/Water');
const Water2 = require('../schemas/Water/Water2');
const Water3 = require('../schemas/Water/Water3');
const Water4 = require('../schemas/Water/water4');
const Water5 = require('../schemas/Water/water5');
const Water6 = require('../schemas/Water/water6');
const Water7 = require('../schemas/Water/water7');
const Water8 = require('../schemas/Water/water8');
const Water9 = require('../schemas/Water/water9');
const Water10 = require('../schemas/Water/water10');
const Water11 = require('../schemas/Water/water11');
const WaterAll = require('../schemas/Water/WaterAll');
const NewEvaluation = require('../schemas/NewEvaluation');
const EquipmentSituation = require('../schemas/EquipmentSituation');
const EvaliateWaterModel = require('../schemas/Water/EvaliateWater');
const Water12 = require('../schemas/Water/Water12');
const EvaliateWaterModelver2 = require('../schemas/V2Water/EvaliateWaterver2');
const V2Water5 = require('../schemas/V2Water/V2Water5');
const V2Water4 = require('../schemas/V2Water/V2Water4');
const V2Water3 = require('../schemas/V2Water/V2Water3');
const V2Water2 = require('../schemas/V2Water/V2Water2');
const V2Water = require('../schemas/V2Water/V2Water');
const V2WaterAll = require('../schemas/V2Water/V2WaterAll');
const EvaliateGas = require('../schemas/Gas/EvaliateGas');
const Gas = require('../schemas/Gas/Gas');
const Gas2 = require('../schemas/Gas/Gas2');
const Gas3 = require('../schemas/Gas/Gas3');
const Gas4 = require('../schemas/Gas/Gas4');
const GasAll = require('../schemas/Gas/GasAll');

// exports.afterUploadImage = (req, res) => {
//     const {id} = req.user;
//     const {filename} = req.file;

//     try {
//         fse.readdirSync(`uploads/tmp/${id}-uploads`);
//     } catch (error) {
//         console.error(`${id}-uploads 폴더가 없어 ${id}-uploads 폴더를 생성합니다.`);
//     }
//     // fse.copySync(`uploads/tmp/${id}-uploads/${filename}`, `uploads/save/${id}-uploads/${req.user._id}-project/${filename}`);

//     res.json({url: `/img/tmp/${id}-uploads/${filename}`});
// };

exports.newevaluation = async (req, res, next) => {
    const {buildingName, buildingAddress, buildingStructure, floorArea, buildingArea, groundFloor, baseFloor, mainUse, cirCularspeedUse} = req.body;

    let filename; // filename 변수를 선언합니다.

    if (req.file) {
        filename = req.file.filename; // filename 변수에 값을 할당합니다.
    }

    // const {adde} = req.body;
    try {
        // const username = adde.map((item) => item.info[0]);
        // const userid = adde.map((item) => item.info[1]);
        const user = await NewEvaluation.create({
            userid: {admin: 'admin', userid: req.user.id},

            buildingName,
            buildingAddress,
            buildingStructure,
            floorArea,
            buildingArea,
            groundFloor,
            baseFloor,
            mainUse,
            cirCularspeedUse,
            picture: req.file && `/uploads/picture/${filename}`
        });
        res.status(201).json(user);
        console.log('뉴평가 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.updateEvaluation = async (req, res, next) => {
    console.log(req.body);

    const {buildingName, buildingAddress, buildingStructure, floorArea, buildingArea, groundFloor, baseFloor, mainUse, cirCularspeedUse} = req.body;

    let filename; // filename 변수를 선언합니다.

    if (req.file) {
        filename = req.file.filename; // filename 변수에 값을 할당합니다.
    }

    try {
        const user = await NewEvaluation.updateOne(
            {_id: req.params.evaluateId},
            {
                buildingName,
                buildingAddress,
                buildingStructure,
                floorArea,
                buildingArea,
                groundFloor,
                baseFloor,
                mainUse,
                cirCularspeedUse,
                picture: req.file && `/uploads/picture/${filename}`
            }
        );
        res.status(200).json(user);
        console.log('평가 정보 업데이트 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
exports.evaluateSituation = async (req, res, next) => {
    try {
        const user = await NewEvaluation.find({_id: req.params.evaluateId});
        res.status(201).json(user);
        console.log('evaluateSituation 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.equipmentSituation = async (req, res, next) => {
    try {
        const user = await EquipmentSituation.find({evaluateId: req.params.evaluateId});
        res.status(201).json(user);
        console.log('EquipmentSituation 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.newEquipmentSituation = async (req, res, next) => {
    const equipmentData = {
        evaluateId: req.params.evaluateId
    };

    for (let i = 1; i <= 74; i++) {
        equipmentData[i] = {
            applicable: req.body[`applicable${i}`],
            specialSkill: req.body[`specialSkill${i}`],
            note: req.body[`note${i}`]
        };
    }

    try {
        const query = {evaluateId: req.params.evaluateId}; // 업데이트 또는 생성할 조건 (예시로 evaluateId 사용)
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};

        const user = await EquipmentSituation.findOneAndUpdate(query, equipmentData, options);
        res.status(201).json(user);
        console.log('뉴평가 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
exports.evaluateWater = async (req, res, next) => {
    const evaluateId = req.params.evaluateId;
    const {equipInputAll} = req.body;

    if (!Array.isArray(equipInputAll)) {
        return res.status(400).json({error: 'Invalid data format: equipInputAll must be an array'});
    }

    const evaluateWaterData = {
        evaluateId: evaluateId,
        equipInputAll: equipInputAll.map((group) => {
            if (!Array.isArray(group.equipInput)) {
                throw new Error('Invalid data format: equipInput must be an array');
            }
            return {
                equipInput: group.equipInput.map((input) => ({
                    equipInput: input.equipInput,
                    equipInput2: input.equipInput2,
                    equipInput3: input.equipInput3,
                    equipInput4: input.equipInput4,
                    equipInput5: input.equipInput5
                }))
            };
        })
    };

    try {
        const query = {evaluateId: evaluateId}; // 업데이트 또는 생성할 조건 (evaluateId 사용)
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};

        const user = await EvaliateWaterModel.findOneAndUpdate(query, evaluateWaterData, options);
        res.status(201).json(user);
        console.log('데이터 저장 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.evaluateWater2 = async (req, res, next) => {
    const evaluateId = req.params.evaluateId;

    try {
        const data = await EvaliateWaterModel.findOne({evaluateId: evaluateId});

        if (!data) {
            return res.status(404).json({error: 'Data not found'});
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.evaluateWaterver2 = async (req, res, next) => {
    const evaluateId = req.params.evaluateId;
    const {equipInputAll} = req.body;

    if (!Array.isArray(equipInputAll)) {
        return res.status(400).json({error: 'Invalid data format: equipInputAll must be an array'});
    }

    const evaluateWaterData = {
        evaluateId: evaluateId,
        equipInputAll: equipInputAll.map((group) => {
            if (!Array.isArray(group.equipInput)) {
                throw new Error('Invalid data format: equipInput must be an array');
            }
            return {
                equipInput: group.equipInput.map((input) => ({
                    equipInput: input.equipInput,
                    equipInput2: input.equipInput2,
                    equipInput3: input.equipInput3,
                    equipInput4: input.equipInput4,
                    equipInput5: input.equipInput5
                }))
            };
        })
    };

    try {
        const query = {evaluateId: evaluateId}; // 업데이트 또는 생성할 조건 (evaluateId 사용)
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};

        const user = await EvaliateWaterModelver2.findOneAndUpdate(query, evaluateWaterData, options);
        res.status(201).json(user);
        console.log('데이터 저장 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.evaluateWater2ver2 = async (req, res, next) => {
    const evaluateId = req.params.evaluateId;

    try {
        const data = await EvaliateWaterModelver2.findOne({evaluateId: evaluateId});

        if (!data) {
            return res.status(404).json({error: 'Data not found'});
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.evaluateGas = async (req, res, next) => {
    const evaluateId = req.params.evaluateId;
    const {equipInputAll} = req.body;

    if (!Array.isArray(equipInputAll)) {
        return res.status(400).json({error: 'Invalid data format: equipInputAll must be an array'});
    }

    const evaluateGasData = {
        evaluateId: evaluateId,
        equipInputAll: equipInputAll.map((group) => {
            if (!Array.isArray(group.equipInput)) {
                throw new Error('Invalid data format: equipInput must be an array');
            }
            return {
                equipInput: group.equipInput.map((input) => ({
                    equipInput: input.equipInput,
                    equipInput2: input.equipInput2,
                    equipInput3: input.equipInput3,
                    equipInput4: input.equipInput4,
                    equipInput5: input.equipInput5,
                    equipInput6: input.equipInput6,
                    equipInput7: input.equipInput7
                }))
            };
        })
    };

    try {
        const query = {evaluateId: evaluateId}; // 업데이트 또는 생성할 조건 (evaluateId 사용)
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};

        const user = await EvaliateGas.findOneAndUpdate(query, evaluateGasData, options);
        res.status(201).json(user);
        console.log('데이터 저장 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.evaluateGas2 = async (req, res, next) => {
    const evaluateId = req.params.evaluateId;

    try {
        const data = await EvaliateGas.findOne({evaluateId: evaluateId});

        if (!data) {
            return res.status(404).json({error: 'Data not found'});
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.getLatestData = async (req, res, next) => {
    try {
        const {id, page} = req.params;
        const pageIndex = parseInt(page, 10) - 1;
        const models = [Water, Water2, Water3, Water4, Water5, Water6, Water7, Water8, Water9, Water10, Water11, Water12];

        if (pageIndex >= 0 && pageIndex < models.length) {
            const Model = models[pageIndex];
            const latestData = await Model.findOne({author: id});

            if (!latestData) {
                return res.status(404).json({message: '데이터를 찾을 수 없습니다.'});
            }
            res.json(latestData);
        } else {
            res.status(400).json({error: '유효하지 않은 페이지 번호입니다.'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.V2getLatestData = async (req, res, next) => {
    try {
        const {id, page} = req.params;
        const pageIndex = parseInt(page, 10) - 1;
        const models = [V2Water, V2Water2, V2Water3, V2Water4, V2Water5];

        if (pageIndex >= 0 && pageIndex < models.length) {
            const Model = models[pageIndex];
            const latestData = await Model.findOne({author: id});

            if (!latestData) {
                return res.status(404).json({message: '데이터를 찾을 수 없습니다.'});
            }
            res.json(latestData);
        } else {
            res.status(400).json({error: '유효하지 않은 페이지 번호입니다.'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.getLatestGasData = async (req, res, next) => {
    try {
        const {id, page} = req.params;
        const pageIndex = parseInt(page, 10) - 1;
        const models = [Gas, Gas2, Gas3, Gas4];

        if (pageIndex >= 0 && pageIndex < models.length) {
            const Model = models[pageIndex];
            const latestData = await Model.findOne({author: id});

            if (!latestData) {
                return res.status(404).json({message: '데이터를 찾을 수 없습니다.'});
            }
            res.json(latestData);
        } else {
            res.status(400).json({error: '유효하지 않은 페이지 번호입니다.'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.evalafterUploadImage = async (req, res) => {
    const {evaluationItems, evaluationLocation, evaluationContent, evaluationResult, improvementResult, improvementContent, z} = req.body;
    const {picture1, picture2, newPicture1, newPicture2} = req.files;

    const transformChunks = (z) => {
        const result = [];
        for (let i = 0; i < z.length; i += 20) {
            const chunk = z.slice(i, i + 20);
            const newChunk = [];
            for (let j = 0; j < chunk.length; j += 4) {
                newChunk.push({
                    equipInput: chunk[j] || '',
                    equipInput2: chunk[j + 1] || '',
                    equipInput3: chunk[j + 2] || '',
                    equipInput4: chunk[j + 3] || ''
                });
            }
            result.push(newChunk);
        }
        return result;
    };

    const transformed = transformChunks(z);
    console.log(transformed);

    const uploadDir = `uploads/${req.params.id}-uploads/Water${req.params.page}`;
    const tempDir = `uploads/tmp/${req.params.id}-uploads/Water${req.params.page}`;
    const pageIndex = parseInt(req.params.page, 10) - 1;

    // 기존 업로드 디렉토리를 비웁니다
    fse.emptyDirSync(uploadDir);

    // 디렉토리 생성
    fse.ensureDirSync(tempDir);

    // 파일 복사
    fse.copySync(tempDir, uploadDir);

    // 모델 목록
    const models = [Water, Water2, Water3, Water4, Water5, Water6, Water7, Water8, Water9, Water10, Water11, Water12];

    // 페이지 인덱스가 유효한지 확인
    if (pageIndex >= 0 && pageIndex < models.length) {
        const Model = models[pageIndex];

        try {
            // 업데이트 객체 생성
            const updateData = {
                author: req.params.id,
                evaluationItems,
                evaluationLocation,
                evaluationContent,
                evaluationResult,
                improvementResult,
                improvementContent,
                picture1: picture1?.map((file) => ({
                    picture1: `/uploads/${req.params.id}-uploads/Water${req.params.page}/${file.filename}`
                })),
                picture2: picture2?.map((file) => ({
                    picture2: `/uploads/${req.params.id}-uploads/Water${req.params.page}/${file.filename}`
                })),
                newPicture1: newPicture1?.map((file) => ({
                    picture1: `/uploads/${req.params.id}-uploads/Water${req.params.page}/${file.filename}`
                })),
                newPicture2: newPicture2?.map((file) => ({
                    picture2: `/uploads/${req.params.id}-uploads/Water${req.params.page}/${file.filename}`
                }))
            };

            // Water10일 때 transformed 추가
            if (pageIndex === 9) {
                updateData.transformed = transformed;
            }

            // 평가 저장
            const reredata = await Model.replaceOne({author: req.params.id}, updateData, {upsert: true});

            console.log('reredatareredatareredata', reredata);

            // 성공 메시지 응답
            res.json(`${req.params.page} 등록완료`);

            // 임시 디렉토리 비우기
            fse.emptyDirSync(tempDir);
        } catch (error) {
            console.error('평가 저장 중 오류 발생:', error);
            res.status(500).json({error: '평가 저장 중 오류가 발생했습니다.'});
        }
    } else {
        res.status(400).json({error: '유효하지 않은 페이지 번호입니다.'});
    }
};

exports.V2evalafterUploadImage = async (req, res) => {
    const {evaluationItems, evaluationLocation, evaluationContent, evaluationResult, improvementResult, improvementContent} = req.body;
    const {picture1, picture2, newPicture1, newPicture2} = req.files;

    const uploadDir = `uploads/${req.params.id}-uploads/V2Water${req.params.page}`;
    const tempDir = `uploads/tmp/${req.params.id}-uploads/V2Water${req.params.page}`;
    const pageIndex = parseInt(req.params.page, 10) - 1;

    // 기존 업로드 디렉토리를 비웁니다
    fse.emptyDirSync(uploadDir);

    // 디렉토리 생성
    fse.ensureDirSync(tempDir);

    // 파일 복사
    fse.copySync(tempDir, uploadDir);

    // 모델 목록
    const models = [V2Water, V2Water2, V2Water3, V2Water4, V2Water5];

    // 페이지 인덱스가 유효한지 확인
    if (pageIndex >= 0 && pageIndex < models.length) {
        const Model = models[pageIndex];

        try {
            // 평가 저장
            const reredata = await Model.replaceOne(
                {author: req.params.id},
                {
                    author: req.params.id,
                    evaluationItems,
                    evaluationLocation,
                    evaluationContent,
                    evaluationResult,
                    improvementResult,
                    improvementContent,
                    picture1: picture1?.map((file) => ({
                        picture1: `/uploads/${req.params.id}-uploads/V2Water${req.params.page}/${file.filename}`
                    })),
                    picture2: picture2?.map((file) => ({
                        picture2: `/uploads/${req.params.id}-uploads/V2Water${req.params.page}/${file.filename}`
                    })),
                    newPicture1: newPicture1?.map((file) => ({
                        picture1: `/uploads/${req.params.id}-uploads/V2Water${req.params.page}/${file.filename}`
                    })),
                    newPicture2: newPicture2?.map((file) => ({
                        picture2: `/uploads/${req.params.id}-uploads/V2Water${req.params.page}/${file.filename}`
                    }))
                },
                {upsert: true}
            );

            console.log('reredatareredatareredata', reredata);

            // 성공 메시지 응답
            res.json(`${req.params.page} 등록완료`);

            // 임시 디렉토리 비우기
            fse.emptyDirSync(tempDir);
        } catch (error) {
            console.error('평가 저장 중 오류 발생:', error);
            res.status(500).json({error: '평가 저장 중 오류가 발생했습니다.'});
        }
    } else {
        res.status(400).json({error: '유효하지 않은 페이지 번호입니다.'});
    }
};

exports.evalafterUploadImage3 = async (req, res) => {
    const {evaluationItems, evaluationLocation, evaluationContent, evaluationResult, improvementResult, improvementContent} = req.body;
    const {picture1, picture2, newPicture1, newPicture2} = req.files;

    const uploadDir = `uploads/${req.params.id}-uploads/Gas${req.params.page}`;
    const tempDir = `uploads/tmp/${req.params.id}-uploads/Gas${req.params.page}`;
    const pageIndex = parseInt(req.params.page, 10) - 1;

    // 기존 업로드 디렉토리를 비웁니다
    fse.emptyDirSync(uploadDir);

    // 디렉토리 생성
    fse.ensureDirSync(tempDir);

    // 파일 복사
    fse.copySync(tempDir, uploadDir);

    // 모델 목록
    const models = [Gas, Gas2, Gas3, Gas4];

    // 페이지 인덱스가 유효한지 확인
    if (pageIndex >= 0 && pageIndex < models.length) {
        const Model = models[pageIndex];

        try {
            // 평가 저장
            const reredata = await Model.replaceOne(
                {author: req.params.id},
                {
                    author: req.params.id,
                    evaluationItems,
                    evaluationLocation,
                    evaluationContent,
                    evaluationResult,
                    improvementResult,
                    improvementContent,
                    picture1: picture1?.map((file) => ({
                        picture1: `/uploads/${req.params.id}-uploads/Gas${req.params.page}/${file.filename}`
                    })),
                    picture2: picture2?.map((file) => ({
                        picture2: `/uploads/${req.params.id}-uploads/Gas${req.params.page}/${file.filename}`
                    })),
                    newPicture1: newPicture1?.map((file) => ({
                        picture1: `/uploads/${req.params.id}-uploads/Gas${req.params.page}/${file.filename}`
                    })),
                    newPicture2: newPicture2?.map((file) => ({
                        picture2: `/uploads/${req.params.id}-uploads/Gas${req.params.page}/${file.filename}`
                    }))
                },
                {upsert: true}
            );

            console.log('reredatareredatareredata', reredata);

            // 성공 메시지 응답
            res.json(`${req.params.page} 등록완료`);

            // 임시 디렉토리 비우기
            fse.emptyDirSync(tempDir);
        } catch (error) {
            console.error('평가 저장 중 오류 발생:', error);
            res.status(500).json({error: '평가 저장 중 오류가 발생했습니다.'});
        }
    } else {
        res.status(400).json({error: '유효하지 않은 페이지 번호입니다.'});
    }
};

exports.updateWaterAll = async (req, res) => {
    try {
        const models = [Water, Water2, Water3, Water4, Water5, Water6, Water7, Water8, Water9, Water10, Water11, Water12];

        const waterData = await Promise.all(models.map((model) => model.find({author: req.params.id})));

        // 각 모델 데이터가 undefined일 경우 대비
        const updateData = {
            author: req.params.id,
            water: waterData[0]?.[0]?._id,
            water2: waterData[1]?.[0]?._id,
            water3: waterData[2]?.[0]?._id,
            water4: waterData[3]?.[0]?._id,
            water5: waterData[4]?.[0]?._id,
            water6: waterData[5]?.[0]?._id,
            water7: waterData[6]?.[0]?._id,
            water8: waterData[7]?.[0]?._id,
            water9: waterData[8]?.[0]?._id,
            water10: waterData[9]?.[0]?._id,
            water11: waterData[10]?.[0]?._id,
            water12: waterData[11]?.[0]?._id
        };

        await WaterAll.findOneAndUpdate({author: req.params.id}, updateData, {upsert: true, new: true, setDefaultsOnInsert: true});

        res.json(`${req.params.page} 등록완료`);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json('서버 오류가 발생했습니다.');
    }
};

exports.V2updateWaterAll = async (req, res) => {
    try {
        const models = [V2Water, V2Water2, V2Water3, V2Water4, V2Water5];

        const waterData = await Promise.all(models.map((model) => model.find({author: req.params.id})));

        // 각 모델 데이터가 undefined일 경우 대비
        const updateData = {
            author: req.params.id,
            water: waterData[0]?.[0]?._id,
            water2: waterData[1]?.[0]?._id,
            water3: waterData[2]?.[0]?._id,
            water4: waterData[3]?.[0]?._id,
            water5: waterData[4]?.[0]?._id
        };

        await V2WaterAll.findOneAndUpdate({author: req.params.id}, updateData, {upsert: true, new: true, setDefaultsOnInsert: true});

        res.json(`${req.params.page} 등록완료`);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json('서버 오류가 발생했습니다.');
    }
};

exports.updateGasAll = async (req, res) => {
    try {
        const models = [Gas, Gas2, Gas3, Gas4];

        const gasData = await Promise.all(models.map((model) => model.find({author: req.params.id})));

        // 각 모델 데이터가 undefined일 경우 대비
        const updateData = {
            author: req.params.id,
            gas: gasData[0]?.[0]?._id,
            gas2: gasData[1]?.[0]?._id,
            gas3: gasData[2]?.[0]?._id,
            gas4: gasData[3]?.[0]?._id
        };

        await GasAll.findOneAndUpdate({author: req.params.id}, updateData, {upsert: true, new: true, setDefaultsOnInsert: true});

        res.json(`${req.params.page} 등록완료`);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json('서버 오류가 발생했습니다.');
    }
};

exports.resultid = async (req, res, next) => {
    try {
        // const all = await WaterAll?.find({author: req.params.id}).populate(['water', 'water2', 'water3', 'water4', 'water5', 'water6', 'water7', 'water8', 'water9', 'water10']);

        const all = await WaterAll.aggregate([
            // {$match: {author: req.params.id}},
            {$match: {author: new mongoose.Types.ObjectId(req.params.id)}},
            // {$project: {_id: 0, author: 1, water: 1, water2: 1, water3: 1, water4: 1, water5: 1, water6: 1, water7: 1, water8: 1, water9: 1, water10: 1}},

            {
                $lookup: {
                    from: 'waters',
                    localField: 'water',
                    foreignField: '_id',
                    as: 'Water'
                }
            },
            {
                $lookup: {
                    from: 'water2',
                    localField: 'water2',
                    foreignField: '_id',
                    as: 'Water2'
                }
            },
            {
                $lookup: {
                    from: 'water3',
                    localField: 'water3',
                    foreignField: '_id',
                    as: 'Water3'
                }
            },
            {
                $lookup: {
                    from: 'water4',
                    localField: 'water4',
                    foreignField: '_id',
                    as: 'Water4'
                }
            },
            {
                $lookup: {
                    from: 'water5',
                    localField: 'water5',
                    foreignField: '_id',
                    as: 'Water5'
                }
            },
            {
                $lookup: {
                    from: 'water6',
                    localField: 'water6',
                    foreignField: '_id',
                    as: 'Water6'
                }
            },
            {
                $lookup: {
                    from: 'water7',
                    localField: 'water7',
                    foreignField: '_id',
                    as: 'Water7'
                }
            },
            {
                $lookup: {
                    from: 'water8',
                    localField: 'water8',
                    foreignField: '_id',
                    as: 'Water8'
                }
            },
            {
                $lookup: {
                    from: 'water9',
                    localField: 'water9',
                    foreignField: '_id',
                    as: 'Water9'
                }
            },
            {
                $lookup: {
                    from: 'water10',
                    localField: 'water10',
                    foreignField: '_id',
                    as: 'Water10'
                }
            },
            {$project: {_id: 0, author: 1, Water: 1, Water2: 1, Water3: 1, Water4: 1, Water5: 1, Water6: 1, Water7: 1, Water8: 1, Water9: 1, Water10: 1}}
        ]);
        // console.log('allallall', all);
        // console.log('allallall0000', all[0]);

        res.json(all[0]);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            img: req.body.url
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN = 30;
const BOX_MARGIN = 20;
const MARGIN = PAGE_MARGIN + BOX_MARGIN;
const CONTENTS_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const CONTENTS_HEIGHT = PAGE_HEIGHT - PAGE_MARGIN * 2;
const CONTENTS_END_X = PAGE_WIDTH - PAGE_MARGIN;
const CONTENTS_END_Y = PAGE_HEIGHT - PAGE_MARGIN;
const ROW_HEIGHT = 30;
const IMG_HEIGHT = 267;
const HEADER_HEIGHT = 30;

let PAGE_NUM = 0;

// 로고 추가 함수
const logo = (doc) => {
    doc.image('img/mark.png', 250, 680, {fit: [100, 100]});
    doc.font('Pretendard-Bold').fontSize(20).fill('#000000');
    doc.text('공간안전인증원', MARGIN, 765, {align: 'center'});
};

// 헤더 타이틀 추가 함수
const headTitle = (doc, title) => {
    doc.roundedRect(PAGE_MARGIN, PAGE_MARGIN, CONTENTS_WIDTH, 33, 8).fill('#1c1678');
    doc.font('Pretendard-Bold').fontSize(20).fill('#ffffff');
    doc.text(title, PAGE_MARGIN, PAGE_MARGIN + 4, {align: 'center'});
};

// 서브 타이틀 추가 함수
const subTitle = (doc, title, y) => {
    doc.rect(PAGE_MARGIN, y, CONTENTS_WIDTH, 25).fill('#c9c9c9');
    doc.font('Pretendard-Bold').fontSize(13).fill('#000000');
    doc.text(title, PAGE_MARGIN, y + 4, {align: 'center'});
    doc.moveTo(PAGE_MARGIN, y)
        .lineTo(CONTENTS_END_X, y)
        .moveTo(PAGE_MARGIN, y + 25)
        .lineTo(CONTENTS_END_X, y + 25)
        .undash()
        .stroke('#000000');
};

// Score Title
const scoreTitle = (doc, title, y) => {
    doc.rect(PAGE_MARGIN, y, CONTENTS_WIDTH, 20).fill('#d9d9d9');
    doc.moveTo(PAGE_MARGIN, y + 20)
        .lineTo(CONTENTS_END_X, y + 20)
        .stroke('#d9d9d9');

    doc.font('Pretendard-Bold').fontSize(11).fill('#000000');
    doc.text(title, PAGE_MARGIN + 5, y + 4, {width: CONTENTS_END_X});
};

// 페이지 번호 추가 함수
const pageNum = (doc) => {
    doc.font('Pretendard').fontSize(10).fill('#000000');
    doc.text(`- ${++PAGE_NUM} -`, PAGE_MARGIN, 820, {align: 'center'});
};

const addNewPage = (doc) => {
    doc.addPage({size: 'A4', margins: {top: MARGIN, left: MARGIN, right: MARGIN, bottom: 0}});

    pageNum(doc);
};

const waterAllData = () => {};

// PDF 생성 함수
exports.createPdf = async (id) => {
    const dir = path.join(__dirname, `../uploads/${id}-uploads/pdf`);
    const pdfPath = path.join(dir, `${id}.pdf`);

    PAGE_NUM = 0;

    try {
        fse.emptyDirSync(dir);

        const doc = new PDFDocument({
            size: 'A4',
            margin: MARGIN
        });

        doc.pipe(fs.createWriteStream(pdfPath));

        // 폰트 등록
        doc.registerFont('Pretendard', 'font/Pretendard-Regular.ttf');
        doc.registerFont('Pretendard-Bold', 'font/Pretendard-Bold.ttf');

        // 데이터베이스에서 데이터 가져오기
        const all = await WaterAll?.aggregate([
            {$match: {author: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: 'waters',
                    localField: 'water',
                    foreignField: '_id',
                    as: 'Water'
                }
            },
            {
                $lookup: {
                    from: 'water2',
                    localField: 'water2',
                    foreignField: '_id',
                    as: 'Water2'
                }
            },
            {
                $lookup: {
                    from: 'water3',
                    localField: 'water3',
                    foreignField: '_id',
                    as: 'Water3'
                }
            },
            {
                $lookup: {
                    from: 'water4',
                    localField: 'water4',
                    foreignField: '_id',
                    as: 'Water4'
                }
            },
            {
                $lookup: {
                    from: 'water5',
                    localField: 'water5',
                    foreignField: '_id',
                    as: 'Water5'
                }
            },
            {
                $lookup: {
                    from: 'water6',
                    localField: 'water6',
                    foreignField: '_id',
                    as: 'Water6'
                }
            },
            {
                $lookup: {
                    from: 'water7',
                    localField: 'water7',
                    foreignField: '_id',
                    as: 'Water7'
                }
            },
            {
                $lookup: {
                    from: 'water8',
                    localField: 'water8',
                    foreignField: '_id',
                    as: 'Water8'
                }
            },
            {
                $lookup: {
                    from: 'water9',
                    localField: 'water9',
                    foreignField: '_id',
                    as: 'Water9'
                }
            },
            {
                $lookup: {
                    from: 'water10',
                    localField: 'water10',
                    foreignField: '_id',
                    as: 'Water10'
                }
            },
            {
                $lookup: {
                    from: 'water11',
                    localField: 'water11',
                    foreignField: '_id',
                    as: 'Water11'
                }
            },
            {
                $lookup: {
                    from: 'water12',
                    localField: 'water12',
                    foreignField: '_id',
                    as: 'Water12'
                }
            },
            {$project: {_id: 0, author: 1, Water: 1, Water2: 1, Water3: 1, Water4: 1, Water5: 1, Water6: 1, Water7: 1, Water8: 1, Water9: 1, Water10: 1, Water11: 1, Water12: 1}}
        ]);

        if (!all || all.length === 0) {
            console.warn('WaterAll 데이터가 없습니다.');
        }

        const data = all[0];

        const all2 = await V2WaterAll?.aggregate([
            {$match: {author: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: 'v2waters',
                    localField: 'water',
                    foreignField: '_id',
                    as: 'v2Water'
                }
            },
            {
                $lookup: {
                    from: 'v2water2',
                    localField: 'water2',
                    foreignField: '_id',
                    as: 'v2Water2'
                }
            },
            {
                $lookup: {
                    from: 'v2water3',
                    localField: 'water3',
                    foreignField: '_id',
                    as: 'v2Water3'
                }
            },
            {
                $lookup: {
                    from: 'v2water4',
                    localField: 'water4',
                    foreignField: '_id',
                    as: 'v2Water4'
                }
            },
            {
                $lookup: {
                    from: 'v2water5',
                    localField: 'water5',
                    foreignField: '_id',
                    as: 'v2Water5'
                }
            },
            {$project: {_id: 0, author: 1, v2Water: 1, v2Water2: 1, v2Water3: 1, v2Water4: 1, v2Water5: 1}}
        ]);

        if (!all2 || all2.length === 0) {
            console.warn('WaterAll2 데이터가 없습니다.');
        }

        const data2 = all2[0];

        const all3 = await GasAll?.aggregate([
            {$match: {author: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: 'gas',
                    localField: 'gas',
                    foreignField: '_id',
                    as: 'Gas'
                }
            },
            {
                $lookup: {
                    from: 'gas2',
                    localField: 'gas2',
                    foreignField: '_id',
                    as: 'Gas2'
                }
            },
            {
                $lookup: {
                    from: 'gas3',
                    localField: 'gas3',
                    foreignField: '_id',
                    as: 'Gas3'
                }
            },
            {
                $lookup: {
                    from: 'gas4',
                    localField: 'gas4',
                    foreignField: '_id',
                    as: 'Gas4'
                }
            },
            {$project: {_id: 0, author: 1, Gas: 1, Gas2: 1, Gas3: 1, Gas4: 1}}
        ]);

        if (!all3 || all3.length === 0) {
            console.warn('WaterAll3 데이터가 없습니다.');
        }

        const data3 = all3[0];

        const newEvaluation = await NewEvaluation?.findOne({_id: id});

        const {createdAt, updatedAt, buildingName, buildingAddress, buildingStructure, floorArea, buildingArea, groundFloor, baseFloor, mainUse, cirCularspeedUse, picture} = newEvaluation;

        const equipmentSituation = await EquipmentSituation?.findOne({evaluateId: id});

        const evaliateWaterModel = await EvaliateWaterModel.findOne({evaluateId: id});
        const evaliateWaterModel2 = await EvaliateWaterModelver2.findOne({evaluateId: id});
        const evaliateGas = await EvaliateGas.findOne({evaluateId: id});

        // 커버 페이지, 요약 페이지, 점수 페이지 등을 작성하는 함수 호출
        addCoverPage(doc, '공간', createdAt, updatedAt, buildingName, '구역명', '공간명');
        addBuildingSituation(doc, buildingName, buildingAddress, buildingStructure, floorArea, buildingArea, groundFloor, baseFloor, mainUse, cirCularspeedUse, picture);

        if (equipmentSituation) {
            addEquipSituation(doc, equipmentSituation);
            addEquipSituation2(doc, equipmentSituation);
            addEquipSituation3(doc, equipmentSituation);
        } else {
            console.warn('equipmentSituation is null or undefined');
        }

        if (evaliateWaterModel?.equipInputAll) {
            addWaterResult(doc, evaliateWaterModel?.equipInputAll);
        } else {
            console.warn('evaliateWaterModel is null or undefined');
        }

        // Water 데이터 기반으로 PDF 내용 추가
        const waterData = [...(all[0]?.Water || []), ...(all[0]?.Water2 || []), ...(all[0]?.Water3 || []), ...(all[0]?.Water4 || []), ...(all[0]?.Water5 || []), ...(all[0]?.Water6 || []), ...(all[0]?.Water7 || []), ...(all[0]?.Water8 || []), ...(all[0]?.Water9 || []), ...(all[0]?.Water10 || []), ...(all[0]?.Water11 || []), ...(all[0]?.Water12 || [])];

        waterData.forEach((item) => {
            addWaterTestResult(doc, item?.evaluationItems, item?.evaluationLocation, item?.picture1, item?.picture2, item?.evaluationContent, item?.evaluationResult, item?.improvementResult, item?.newPicture1, item?.newPicture2, item?.improvementContent, item?.transformed);
        });
        // addWaterResult2(doc, equipInputAll);
        if (evaliateWaterModel2?.equipInputAll) {
            addWaterResult2(doc, evaliateWaterModel2?.equipInputAll);
        } else {
            console.warn('evaliateWaterModel2 is null or undefined');
        }
        // Water 데이터 기반으로 PDF 내용 추가

        const waterData2 = [...(all2[0]?.v2Water || []), ...(all2[0]?.v2Water2 || []), ...(all2[0]?.v2Water3 || []), ...(all2[0]?.v2Water4 || []), ...(all2[0]?.v2Water5 || [])];

        waterData2.forEach((item) => {
            addWaterTestResult2(doc, item?.evaluationItems, item?.evaluationLocation, item?.picture1, item?.picture2, item?.evaluationContent, item?.evaluationResult, item?.improvementResult, item?.newPicture1, item?.newPicture2, item?.improvementContent);
        });

        if (evaliateGas?.equipInputAll) {
            addWaterResult3(doc, evaliateGas?.equipInputAll);
        } else {
            console.warn('evaliateGas is null or undefined');
        }

        // Water 데이터 기반으로 PDF 내용 추가

        const waterData3 = [...(all3[0]?.Gas || []), ...(all3[0]?.Gas2 || []), ...(all3[0]?.Gas3 || []), ...(all3[0]?.Gas4 || [])];

        waterData3.forEach((item) => {
            addWaterTestResult3(doc, item?.evaluationItems, item?.evaluationLocation, item?.picture1, item?.picture2, item?.evaluationContent, item?.evaluationResult, item?.improvementResult, item?.newPicture1, item?.newPicture2, item?.improvementContent);
        });

        doc.end();

        return pdfPath;
    } catch (error) {
        console.error('Error creating PDF:', error);
        throw error;
    }
};

// 커버 페이지 추가 함수
const addCoverPage = (doc, contents, creationDate, updateDateTime, buildingName, areaName, placeName) => {
    const creationDate1 = new Date(creationDate);
    const updateDateTime1 = new Date(updateDateTime);

    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};

    const formattedCreationDate = creationDate1.toLocaleDateString('ko-KR', options);
    const formattedUpdateDateTime = updateDateTime1.toLocaleDateString('ko-KR', options);

    doc.rect(PAGE_MARGIN, PAGE_MARGIN, CONTENTS_WIDTH, CONTENTS_HEIGHT).stroke('#000000');

    doc.font('Pretendard').fontSize(35).fill('#000000');
    doc.text(`${contents}안전인증원 보고서`, 50, 130, {align: 'center'});
    doc.moveTo(50, 100).lineTo(545.28, 100).moveTo(50, 200).lineTo(545.28, 200).stroke('#000000');

    doc.font('Pretendard').fontSize(12).fill('#000000');
    doc.text(`- 안전관리 평가 -`, 50, 180, {align: 'center'});

    doc.font('Pretendard').fontSize(13).fill('#000000');
    doc.text(`${formattedCreationDate} ~ ${formattedUpdateDateTime}`, 50, 220, {align: 'center'});

    doc.font('Pretendard-Bold').fontSize(18).fill('#000000');
    doc.text(buildingName, 50, 540, {width: CONTENTS_WIDTH - 40, align: 'center'});

    logo(doc);
};

// 요약 페이지 추가 함수
const addBuildingSituation = (doc, buildingName, buildingAddress, buildingStructure, floorArea, buildingArea, groundFloor, baseFloor, mainUse, cirCularspeedUse, picture) => {
    addNewPage(doc);

    // 기본 값 설정
    buildingName = buildingName || '';
    buildingAddress = buildingAddress || '';
    buildingStructure = buildingStructure || '';
    floorArea = floorArea || '';
    buildingArea = buildingArea || '';
    groundFloor = groundFloor || '';
    baseFloor = baseFloor || '';
    mainUse = mainUse || '';
    cirCularspeedUse = cirCularspeedUse || '';
    picture = picture || '';

    // pageNum(doc);
    doc.font('Pretendard').fontSize(20).fill('#000000');
    headTitle(doc, `건축물 현황`);

    subTitle(doc, '사업장 전경 사진', 425);
    if (picture && picture.trim() !== '') {
        try {
            doc.image(picture?.slice(1), PAGE_MARGIN + 0.5, 451, {width: CONTENTS_WIDTH, height: 338});
        } catch (error) {
            console.error('Error adding image:', error);
        }
    }

    // 표 헤더 & 푸터 라인
    doc.moveTo(PAGE_MARGIN, 90)
        .lineTo(CONTENTS_END_X, 90)
        .moveTo(PAGE_MARGIN, 395)
        .lineTo(CONTENTS_END_X, 395)
        .moveTo(PAGE_MARGIN, 790)
        .lineTo(CONTENTS_END_X + 0.5, 790)
        .stroke('#000000');

    //내부 선
    const startY = 124;
    const endY = 395;

    for (let pos = startY; pos <= endY; pos += ROW_HEIGHT + 4) {
        doc.moveTo(PAGE_MARGIN + 80, pos).lineTo(CONTENTS_END_X, pos);
    }
    doc.stroke('#d9d9d9');

    // 점수집계 및 진단의견 표 열
    doc.moveTo(PAGE_MARGIN + 80, 90)
        .lineTo(PAGE_MARGIN + 80, 395)
        .moveTo(PAGE_MARGIN + 160, 90)
        .lineTo(PAGE_MARGIN + 160, 395)
        .stroke('#000000');

    // Text
    doc.font('Pretendard').fontSize(10).fill('#000000');
    doc.text('건축물현황', PAGE_MARGIN + 5, 101 + 34 * 4, {width: 70, align: 'center'});

    doc.text('사업장명', PAGE_MARGIN + 85, 101 + 34 * 0, {width: 70, align: 'right'});
    doc.text('건축물소재지', PAGE_MARGIN + 85, 101 + 34 * 1, {width: 70, align: 'right'});
    doc.text('건물구조', PAGE_MARGIN + 85, 101 + 34 * 2, {width: 70, align: 'right'});
    doc.text('연면적', PAGE_MARGIN + 85, 101 + 34 * 3, {width: 70, align: 'right'});
    doc.text('건축면적', PAGE_MARGIN + 85, 101 + 34 * 4, {width: 70, align: 'right'});
    doc.text('지상층수', PAGE_MARGIN + 85, 101 + 34 * 5, {width: 70, align: 'right'});
    doc.text('지하층수', PAGE_MARGIN + 85, 101 + 34 * 6, {width: 70, align: 'right'});
    doc.text('주용도', PAGE_MARGIN + 85, 101 + 34 * 7, {width: 70, align: 'right'});
    doc.text('주속용도', PAGE_MARGIN + 85, 101 + 34 * 8, {width: 70, align: 'right'});

    doc.text(buildingName, PAGE_MARGIN + 168, 101 + 34 * 0);
    doc.text(buildingAddress, PAGE_MARGIN + 168, 101 + 34 * 1);
    doc.text(buildingStructure, PAGE_MARGIN + 168, 101 + 34 * 2);
    doc.text(floorArea, PAGE_MARGIN + 168, 101 + 34 * 3);
    doc.text(buildingArea, PAGE_MARGIN + 168, 101 + 34 * 4);
    doc.text(groundFloor, PAGE_MARGIN + 168, 101 + 34 * 5);
    doc.text(baseFloor, PAGE_MARGIN + 168, 101 + 34 * 6);
    doc.text(mainUse, PAGE_MARGIN + 168, 101 + 34 * 7);
    doc.text(cirCularspeedUse, PAGE_MARGIN + 168, 101 + 34 * 8);
};

// 점수 페이지 추가 함수
const addEquipSituation = (doc, equipmentSituation) => {
    addNewPage(doc);

    // pageNum(doc);

    doc.font('Pretendard').fontSize(20).fill('#000000');
    headTitle(doc, `소화설비 현황`);

    // 점수집계 및 진단의견 표 헤더
    doc.rect(PAGE_MARGIN, 90, CONTENTS_WIDTH, 40).fill('#f9f9f9');

    //내부 공통선
    const startY = 160;
    const endY = 790;

    for (let pos = startY; pos <= endY; pos += ROW_HEIGHT) {
        doc.moveTo(PAGE_MARGIN + 165, pos).lineTo(CONTENTS_END_X, pos);
    }
    doc.stroke('#d9d9d9');

    //내부 선택선
    doc.moveTo(PAGE_MARGIN, 160 + 11 * 30)
        .lineTo(CONTENTS_END_X, 160 + 11 * 30)
        .moveTo(PAGE_MARGIN + 165, 130)
        .lineTo(PAGE_MARGIN + 165, 130 + 6 * 30)
        .moveTo(PAGE_MARGIN + 165, 130 + 8 * 30)
        .lineTo(PAGE_MARGIN + 165, 130 + 16 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 4 * 30)
        .lineTo(CONTENTS_END_X, 130 + 4 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 6 * 30)
        .lineTo(CONTENTS_END_X, 130 + 6 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 7 * 30)
        .lineTo(CONTENTS_END_X, 130 + 7 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 8 * 30)
        .lineTo(CONTENTS_END_X, 130 + 8 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 16 * 30)
        .lineTo(CONTENTS_END_X, 130 + 16 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 17 * 30)
        .lineTo(CONTENTS_END_X, 130 + 17 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 18 * 30)
        .lineTo(CONTENTS_END_X, 130 + 18 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 19 * 30)
        .lineTo(CONTENTS_END_X, 130 + 19 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 20 * 30)
        .lineTo(CONTENTS_END_X, 130 + 20 * 30)
        .moveTo(PAGE_MARGIN + 80, 130 + 21 * 30)
        .lineTo(CONTENTS_END_X, 130 + 21 * 30)
        .stroke('#d9d9d9');

    // 점수집계 및 진단의견 표 열
    doc.moveTo(PAGE_MARGIN + 80, 90)
        .lineTo(PAGE_MARGIN + 80, 790)
        .moveTo(PAGE_MARGIN + 240, 90)
        .lineTo(PAGE_MARGIN + 240, 790)
        .moveTo(PAGE_MARGIN + 320, 90)
        .lineTo(PAGE_MARGIN + 320, 790)
        .moveTo(PAGE_MARGIN + 400, 90)
        .lineTo(PAGE_MARGIN + 400, 790)
        .stroke('#000000');

    // 점수집계 및 진단의견 표 헤더 & 푸터 라인
    doc.moveTo(PAGE_MARGIN, 130).lineTo(CONTENTS_END_X, 130).moveTo(PAGE_MARGIN, 790).lineTo(CONTENTS_END_X, 790).stroke('#000000');

    // 점수집계 및 진단의견 데이터
    // x의 끝 565
    doc.font('Pretendard-Bold').fontSize(10).fill('#000000');
    doc.text('항목', PAGE_MARGIN + 5, 105, {width: 70, align: 'center'});
    doc.text('소활설비명', PAGE_MARGIN + 85, 105, {width: 240 - 85, align: 'center'});
    doc.text('해당여부', PAGE_MARGIN + 245, 105, {width: 70, align: 'center'});
    doc.text('특기사항', PAGE_MARGIN + 325, 105, {width: 70, align: 'center'});
    doc.text('비고', PAGE_MARGIN + 405, 105, {width: CONTENTS_END_X - 440, align: 'center'});

    doc.font('Pretendard').fontSize(10).fill('#000000');
    doc.text('소화설비', PAGE_MARGIN + 5, 304, {width: 70, align: 'center'});
    doc.text('물분무 소화설비', PAGE_MARGIN + 5, 635, {width: 70, align: 'center'});

    doc.text('소화기구', PAGE_MARGIN + 85, 185, {width: 75, align: 'center'});
    doc.text('수동식소화기구', PAGE_MARGIN + 168, 140.5, {width: 68, align: 'center'});
    doc.text('자동식소화기구', PAGE_MARGIN + 168, 140.5 + 30, {width: 68, align: 'center'});
    doc.text('자동소화장치', PAGE_MARGIN + 168, 140.5 + 2 * 30, {width: 68, align: 'center'});
    doc.text('간이소화장치', PAGE_MARGIN + 168, 140.5 + 3 * 30, {width: 68, align: 'center'});

    doc.text('옥내소화전설비', PAGE_MARGIN + 85, 274, {width: 75, align: 'center'});
    doc.text('호스', PAGE_MARGIN + 168, 140.5 + 4 * 30, {width: 68, align: 'center'});
    doc.text('호스릴', PAGE_MARGIN + 168, 140.5 + 5 * 30, {width: 68, align: 'center'});

    doc.text('간이스프링클러설비', PAGE_MARGIN + 85, 304 + 15, {width: 147, align: 'center'});
    doc.text('옥외소화전설비', PAGE_MARGIN + 85, 335 + 15, {width: 147, align: 'center'});

    doc.text('스프링클러설비', PAGE_MARGIN + 85, 335 + 90, {width: 75, align: 'center'});
    doc.text('습식', PAGE_MARGIN + 168, 140.5 + 8 * 30, {width: 68, align: 'center'});
    doc.text('건식', PAGE_MARGIN + 168, 140.5 + 9 * 30, {width: 68, align: 'center'});
    doc.text('준비작동식', PAGE_MARGIN + 168, 140.5 + 10 * 30, {width: 68, align: 'center'});
    doc.text('일제살수식', PAGE_MARGIN + 168, 140.5 + 11 * 30, {width: 68, align: 'center'});

    doc.text('포소화설비', PAGE_MARGIN + 85, 335 + 90 + 120, {width: 75, align: 'center'});
    doc.text('포소화전', PAGE_MARGIN + 168, 140.5 + 12 * 30, {width: 68, align: 'center'});
    doc.text('포헤드', PAGE_MARGIN + 168, 140.5 + 13 * 30, {width: 68, align: 'center'});
    doc.text('포워터스프링클러', PAGE_MARGIN + 168, 140.5 + 14 * 30);
    doc.text('고정포방출설비', PAGE_MARGIN + 168, 140.5 + 15 * 30);

    doc.text('이산화탄소소화설비', PAGE_MARGIN + 85, 335 + 4 * 30 + 45 + 120, {width: 147, align: 'center'});
    doc.text('할론소화설비', PAGE_MARGIN + 85, 335 + 5 * 30 + 45 + 120, {width: 147, align: 'center'});
    doc.text('할로겐화합물/불활성기체', PAGE_MARGIN + 85, 335 + 6 * 30 + 45 + 120, {width: 147, align: 'center'});
    doc.text('고체에어로졸', PAGE_MARGIN + 85, 335 + 7 * 30 + 45 + 120, {width: 147, align: 'center'});
    doc.text('물분무 · 미분무소화설비', PAGE_MARGIN + 85, 335 + 8 * 30 + 45 + 120, {width: 147, align: 'center'});
    doc.text('분말 · 소화설비', PAGE_MARGIN + 85, 335 + 9 * 30 + 45 + 120, {width: 147, align: 'center'});

    // for (let i = 1; i < 23; i++) {
    //     const y = 140 + i * 30;
    //     doc.text(equipmentSituation[i]?.applicable ? equipmentSituation[i]?.applicable : '', PAGE_MARGIN + 245, y, {width: 70, align: 'center'});
    //     doc.text(equipmentSituation[i]?.specialSkill ? equipmentSituation[i]?.specialSkill : '', PAGE_MARGIN + 325, y, {width: 70, align: 'center'});
    //     doc.text(equipmentSituation[i]?.note ? equipmentSituation[i]?.note : '', PAGE_MARGIN + 405, y, {width: 100});
    // }

    if (equipmentSituation) {
        for (let i = 1; i < 23; i++) {
            const y = 140 + (i - 1) * 30;
            doc.text(equipmentSituation[i]?.applicable ? '해당' : '해당 없음', PAGE_MARGIN + 245, y, {width: 70, align: 'center'});
            doc.text(equipmentSituation[i]?.specialSkill ? '해당' : '해당 없음', PAGE_MARGIN + 325, y, {width: 70, align: 'center'});
            doc.text(equipmentSituation[i]?.note ? equipmentSituation[i]?.note : '해당 없음', PAGE_MARGIN + 405, y, {width: 100});
        }
    } else {
        console.error('equipmentSituation is null or undefined');
    }
};

// 점수 페이지 추가 함수2
const addEquipSituation2 = (doc, equipmentSituation) => {
    addNewPage(doc);

    // pageNum(doc);

    // 점수집계 및 진단의견 표 헤더
    doc.rect(PAGE_MARGIN, 30, CONTENTS_WIDTH, 30).fill('#f9f9f9');

    const startY = 85;
    const endY = 820;

    for (let pos = startY; pos <= endY; pos += 26) {
        doc.moveTo(PAGE_MARGIN + 165, pos).lineTo(CONTENTS_END_X, pos);
    }
    doc.stroke('#d9d9d9');

    doc.moveTo(PAGE_MARGIN + 165, 59 + 8 * 26)
        .lineTo(PAGE_MARGIN + 165, 59 + 19 * 26)
        .moveTo(PAGE_MARGIN + 165, 59 + 21 * 26)
        .lineTo(PAGE_MARGIN + 165, 59 + 25 * 26)
        .moveTo(PAGE_MARGIN, 59 + 8 * 26)
        .lineTo(CONTENTS_END_X, 59 + 8 * 26)
        .moveTo(PAGE_MARGIN, 59 + 19 * 26)
        .lineTo(CONTENTS_END_X, 59 + 19 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 1 * 26)
        .lineTo(CONTENTS_END_X, 59 + 1 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 2 * 26)
        .lineTo(CONTENTS_END_X, 59 + 2 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 3 * 26)
        .lineTo(CONTENTS_END_X, 59 + 3 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 4 * 26)
        .lineTo(CONTENTS_END_X, 59 + 4 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 5 * 26)
        .lineTo(CONTENTS_END_X, 59 + 5 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 6 * 26)
        .lineTo(CONTENTS_END_X, 59 + 6 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 7 * 26)
        .lineTo(CONTENTS_END_X, 59 + 7 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 8 * 26)
        .lineTo(CONTENTS_END_X, 59 + 8 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 11 * 26)
        .lineTo(CONTENTS_END_X, 59 + 11 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 17 * 26)
        .lineTo(CONTENTS_END_X, 59 + 17 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 20 * 26)
        .lineTo(CONTENTS_END_X, 59 + 20 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 21 * 26)
        .lineTo(CONTENTS_END_X, 59 + 21 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 23 * 26)
        .lineTo(CONTENTS_END_X, 59 + 23 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 25 * 26)
        .lineTo(CONTENTS_END_X, 59 + 25 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 26 * 26)
        .lineTo(CONTENTS_END_X, 59 + 26 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 27 * 26)
        .lineTo(CONTENTS_END_X, 59 + 27 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 28 * 26)
        .lineTo(CONTENTS_END_X, 59 + 28 * 26)
        .stroke('#d9d9d9');

    // 점수집계 및 진단의견 표 열
    doc.moveTo(PAGE_MARGIN + 80, 30)
        .lineTo(PAGE_MARGIN + 80, 813)
        .moveTo(PAGE_MARGIN + 240, 30)
        .lineTo(PAGE_MARGIN + 240, 813)
        .moveTo(PAGE_MARGIN + 320, 30)
        .lineTo(PAGE_MARGIN + 320, 813)
        .moveTo(PAGE_MARGIN + 400, 30)
        .lineTo(PAGE_MARGIN + 400, 813)
        .stroke('#000000');

    // 점수집계 및 진단의견 표 헤더 & 푸터 라인
    doc.moveTo(PAGE_MARGIN, 60).lineTo(CONTENTS_END_X, 60).moveTo(PAGE_MARGIN, 813).lineTo(CONTENTS_END_X, 813).stroke('#000000');

    // 점수집계 및 진단의견 데이터
    // x의 끝 565
    doc.font('Pretendard-Bold').fontSize(10).fill('#000000');
    doc.text('항목', PAGE_MARGIN + 5, 40, {width: 70, align: 'center'});
    doc.text('소활설비명', PAGE_MARGIN + 85, 40, {width: 240 - 85, align: 'center'});
    doc.text('해당여부', PAGE_MARGIN + 245, 40, {width: 70, align: 'center'});
    doc.text('특기사항', PAGE_MARGIN + 325, 40, {width: 70, align: 'center'});
    doc.text('비고', PAGE_MARGIN + 405, 40, {width: CONTENTS_END_X - 440, align: 'center'});

    doc.font('Pretendard').fontSize(10).fill('#000000');
    doc.text('경보설비', PAGE_MARGIN + 5, 55 + 4 * 26, {width: 70, align: 'center'});
    doc.text('피난설비', PAGE_MARGIN + 5, 55 + 13 * 26 + 13, {width: 70, align: 'center'});
    doc.text('소화활동', PAGE_MARGIN + 5, 55 + 24 * 26, {width: 70, align: 'center'});

    doc.text('비상방송설비', PAGE_MARGIN + 85, 30 + 36 + 0 * 26, {width: 147, align: 'center'});
    doc.text('비상경보설비', PAGE_MARGIN + 85, 30 + 36 + 1 * 26, {width: 147, align: 'center'});
    doc.text('단독경보형감지기', PAGE_MARGIN + 85, 30 + 36 + 2 * 26, {width: 147, align: 'center'});
    doc.text('누전경보기', PAGE_MARGIN + 85, 30 + 36 + 3 * 26, {width: 147, align: 'center'});
    doc.text('자동화재탐지설비', PAGE_MARGIN + 85, 30 + 36 + 4 * 26, {width: 147, align: 'center'});
    doc.text('시각경보기', PAGE_MARGIN + 85, 30 + 36 + 5 * 26, {width: 147, align: 'center'});
    doc.text('자동화재속보설비', PAGE_MARGIN + 85, 30 + 36 + 6 * 26, {width: 147, align: 'center'});
    doc.text('가스누설경보기', PAGE_MARGIN + 85, 30 + 36 + 7 * 26, {width: 147, align: 'center'});

    doc.text('피난기구', PAGE_MARGIN + 85, 30 + 36 + 9 * 26, {width: 75, align: 'center'});
    doc.text('공기안전매트', PAGE_MARGIN + 168, 30 + 36 + 8 * 26, {width: 68, align: 'center'});
    doc.text('인명구조기구', PAGE_MARGIN + 168, 30 + 36 + 9 * 26, {width: 68, align: 'center'});
    doc.text('완강기 등 기타', PAGE_MARGIN + 168, 30 + 36 + 10 * 26, {width: 68, align: 'center'});

    doc.text('유도등 및 유도표지', PAGE_MARGIN + 85, 30 + 36 + 13 * 26);
    doc.text('피난구유도등', PAGE_MARGIN + 168, 30 + 36 + 11 * 26, {width: 68, align: 'center'});
    doc.text('거실통로유도등', PAGE_MARGIN + 168, 30 + 36 + 12 * 26, {width: 68, align: 'center'});
    doc.text('통로유도등', PAGE_MARGIN + 168, 30 + 36 + 13 * 26, {width: 68, align: 'center'});
    doc.text('객석유도등', PAGE_MARGIN + 168, 30 + 36 + 14 * 26, {width: 68, align: 'center'});
    doc.text('축광/발광유도선', PAGE_MARGIN + 168, 30 + 36 + 15 * 26, {width: 68, align: 'center'});
    doc.text('유도표지', PAGE_MARGIN + 168, 30 + 36 + 16 * 26, {width: 68, align: 'center'});

    doc.text('비상조명등 설비', PAGE_MARGIN + 85, 30 + 36 + 17 * 26 + 13, {width: 75, align: 'center'});
    doc.text('휴대용비상조명등', PAGE_MARGIN + 168, 30 + 36 + 17 * 26);
    doc.text('비상조명등', PAGE_MARGIN + 168, 30 + 36 + 18 * 26, {width: 68, align: 'center'});

    doc.text('소화소주', PAGE_MARGIN + 85, 30 + 36 + 19 * 26, {width: 147, align: 'center'});
    doc.text('상수도소화설비', PAGE_MARGIN + 85, 30 + 36 + 20 * 26, {width: 147, align: 'center'});

    doc.text('재연설비', PAGE_MARGIN + 85, 30 + 36 + 21 * 26 + 13, {width: 75, align: 'center'});
    doc.text('거실', PAGE_MARGIN + 168, 30 + 36 + 21 * 26, {width: 68, align: 'center'});
    doc.text('부속실', PAGE_MARGIN + 168, 30 + 36 + 22 * 26, {width: 68, align: 'center'});

    doc.text('연결송수관설비', PAGE_MARGIN + 85, 30 + 36 + 23 * 26 + 13, {width: 75, align: 'center'});
    doc.text('습식', PAGE_MARGIN + 168, 30 + 36 + 23 * 26, {width: 68, align: 'center'});
    doc.text('건식', PAGE_MARGIN + 168, 30 + 36 + 24 * 26, {width: 68, align: 'center'});

    doc.text('연결살수설비', PAGE_MARGIN + 85, 30 + 36 + 25 * 26, {width: 147, align: 'center'});
    doc.text('비상콘센트설비', PAGE_MARGIN + 85, 30 + 36 + 26 * 26, {width: 147, align: 'center'});
    doc.text('무선통신보조설비', PAGE_MARGIN + 85, 30 + 36 + 27 * 26, {width: 147, align: 'center'});
    doc.text('연소방지설비', PAGE_MARGIN + 85, 30 + 36 + 28 * 26, {width: 147, align: 'center'});

    doc.font('Pretendard').fontSize(10).fill('#000000');

    if (equipmentSituation) {
        for (let i = 23; i < 52; i++) {
            const y = 30 + 36 + (i - 23) * 26;

            doc.text(equipmentSituation[i]?.applicable ? '해당' : '해당 없음', PAGE_MARGIN + 245, y, {width: 70, align: 'center'});
            doc.text(equipmentSituation[i]?.specialSkill ? '해당' : '해당 없음', PAGE_MARGIN + 325, y, {width: 70, align: 'center'});
            doc.text(equipmentSituation[i]?.note ? equipmentSituation[i]?.note : '해당 없음', PAGE_MARGIN + 405, y, {width: 100});
        }
    } else {
        console.error('equipmentSituation is null or undefined');
    }
};

const addEquipSituation3 = (doc, equipmentSituation) => {
    addNewPage(doc);

    // pageNum(doc);

    // 점수집계 및 진단의견 표 헤더
    doc.rect(PAGE_MARGIN, 30, CONTENTS_WIDTH, 30).fill('#f9f9f9');

    const startY = 85;
    const endY = 813 - 6 * 26;

    for (let pos = startY; pos <= endY; pos += 26) {
        doc.moveTo(PAGE_MARGIN + 165, pos).lineTo(CONTENTS_END_X, pos);
    }
    doc.stroke('#d9d9d9');

    doc.moveTo(PAGE_MARGIN + 165, 59 + 1 * 26)
        .lineTo(PAGE_MARGIN + 165, 59 + 3 * 26)
        .moveTo(PAGE_MARGIN + 165, 59 + 6 * 26)
        .lineTo(PAGE_MARGIN + 165, 59 + 15 * 26)
        .moveTo(PAGE_MARGIN + 165, 59 + 16 * 26)
        .lineTo(PAGE_MARGIN + 165, 59 + 21 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 1 * 26)
        .lineTo(CONTENTS_END_X, 59 + 1 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 3 * 26)
        .lineTo(CONTENTS_END_X, 59 + 3 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 4 * 26)
        .lineTo(CONTENTS_END_X, 59 + 4 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 5 * 26)
        .lineTo(CONTENTS_END_X, 59 + 5 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 6 * 26)
        .lineTo(CONTENTS_END_X, 59 + 6 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 8 * 26)
        .lineTo(CONTENTS_END_X, 59 + 8 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 13 * 26)
        .lineTo(CONTENTS_END_X, 59 + 13 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 15 * 26)
        .lineTo(CONTENTS_END_X, 59 + 15 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 16 * 26)
        .lineTo(CONTENTS_END_X, 59 + 16 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 18 * 26)
        .lineTo(CONTENTS_END_X, 59 + 18 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 21 * 26)
        .lineTo(CONTENTS_END_X, 59 + 21 * 26)
        .moveTo(PAGE_MARGIN + 80, 59 + 22 * 26)
        .lineTo(CONTENTS_END_X, 59 + 22 * 26)
        .stroke('#d9d9d9');

    // 점수집계 및 진단의견 표 열
    doc.moveTo(PAGE_MARGIN + 80, 30)
        .lineTo(PAGE_MARGIN + 80, 813 - 6 * 26)
        .moveTo(PAGE_MARGIN + 240, 30)
        .lineTo(PAGE_MARGIN + 240, 813 - 6 * 26)
        .moveTo(PAGE_MARGIN + 320, 30)
        .lineTo(PAGE_MARGIN + 320, 813 - 6 * 26)
        .moveTo(PAGE_MARGIN + 400, 30)
        .lineTo(PAGE_MARGIN + 400, 813 - 6 * 26)
        .stroke('#000000');

    // 점수집계 및 진단의견 표 헤더 & 푸터 라인
    doc.moveTo(PAGE_MARGIN, 60)
        .lineTo(CONTENTS_END_X, 60)
        .moveTo(PAGE_MARGIN, 813 - 6 * 26)
        .lineTo(CONTENTS_END_X, 813 - 6 * 26)
        .stroke('#000000');

    // 점수집계 및 진단의견 데이터
    // x의 끝 565
    doc.font('Pretendard-Bold').fontSize(10).fill('#000000');
    doc.text('항목', PAGE_MARGIN + 5, 40, {width: 70, align: 'center'});
    doc.text('소활설비명', PAGE_MARGIN + 85, 40, {width: 240 - 85, align: 'center'});
    doc.text('해당여부', PAGE_MARGIN + 245, 40, {width: 70, align: 'center'});
    doc.text('특기사항', PAGE_MARGIN + 325, 40, {width: 70, align: 'center'});
    doc.text('비고', PAGE_MARGIN + 405, 40, {width: CONTENTS_END_X - 440, align: 'center'});

    doc.font('Pretendard').fontSize(10).fill('#000000');

    doc.text('건축방재', PAGE_MARGIN + 5, 55 + 11 * 26 + 13, {width: 70, align: 'center'});

    doc.text('공동구', PAGE_MARGIN + 85, 30 + 36 + 0 * 26, {width: 147, align: 'center'});

    doc.text('비상전원비상벌전기', PAGE_MARGIN + 85, 30 + 36 + 1 * 26 + 13);
    doc.text('발전기 종류', PAGE_MARGIN + 168, 30 + 36 + 1 * 26, {width: 68, align: 'center'});
    doc.text('배터리', PAGE_MARGIN + 168, 30 + 36 + 2 * 26, {width: 68, align: 'center'});

    doc.text('배연창', PAGE_MARGIN + 85, 30 + 36 + 3 * 26, {width: 147, align: 'center'});
    doc.text('비상용 승강기', PAGE_MARGIN + 85, 30 + 36 + 4 * 26, {width: 147, align: 'center'});
    doc.text('피난용 승강기', PAGE_MARGIN + 85, 30 + 36 + 5 * 26, {width: 147, align: 'center'});

    doc.text('계단', PAGE_MARGIN + 85, 30 + 36 + 6 * 26 + 13, {width: 75, align: 'center'});
    doc.text('피난', PAGE_MARGIN + 168, 30 + 36 + 6 * 26, {width: 68, align: 'center'});
    doc.text('특별피난', PAGE_MARGIN + 168, 30 + 36 + 7 * 26, {width: 68, align: 'center'});

    doc.text('방화구획', PAGE_MARGIN + 85, 30 + 36 + 10 * 26, {width: 75, align: 'center'});
    doc.text('층별', PAGE_MARGIN + 168, 30 + 36 + 8 * 26, {width: 68, align: 'center'});
    doc.text('면적별', PAGE_MARGIN + 168, 30 + 36 + 9 * 26, {width: 68, align: 'center'});
    doc.text('용도별', PAGE_MARGIN + 168, 30 + 36 + 10 * 26, {width: 68, align: 'center'});
    doc.text('광통부 마감', PAGE_MARGIN + 168, 30 + 36 + 11 * 26, {width: 68, align: 'center'});
    doc.text('커튼월 마감', PAGE_MARGIN + 168, 30 + 36 + 12 * 26, {width: 68, align: 'center'});

    doc.text('방화셔터', PAGE_MARGIN + 85, 30 + 36 + 13 * 26 + 13, {width: 75, align: 'center'});
    doc.text('일체형', PAGE_MARGIN + 168, 30 + 36 + 13 * 26, {width: 68, align: 'center'});
    doc.text('일반형', PAGE_MARGIN + 168, 30 + 36 + 14 * 26, {width: 68, align: 'center'});

    doc.text('방화문', PAGE_MARGIN + 85, 30 + 36 + 15 * 26, {width: 147, align: 'center'});

    doc.text('창호', PAGE_MARGIN + 85, 30 + 36 + 16 * 26 + 13, {width: 75, align: 'center'});
    doc.text('소방관진입창', PAGE_MARGIN + 168, 30 + 36 + 16 * 26, {width: 68, align: 'center'});
    doc.text('완강기 창호', PAGE_MARGIN + 168, 30 + 36 + 17 * 26, {width: 68, align: 'center'});

    doc.text('내장재', PAGE_MARGIN + 85, 30 + 36 + 19 * 26, {width: 75, align: 'center'});
    doc.text('불연', PAGE_MARGIN + 168, 30 + 36 + 18 * 26, {width: 68, align: 'center'});
    doc.text('준불연', PAGE_MARGIN + 168, 30 + 36 + 19 * 26, {width: 68, align: 'center'});
    doc.text('난연', PAGE_MARGIN + 168, 30 + 36 + 20 * 26, {width: 68, align: 'center'});

    doc.text('옥상광장', PAGE_MARGIN + 85, 30 + 36 + 21 * 26, {width: 147, align: 'center'});
    doc.text('방염', PAGE_MARGIN + 85, 30 + 36 + 22 * 26, {width: 147, align: 'center'});

    doc.font('Pretendard').fontSize(10).fill('#000000');

    if (equipmentSituation) {
        for (let i = 52; i < 75; i++) {
            const y = 30 + 36 + (i - 52) * 26;

            doc.text(equipmentSituation[i]?.applicable ? '해당' : '해당 없음', PAGE_MARGIN + 245, y, {width: 70, align: 'center'});
            doc.text(equipmentSituation[i]?.specialSkill ? '해당' : '해당 없음', PAGE_MARGIN + 325, y, {width: 70, align: 'center'});
            doc.text(equipmentSituation[i]?.note ? equipmentSituation[i]?.note : '해당 없음', PAGE_MARGIN + 405, y, {width: 100});
        }
    } else {
        console.error('equipmentSituation is null or undefined');
    }
};

// 결과 페이지 추가 함수
const addWaterResult = (doc, equipInputAll) => {
    const checkAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const addTextSection = (doc, title, textLines) => {
        const lineHeight = 15; // 각 줄의 높이
        const titlePadding = 25; // 제목과 텍스트 섹션 간의 패딩
        const rectPadding = 15; // 사각형 내부의 패딩
        const calculatedRectHeight = textLines.length * lineHeight + titlePadding + 2; // 동적으로 계산된 사각형 높이

        // 특정 제목일 경우 currentY를 CONTENTS_END_Y로 설정
        if (title === '시험절차 및 방법' || title === '시험목적') {
            currentY = CONTENTS_END_Y;
        }

        currentY = checkAndAddNewPage(currentY, calculatedRectHeight + rectPadding);
        scoreTitle(doc, title, currentY);

        doc.font('Pretendard').fontSize(10).fill('#000000');
        textLines.forEach((line, index) => {
            doc.text(line, PAGE_MARGIN + 5, currentY + titlePadding + index * lineHeight, {width: CONTENTS_WIDTH});
        });

        doc.rect(PAGE_MARGIN, currentY, CONTENTS_WIDTH, calculatedRectHeight).stroke('c9c9c9');
        currentY += calculatedRectHeight + rectPadding;

        // 특정 제목일 경우 추가 작업 수행
        if (title === '시험절차 및 방법') {
            doc.rect(PAGE_MARGIN, currentY - 15, CONTENTS_WIDTH, 325).stroke('c9c9c9');
            doc.image('img/graph.jpg', PAGE_MARGIN + 1, currentY, {width: CONTENTS_WIDTH - 2, height: 300});
            currentY += 325;
        }

        return currentY;
    };

    addNewPage(doc);

    headTitle(doc, `수계소화설비`);

    subTitle(doc, '가압송수장치', 90);

    let currentY = 130; // 데이터 시작 위치

    for (let i = 0; i < equipInputAll.length; i++) {
        const section = equipInputAll[i];

        // 첫 번째 equipInput 처리
        const sectionHeight = 45 + 60 + section.equipInput.length * ROW_HEIGHT;
        currentY = checkAndAddNewPage(currentY, sectionHeight);

        addTableSection(doc, i, section.equipInput, currentY);
        currentY += sectionHeight;
    }

    currentY = addTextSection(doc, '시험목적', ['1) 소방펌프는 일반펌프와는 달리 화재 상황 등 특수한 경우에만 동작하도록 되어있다.', '2) 소방펌프는 평소에 거의 기동을 하지 않으므로 평상시 성능시험을 통해 이상 유무를 확인하고 유지관리를 철저히 하여야 한다.', '3) 수질검사를통하여 미생물로인한 부식 및 이물질로인한 미비한 방수량을 등을 방지한다.', '4) 본 시험은 관계자의 설비 이해도 및 성능확인시험 운영 능력에 대한 평가를 목적으로 한다.'], currentY);

    currentY = addTextSection(doc, '평가기준', ['1) 옥내소화전설비의 화재안전기준(NFSC 102)', '2) 스프링클러설비의 화재안전기준(NFSC 103)', '3) NFPA 20 Standard for the Installation of Centrifugal Fire Pumps', '4) NFPA 13 Standard for the Installation of Sprinkler Systems, 2019 Edition, Sections 5.1.5 and 7.8.1.'], currentY);

    currentY = addTextSection(doc, '사전준비', ['1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다.', '- 통보 : 시험전 사전 공지한다.', '- 인원 : 시험에 필요한 인원 및 역할 분담한다.', '- 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다.', '2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다.', '3) 시험장비 : 필요시 초음파 유량계를 활용하여 유량을 측정한다.', '4) 시험장정리 : 시험을 실시할 공간의 안전 및 점검한다.'], currentY);

    currentY = addTextSection(
        doc,
        '성능시험 항목',
        [
            '1) 소화수조 소화수원 확보상태 확인한다.',
            '2) 감시제어반 가압송수장치 스위치 정상여부 확인한다.',
            '3) 가압송수장치 주위배관 상태(배관, 릴리프밸브, 드레인 등) 확인한다.',
            '4) 방출수를 처리할 집수정, 펌프실 바닥상태 등 확인한다.',
            '5) 가압송수장치 밸브 개방 및 폐쇄 상태 확인한다.',
            '6) 가압송수장치 토출량, 토출압력 등 확인한다.',
            '7) 가압송수장치, 압력챔버(압력스위치), 물탱크 표지 확인한다.',
            '8) 가압송수장치 체절압력 확인한다.',
            '9) 가압송수장치 정격압력 확인한다.',
            '10) 가압송수장치 150% 토출량에서 65% 이상 압력 확인한다.',
            '11) 가압송수장치 기동압력 확인한다.',
            '12) 릴리프밸브 개방확인한다. (체절운전 후 체절압력 범위에서 개방)'
        ],
        currentY
    );
    addTextSection(
        doc,
        '시험절차 및 방법',
        [
            '1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다.',
            '2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 결과를 평가한다.',
            '3) 펌프의 전양정과 토출량을 확인한다. (정격토출압력(명판)의 140% 계산, 65% 계산)',
            '4) 체절운전시험 실시',
            '- 동력제어반에서 주펌프 및 충압펌프를 수동 전환한다.',
            '- 2차 개폐밸브 폐쇄, 성능시험배관의 성능시험밸브(1차측) 개방한다.',
            '- 성능시험배관의 유량조절밸브(2차측)를 폐쇄한 상태에서 실시한다.',
            '- 주펌프 수동기동(체절운전) 확인한다.',
            '- 체절운전시 압력계 확인한다. (토출량이 0인 상태에서 정격양정의 140% 미만 확인)',
            '- 체절압력 미만에서 릴리프밸브 개방여부 확인한다. (미개방시 릴리프밸브 압력조절나사 조절)',
            '- 평가위원이 체절운전시험 결과를 확인한다.',
            '5) 정격운전시험 실시',
            '- 유량이 100인 상태로 운전할 때 정격토출압력 확인한다.',
            '- 유량계로 유량 확인한다. (유량계 교정 상태)',
            '- 압력계로 정격토출압력 확인한다. (압력계 교정 상태)',
            '- 평가위원이 정격운전시험 결과를 확인한다. (최대부하운전시험 실시)',
            '- 정격토출량의 150%로 운전 확인한다. (유량계 확인)',
            '- 정격토출압력의 65% 이상 확인한다.',
            '- 평가위원이 최대부하운전시험 결과를 확인한다.',
            '6) 복구',
            '- 주펌프 및 충압펌프 운전 정지 확인한다.',
            '- 펌프 기동 및 정지 압력 세팅한다.',
            '- 동력제어반 및 감지제어반 자동으로 전환하는지 확인한다.',
            '- 2차 개폐밸브 개방확인한다.',
            '- 설비 이상 유무 최종확인한다.',
            '- 설비 복구 확인서(양식) 제출'
        ],
        currentY
    );
};

const addWaterResult2 = (doc, equipInputAll) => {
    const checkAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const addTextSection = (doc, title, textLines) => {
        const lineHeight = 15; // 각 줄의 높이
        const titlePadding = 25; // 제목과 텍스트 섹션 간의 패딩
        const rectPadding = 15; // 사각형 내부의 패딩
        const calculatedRectHeight = textLines.length * lineHeight + titlePadding + 2; // 동적으로 계산된 사각형 높이

        // 특정 제목일 경우 currentY를 CONTENTS_END_Y로 설정
        if (title === '시험절차 및 방법' || title === '시험목적') {
            currentY = CONTENTS_END_Y;
        }

        currentY = checkAndAddNewPage(currentY, calculatedRectHeight + rectPadding);
        scoreTitle(doc, title, currentY);

        doc.font('Pretendard').fontSize(10).fill('#000000');
        textLines.forEach((line, index) => {
            doc.text(line, PAGE_MARGIN + 5, currentY + titlePadding + index * lineHeight, {width: CONTENTS_WIDTH});
        });

        doc.rect(PAGE_MARGIN, currentY, CONTENTS_WIDTH, calculatedRectHeight).stroke('c9c9c9');
        currentY += calculatedRectHeight + rectPadding;

        // 특정 제목일 경우 추가 작업 수행
        if (title === '시험절차 및 방법') {
            doc.rect(PAGE_MARGIN, currentY - 15, CONTENTS_WIDTH, 325).stroke('c9c9c9');
            doc.image('img/graph.jpg', PAGE_MARGIN + 1, currentY, {width: CONTENTS_WIDTH - 2, height: 300});
            currentY += 325;
        }

        return currentY;
    };

    addNewPage(doc);
    headTitle(doc, `수계소화설비`);

    subTitle(doc, '옥내·외소화전설비', 90);

    let currentY = 130; // 데이터 시작 위치

    for (let i = 0; i < equipInputAll.length; i++) {
        const section = equipInputAll[i];

        // 첫 번째 equipInput 처리
        const sectionHeight = 45 + 60 + section.equipInput.length * ROW_HEIGHT;
        currentY = checkAndAddNewPage(currentY, sectionHeight);

        addTableSection(doc, i, section.equipInput, currentY);
        currentY += sectionHeight;
    }

    currentY = addTextSection(doc, '시험목적', ['1) 소방펌프는 일반펌프와는 달리 화재 상황 등 특수한 경우에만 동작하도록 되어있다.', '2) 소방펌프는 평소에 거의 기동을 하지 않으므로 평상시 성능시험을 통해 이상 유무를 확인하고 유지관리를 철저히 하여야 한다.', '3) 수질검사를통하여 미생물로인한 부식 및 이물질로인한 미비한 방수량을 등을 방지한다.', '4) 본 시험은 관계자의 설비 이해도 및 성능확인시험 운영 능력에 대한 평가를 목적으로 한다.'], currentY);

    currentY = addTextSection(doc, '평가기준', ['1) 옥내소화전설비의 화재안전기준(NFSC 102)', '2) 스프링클러설비의 화재안전기준(NFSC 103)', '3) NFPA 20 Standard for the Installation of Centrifugal Fire Pumps', '4) NFPA 13 Standard for the Installation of Sprinkler Systems, 2019 Edition, Sections 5.1.5 and 7.8.1.'], currentY);

    currentY = addTextSection(doc, '사전준비', ['1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다.', '- 통보 : 시험전 사전 공지한다.', '- 인원 : 시험에 필요한 인원 및 역할 분담한다.', '- 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다.', '2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다.', '3) 시험장비 : 필요시 초음파 유량계를 활용하여 유량을 측정한다.', '4) 시험장정리 : 시험을 실시할 공간의 안전 및 점검한다.'], currentY);

    currentY = addTextSection(
        doc,
        '성능시험 항목',
        [
            '1) 소화수조 소화수원 확보상태 확인한다.',
            '2) 감시제어반 가압송수장치 스위치 정상여부 확인한다.',
            '3) 가압송수장치 주위배관 상태(배관, 릴리프밸브, 드레인 등) 확인한다.',
            '4) 방출수를 처리할 집수정, 펌프실 바닥상태 등 확인한다.',
            '5) 가압송수장치 밸브 개방 및 폐쇄 상태 확인한다.',
            '6) 가압송수장치 토출량, 토출압력 등 확인한다.',
            '7) 가압송수장치, 압력챔버(압력스위치), 물탱크 표지 확인한다.',
            '8) 가압송수장치 체절압력 확인한다.',
            '9) 가압송수장치 정격압력 확인한다.',
            '10) 가압송수장치 150% 토출량에서 65% 이상 압력 확인한다.',
            '11) 가압송수장치 기동압력 확인한다.',
            '12) 릴리프밸브 개방확인한다. (체절운전 후 체절압력 범위에서 개방)'
        ],
        currentY
    );
    addTextSection(
        doc,
        '시험절차 및 방법',
        [
            '1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다.',
            '2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 결과를 평가한다.',
            '3) 펌프의 전양정과 토출량을 확인한다. (정격토출압력(명판)의 140% 계산, 65% 계산)',
            '4) 체절운전시험 실시',
            '- 동력제어반에서 주펌프 및 충압펌프를 수동 전환한다.',
            '- 2차 개폐밸브 폐쇄, 성능시험배관의 성능시험밸브(1차측) 개방한다.',
            '- 성능시험배관의 유량조절밸브(2차측)를 폐쇄한 상태에서 실시한다.',
            '- 주펌프 수동기동(체절운전) 확인한다.',
            '- 체절운전시 압력계 확인한다. (토출량이 0인 상태에서 정격양정의 140% 미만 확인)',
            '- 체절압력 미만에서 릴리프밸브 개방여부 확인한다. (미개방시 릴리프밸브 압력조절나사 조절)',
            '- 평가위원이 체절운전시험 결과를 확인한다.',
            '5) 정격운전시험 실시',
            '- 유량이 100인 상태로 운전할 때 정격토출압력 확인한다.',
            '- 유량계로 유량 확인한다. (유량계 교정 상태)',
            '- 압력계로 정격토출압력 확인한다. (압력계 교정 상태)',
            '- 평가위원이 정격운전시험 결과를 확인한다. (최대부하운전시험 실시)',
            '- 정격토출량의 150%로 운전 확인한다. (유량계 확인)',
            '- 정격토출압력의 65% 이상 확인한다.',
            '- 평가위원이 최대부하운전시험 결과를 확인한다.',
            '6) 복구',
            '- 주펌프 및 충압펌프 운전 정지 확인한다.',
            '- 펌프 기동 및 정지 압력 세팅한다.',
            '- 동력제어반 및 감지제어반 자동으로 전환하는지 확인한다.',
            '- 2차 개폐밸브 개방확인한다.',
            '- 설비 이상 유무 최종확인한다.',
            '- 설비 복구 확인서(양식) 제출'
        ],
        currentY
    );
};

const addWaterResult3 = (doc, equipInputAll) => {
    const checkAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const addTextSection = (doc, title, textLines) => {
        const lineHeight = 15; // 각 줄의 높이
        const titlePadding = 25; // 제목과 텍스트 섹션 간의 패딩
        const rectPadding = 15; // 사각형 내부의 패딩
        const calculatedRectHeight = textLines.length * lineHeight + titlePadding + 2; // 동적으로 계산된 사각형 높이

        // 특정 제목일 경우 currentY를 CONTENTS_END_Y로 설정
        if (title === '시험절차 및 방법' || title === '시험목적') {
            currentY = CONTENTS_END_Y;
        }

        currentY = checkAndAddNewPage(currentY, calculatedRectHeight + rectPadding);
        scoreTitle(doc, title, currentY);

        doc.font('Pretendard').fontSize(10).fill('#000000');
        textLines.forEach((line, index) => {
            doc.text(line, PAGE_MARGIN + 5, currentY + titlePadding + index * lineHeight, {width: CONTENTS_WIDTH});
        });

        doc.rect(PAGE_MARGIN, currentY, CONTENTS_WIDTH, calculatedRectHeight).stroke('c9c9c9');
        currentY += calculatedRectHeight + rectPadding;

        // 특정 제목일 경우 추가 작업 수행
        if (title === '시험절차 및 방법') {
            doc.rect(PAGE_MARGIN, currentY - 15, CONTENTS_WIDTH, 325).stroke('c9c9c9');
            doc.image('img/graph.jpg', PAGE_MARGIN + 1, currentY, {width: CONTENTS_WIDTH - 2, height: 300});
            currentY += 325;
        }

        return currentY;
    };

    addNewPage(doc);
    headTitle(doc, `가스계 소화설비`);

    subTitle(doc, '가스계소화설비', 90);

    let currentY = 130; // 데이터 시작 위치

    for (let i = 0; i < equipInputAll.length; i++) {
        const section = equipInputAll[i];

        // 첫 번째 equipInput 처리
        const sectionHeight = 45 + 60 + section.equipInput.length * ROW_HEIGHT;
        currentY = checkAndAddNewPage(currentY, sectionHeight);

        addTableSection(doc, i, section.equipInput, currentY);
        currentY += sectionHeight;
    }

    currentY = addTextSection(doc, '시험목적', ['1) 소방펌프는 일반펌프와는 달리 화재 상황 등 특수한 경우에만 동작하도록 되어있다.', '2) 소방펌프는 평소에 거의 기동을 하지 않으므로 평상시 성능시험을 통해 이상 유무를 확인하고 유지관리를 철저히 하여야 한다.', '3) 수질검사를통하여 미생물로인한 부식 및 이물질로인한 미비한 방수량을 등을 방지한다.', '4) 본 시험은 관계자의 설비 이해도 및 성능확인시험 운영 능력에 대한 평가를 목적으로 한다.'], currentY);

    currentY = addTextSection(doc, '평가기준', ['1) 옥내소화전설비의 화재안전기준(NFSC 102)', '2) 스프링클러설비의 화재안전기준(NFSC 103)', '3) NFPA 20 Standard for the Installation of Centrifugal Fire Pumps', '4) NFPA 13 Standard for the Installation of Sprinkler Systems, 2019 Edition, Sections 5.1.5 and 7.8.1.'], currentY);

    currentY = addTextSection(doc, '사전준비', ['1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다.', '- 통보 : 시험전 사전 공지한다.', '- 인원 : 시험에 필요한 인원 및 역할 분담한다.', '- 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다.', '2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다.', '3) 시험장비 : 필요시 초음파 유량계를 활용하여 유량을 측정한다.', '4) 시험장정리 : 시험을 실시할 공간의 안전 및 점검한다.'], currentY);

    currentY = addTextSection(
        doc,
        '성능시험 항목',
        [
            '1) 소화수조 소화수원 확보상태 확인한다.',
            '2) 감시제어반 가압송수장치 스위치 정상여부 확인한다.',
            '3) 가압송수장치 주위배관 상태(배관, 릴리프밸브, 드레인 등) 확인한다.',
            '4) 방출수를 처리할 집수정, 펌프실 바닥상태 등 확인한다.',
            '5) 가압송수장치 밸브 개방 및 폐쇄 상태 확인한다.',
            '6) 가압송수장치 토출량, 토출압력 등 확인한다.',
            '7) 가압송수장치, 압력챔버(압력스위치), 물탱크 표지 확인한다.',
            '8) 가압송수장치 체절압력 확인한다.',
            '9) 가압송수장치 정격압력 확인한다.',
            '10) 가압송수장치 150% 토출량에서 65% 이상 압력 확인한다.',
            '11) 가압송수장치 기동압력 확인한다.',
            '12) 릴리프밸브 개방확인한다. (체절운전 후 체절압력 범위에서 개방)'
        ],
        currentY
    );
    addTextSection(
        doc,
        '시험절차 및 방법',
        [
            '1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다.',
            '2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 결과를 평가한다.',
            '3) 펌프의 전양정과 토출량을 확인한다. (정격토출압력(명판)의 140% 계산, 65% 계산)',
            '4) 체절운전시험 실시',
            '- 동력제어반에서 주펌프 및 충압펌프를 수동 전환한다.',
            '- 2차 개폐밸브 폐쇄, 성능시험배관의 성능시험밸브(1차측) 개방한다.',
            '- 성능시험배관의 유량조절밸브(2차측)를 폐쇄한 상태에서 실시한다.',
            '- 주펌프 수동기동(체절운전) 확인한다.',
            '- 체절운전시 압력계 확인한다. (토출량이 0인 상태에서 정격양정의 140% 미만 확인)',
            '- 체절압력 미만에서 릴리프밸브 개방여부 확인한다. (미개방시 릴리프밸브 압력조절나사 조절)',
            '- 평가위원이 체절운전시험 결과를 확인한다.',
            '5) 정격운전시험 실시',
            '- 유량이 100인 상태로 운전할 때 정격토출압력 확인한다.',
            '- 유량계로 유량 확인한다. (유량계 교정 상태)',
            '- 압력계로 정격토출압력 확인한다. (압력계 교정 상태)',
            '- 평가위원이 정격운전시험 결과를 확인한다. (최대부하운전시험 실시)',
            '- 정격토출량의 150%로 운전 확인한다. (유량계 확인)',
            '- 정격토출압력의 65% 이상 확인한다.',
            '- 평가위원이 최대부하운전시험 결과를 확인한다.',
            '6) 복구',
            '- 주펌프 및 충압펌프 운전 정지 확인한다.',
            '- 펌프 기동 및 정지 압력 세팅한다.',
            '- 동력제어반 및 감지제어반 자동으로 전환하는지 확인한다.',
            '- 2차 개폐밸브 개방확인한다.',
            '- 설비 이상 유무 최종확인한다.',
            '- 설비 복구 확인서(양식) 제출'
        ],
        currentY
    );
};

// 표를 섹션에 추가하는 함수
const addTableSection = (doc, index, data, baseY) => {
    const rowHeight = 30;
    const sectionTitle = `현황 ${index + 1}지구`; // 인덱스에 따라 제목 변경

    scoreTitle(doc, sectionTitle, baseY);

    // 헤더 사각형
    doc.rect(PAGE_MARGIN, baseY + 30, CONTENTS_WIDTH, 60).fill('#f9f9f9');

    // 표 헤더 라인
    doc.moveTo(PAGE_MARGIN, baseY + 30 + 60)
        .lineTo(CONTENTS_END_X, baseY + 30 + 60)
        .moveTo(PAGE_MARGIN, baseY + 30 + 30)
        .lineTo(PAGE_MARGIN + 400, baseY + 30 + 30)
        .stroke('#000000');

    // 표 열
    doc.moveTo(PAGE_MARGIN + 100, baseY + 30)
        .lineTo(PAGE_MARGIN + 100, baseY + 30 + 60)
        .moveTo(PAGE_MARGIN + 200, baseY + 30 + 30)
        .lineTo(PAGE_MARGIN + 200, baseY + 30 + 60)
        .moveTo(PAGE_MARGIN + 300, baseY + 30 + 30)
        .lineTo(PAGE_MARGIN + 300, baseY + 30 + 60)
        .moveTo(PAGE_MARGIN + 400, baseY + 30)
        .lineTo(PAGE_MARGIN + 400, baseY + 30 + 60)
        .stroke('#000000');

    // 텍스트
    doc.font('Pretendard-Bold').fontSize(10).fill('#000000');

    doc.text('항목', PAGE_MARGIN + 5, baseY + 30 + 8, {width: 90, align: 'center'});
    doc.text('구분', PAGE_MARGIN + 5, baseY + 30 + 8 + rowHeight, {width: 90, align: 'center'});

    doc.text('내용', PAGE_MARGIN + 5 + 1 * 100, baseY + 30 + 8, {width: 300, align: 'center'});
    doc.text('제조사', PAGE_MARGIN + 5 + 1 * 100, baseY + 30 + 8 + rowHeight, {width: 90, align: 'center'});
    doc.text('제조년도', PAGE_MARGIN + 5 + 2 * 100, baseY + 30 + 8 + rowHeight, {width: 90, align: 'center'});
    doc.text('용도', PAGE_MARGIN + 5 + 3 * 100, baseY + 30 + 8 + rowHeight, {width: 90, align: 'center'});

    doc.text('특이사항', PAGE_MARGIN + 5 + 4 * 100, baseY + 30 + 23, {width: 125, align: 'center'});

    // Draw table content dynamically
    //     for (let i = 0; i < data.length; i++) {

    //         drawTableContent(doc, baseY, rowHeight, i, data[i]);
    //     }
    // };

    data.forEach((row, i) => {
        drawTableContent(doc, baseY, rowHeight, i, row);
    });
};

const addTableSection2 = (doc, index, data, baseY) => {
    const rowHeight = 30;
    const sectionTitle = `성능시험표 ${Math.ceil((index + 1) / 2)}-${(index + 1) % 2 === 0 ? 2 : 1}`; // 인덱스에 따라 제목 변경

    scoreTitle(doc, sectionTitle, baseY);

    // 헤더 사각형
    doc.rect(PAGE_MARGIN, baseY + 30, CONTENTS_WIDTH, 30).fill('#f9f9f9');

    // 표 헤더 라인
    doc.moveTo(PAGE_MARGIN + 35, baseY + 30 + 30 + 60)
        .lineTo(PAGE_MARGIN + 100, baseY + 30 + 30 + 60)
        .moveTo(PAGE_MARGIN, baseY + 30 + 30)
        .lineTo(CONTENTS_END_X, baseY + 30 + 30)
        .moveTo(PAGE_MARGIN, baseY + 30 + 30 * data.length + 30)
        .lineTo(CONTENTS_END_X, baseY + 30 + 30 * data.length + 30)
        .stroke('#000000');

    // 표 열
    doc.moveTo(PAGE_MARGIN + 100, baseY + 30)
        .lineTo(PAGE_MARGIN + 100, baseY + 30 + 30)
        .moveTo(PAGE_MARGIN + 200, baseY + 30 + 0)
        .lineTo(PAGE_MARGIN + 200, baseY + 30 + 30)
        .moveTo(PAGE_MARGIN + 300, baseY + 30 + 0)
        .lineTo(PAGE_MARGIN + 300, baseY + 30 + 30)
        .moveTo(PAGE_MARGIN + 400, baseY + 30)
        .lineTo(PAGE_MARGIN + 400, baseY + 30 + 30)
        .stroke('#000000');

    // 텍스트
    doc.font('Pretendard-Bold').fontSize(10).fill('#000000');

    doc.text('주', PAGE_MARGIN + 5, baseY + 30 * 3.5 + 10, {width: 25, align: 'center'});
    doc.text('기준값', PAGE_MARGIN + 33, baseY + 30 * 2.5 + 10, {width: 65, align: 'center'});
    doc.text('성능시험', PAGE_MARGIN + 33, baseY + 30 * 5 + 10, {width: 65, align: 'center'});

    doc.text('구분', PAGE_MARGIN + 5, baseY + 30 + 8, {width: 90, align: 'center'});

    doc.text('체절운전', PAGE_MARGIN + 5 + 1 * 100, baseY + 30 + 8, {width: 90, align: 'center'});
    doc.text('정격운전', PAGE_MARGIN + 5 + 2 * 100, baseY + 30 + 8, {width: 90, align: 'center'});
    doc.text('150%운전', PAGE_MARGIN + 5 + 3 * 100, baseY + 30 + 8, {width: 90, align: 'center'});

    doc.text('특이사항', PAGE_MARGIN + 5 + 4 * 100, baseY + 30 + 8, {width: 125, align: 'center'});

    // Draw table content dynamically
    //     for (let i = 0; i < data.length; i++) {

    //         drawTableContent(doc, baseY, rowHeight, i, data[i]);
    //     }
    // };

    data.forEach((row, i) => {
        drawTableContent2(doc, baseY, rowHeight, i, row);
    });
};

const drawTableContent = (doc, baseY, rowHeight, rowIndex, data) => {
    const contentBaseY = baseY + 31 + 60 + rowIndex * rowHeight;

    doc.moveTo(PAGE_MARGIN, contentBaseY + 30)
        .lineTo(CONTENTS_END_X, contentBaseY + 30)
        .stroke('#c9c9c9');

    doc.font('Pretendard').fontSize(10).fill('#000000');

    // 표 열
    doc.moveTo(PAGE_MARGIN + 100, contentBaseY)
        .lineTo(PAGE_MARGIN + 100, contentBaseY + 30)
        .moveTo(PAGE_MARGIN + 200, contentBaseY)
        .lineTo(PAGE_MARGIN + 200, contentBaseY + 30)
        .moveTo(PAGE_MARGIN + 300, contentBaseY)
        .lineTo(PAGE_MARGIN + 300, contentBaseY + 30)
        .moveTo(PAGE_MARGIN + 400, contentBaseY)
        .lineTo(PAGE_MARGIN + 400, contentBaseY + 30)
        .stroke('#000000');

    doc.text(data.equipInput, PAGE_MARGIN + 5 + 0 * 100, contentBaseY + 8, {width: 90, align: 'center'});
    doc.text(data.equipInput2, PAGE_MARGIN + 5 + 1 * 100, contentBaseY + 8, {width: 90, align: 'center'});
    doc.text(data.equipInput3, PAGE_MARGIN + 5 + 2 * 100, contentBaseY + 8, {width: 90, align: 'center'});
    doc.text(data.equipInput4, PAGE_MARGIN + 5 + 3 * 100, contentBaseY + 8, {width: 90, align: 'center'});
    doc.text(data.equipInput5, PAGE_MARGIN + 5 + 4 * 100, contentBaseY + 8, {width: 130});
};

const drawTableContent2 = (doc, baseY, rowHeight, rowIndex, data) => {
    const contentBaseY = baseY + 31 + 60 + rowIndex * rowHeight;

    doc.moveTo(PAGE_MARGIN + 100, contentBaseY)
        .lineTo(CONTENTS_END_X, contentBaseY)
        .stroke('#c9c9c9');

    doc.font('Pretendard').fontSize(10).fill('#000000');

    // 표 열
    doc.moveTo(PAGE_MARGIN + 35, contentBaseY - 30).lineTo(PAGE_MARGIN + 35, contentBaseY);
    doc.moveTo(PAGE_MARGIN + 100, contentBaseY - 30)
        .lineTo(PAGE_MARGIN + 100, contentBaseY)
        .moveTo(PAGE_MARGIN + 200, contentBaseY - 30)
        .lineTo(PAGE_MARGIN + 200, contentBaseY)
        .moveTo(PAGE_MARGIN + 300, contentBaseY - 30)
        .lineTo(PAGE_MARGIN + 300, contentBaseY)
        .moveTo(PAGE_MARGIN + 400, contentBaseY - 30)
        .lineTo(PAGE_MARGIN + 400, contentBaseY)
        .stroke('#000000');

    doc.text(data.equipInput, PAGE_MARGIN + 5 + 1 * 100, contentBaseY + 8 - 30, {width: 90, align: 'center'});
    doc.text(data.equipInput2, PAGE_MARGIN + 5 + 2 * 100, contentBaseY + 8 - 30, {width: 90, align: 'center'});
    doc.text(data.equipInput3, PAGE_MARGIN + 5 + 3 * 100, contentBaseY + 8 - 30, {width: 90, align: 'center'});
    doc.text(data.equipInput4, PAGE_MARGIN + 5 + 4 * 100, contentBaseY + 8 - 30, {width: 125, align: 'center'});
};

// 예제 데이터를 기반으로 함수 호출
// const equipInputAll = [
//     {
//         equipInput: [
//             {equipInput: '주펌프1', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프2', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프3', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프4', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프5', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'}
//         ]
//     },

//     {
//         equipInput: [
//             {equipInput: '주펌프6', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프7', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프8', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프9', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프10', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'}
//         ]
//     },
//     {
//         equipInput: [
//             {equipInput: '주펌프11', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'},
//             {equipInput: '주펌프12', equipInput2: '효성', equipInput3: '2015-07', equipInput4: '옥내/SP 전용', equipInput5: '특이사항'}
//         ]
//     }
// ];

//------------------------------------------------------------------------------------------

// const equipInputAll2 = [
//     [
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4:  },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: }
//         ]
//    ,

//      [
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4:  },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: }
//         ]
//    ,
//     [
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4:  },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: }
//         ]
//     ,
//      [
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4:  },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: }
//         ]
//    ,
//     [
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: }
//         ]
//    ,
//     [
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: },
//             {equipInput: , equipInput2: , equipInput3: , equipInput4: }
//         ]

// ];

const addWaterTestResult = (doc, evaluationItems, evaluationLocation, picture1, picture2, evaluationContent, evaluationResult, improvementResult, newPicture1, newPicture2, improvementContent, transformed) => {
    const checkAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const imgcheckAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const svgcheckAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            currentX = PAGE_MARGIN; // X 위치 초기화
            return PAGE_MARGIN; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const drawImage = (doc, imagePath, x, y, width, height) => {
        doc.image(imagePath, x + 0.5, y, {width, height});
    };

    const drawTableContent = (doc, baseY, IMG_HEIGHT, data, imageKey, xOffset) => {
        drawImage(doc, data[imageKey], PAGE_MARGIN + xOffset, baseY, 268 - 0.5, 260);
    };

    const addTextSection = (doc, title, textLines, baseY) => {
        const lineHeight = 15; // 각 줄의 높이
        const padding = 25; // 제목과 텍스트 섹션 간의 패딩
        const rectPadding = 15; // 사각형 내부의 패딩

        // textLines가 문자열이면 줄바꿈 문자 기준으로 분할하여 배열로 변환
        if (typeof textLines === 'string') {
            textLines = textLines.split('\r\n');
        }

        // textLines가 배열인지 확인하고, 배열이 아닌 경우 빈 배열로 변환
        if (!Array.isArray(textLines)) {
            textLines = [];
        }

        const calculatedRectHeight = textLines.length * lineHeight + padding + 2; // 동적으로 계산된 사각형 높이

        baseY = checkAndAddNewPage(baseY, calculatedRectHeight + rectPadding);
        scoreTitle(doc, title, baseY);

        doc.font('Pretendard').fontSize(10).fill('#000000');
        textLines?.forEach((line, index) => {
            doc.text(line, PAGE_MARGIN + 5, baseY + padding + index * lineHeight, {width: CONTENTS_WIDTH});
        });

        doc.rect(PAGE_MARGIN, baseY, CONTENTS_WIDTH, calculatedRectHeight).stroke('c9c9c9');
        baseY += calculatedRectHeight + rectPadding;
        return baseY;
    };

    // SVG 섹션 추가 함수
    let currentX = PAGE_MARGIN;

    const addSVGSection = (doc, svgContent, baseY, width, height) => {
        if (currentX + width > CONTENTS_END_X) {
            currentX = PAGE_MARGIN;
            baseY += height + 15; // 다음 줄로 이동
        }

        baseY = svgcheckAndAddNewPage(baseY, height);

        SVGtoPDF(doc, svgContent, currentX, baseY, {width, height});
        currentX += width + BOX_MARGIN; // X 위치 업데이트

        return baseY;
    };

    addNewPage(doc);
    subTitle(doc, '시험 결과', 30);

    // 두 배열을 더 긴 배열의 길이에 맞춰 쌍으로 결합
    const maxLength = Math.max(picture1?.length, picture2?.length);
    const combinedPictures = Array.from({length: maxLength}, (_, index) => ({
        picture1: picture1[index] ? picture1[index]?.picture1.slice(1) : '',
        picture2: picture2[index] ? picture2[index]?.picture2.slice(1) : ''
    }));

    let currentY = 80; // 데이터 시작 위치

    currentY = addTextSection(doc, '평가항목', [evaluationItems], currentY);
    currentY = addTextSection(doc, '평가위치', [evaluationLocation], currentY);

    scoreTitle(doc, '평가사진', currentY);
    currentY += 20; // 타이틀 하단 간격

    combinedPictures.forEach((pictures) => {
        currentY = imgcheckAndAddNewPage(currentY, 260); // 이미지 높이 고려
        if (pictures.picture1) {
            drawTableContent(doc, currentY, 260, pictures, 'picture1', 0);
        }
        if (pictures.picture2) {
            drawTableContent(doc, currentY, 260, pictures, 'picture2', 268);
        }
        currentY += 260; // 이미지 높이와 간격을 더함
    });

    currentY += 20; // 타이틀 하단 간격
    currentY = addTextSection(doc, '평가내용', evaluationContent, currentY);

    currentY = addTextSection(doc, '평과결과 및 개선방안', evaluationResult, currentY);

    const getYValue = (equipValue) => {
        // equipValue 값을 기준으로 y값을 계산하는 함수
        // 예를 들어, equipValue가 2.0일 때 y값은 50, 1.5일 때는 100 등으로 매핑
        const minEquipValue = 0;
        const maxEquipValue = 2.0;
        const minY = 240;
        const maxY = 20;
        return minY - ((equipValue - minEquipValue) / (maxEquipValue - minEquipValue)) * (minY - maxY) + 14;
    };

    if (evaluationItems === '10) 가압송수장치 150% 토출량에서 65% 이상 압력 확인한다.') {
        for (let i = 0; i < transformed.length; i++) {
            const section = transformed[i];

            // 첫 번째 equipInput 처리
            const sectionHeight = 45 + 60 + section.length * ROW_HEIGHT;
            currentY = svgcheckAndAddNewPage(currentY, sectionHeight);

            addTableSection2(doc, i, section, currentY);
            currentY += sectionHeight;
        }

        // SVG 추가

        let graphx = 100;

        // 4번째 object의 equipInput 값들을 가져옴
        for (let i = 0; i < 6; i++) {
            // 각 object의 equipInput 값들을 가져옴
            const equipInput1Value = parseFloat(transformed[i][4].equipInput) || 0;
            const equipInput2Value = parseFloat(transformed[i][4].equipInput2) || 0;
            const equipInput3Value = parseFloat(transformed[i][4].equipInput3) || 0;

            const y1 = getYValue(equipInput1Value);
            const y2 = getYValue(equipInput2Value);
            const y3 = getYValue(equipInput3Value);

            const svg = `
            <svg width="350" height="300" xmlns="http://www.w3.org/2000/svg">
                <g font-family="Pretendard">
                <rect width="350" height="300" fill="#fbfbfb" stroke="#c9c9c9"/>
    
                    <line x1="50" y1="240" x2="330" y2="240" stroke="black"/>
                    <line x1="50" y1="240" x2="50" y2="20" stroke="black"/>
                    
                    <polyline points="50,${y1} ${50 + graphx},${y2} ${50 + graphx * 1.5},${y3}" fill="none" stroke="red"/>
                    <text x="170" y="290" text-anchor="middle">성능시험 그래프</text>
    
                    <text x="40" y="260" text-anchor="middle">0</text>
                    <text x="${50 + graphx}" y="260" text-anchor="middle">100%</text>
                    <text x="${50 + graphx * 1.5}" y="260" text-anchor="middle">150%</text>
                    <text x="330" y="260" text-anchor="middle">유량</text>
    
                    <text x="30" y="20" text-anchor="middle">양정</text>
                    <text x="30" y="50" text-anchor="middle">2.0</text>
                    <text x="30" y="100" text-anchor="middle">1.5</text>
                    <text x="30" y="150" text-anchor="middle">1.0</text>
                    <text x="30" y="200" text-anchor="middle">0.5</text>
    
                    <circle cx="50" cy="${y1}" r="3" fill="red"/>
                    <circle cx="${50 + graphx}" cy="${y2}" r="3" fill="red"/>
                    <circle cx="${50 + graphx * 1.5}" cy="${y3}" r="3" fill="red"/>
                </g>
            </svg>`;

            currentY = addSVGSection(doc, svg, currentY, 250, 250);
        }
        currentY += 250;
    }

    currentY = addTextSection(
        doc,
        '개선결과',
        improvementResult,

        currentY
    );

    // 두 배열을 더 긴 배열의 길이에 맞춰 쌍으로 결합
    const maxLengthnewP = Math.max(newPicture1?.length, newPicture2?.length);
    const combinednewPictures = Array.from({length: maxLength}, (_, index) => ({
        picture1: newPicture1[index] ? newPicture1[index]?.picture1.slice(1) : '',
        picture2: newPicture2[index] ? newPicture2[index]?.picture2.slice(1) : ''
    }));

    scoreTitle(doc, '개선사진', currentY);
    currentY += 20; // 타이틀 하단 간격

    combinednewPictures.forEach((pictures) => {
        currentY = imgcheckAndAddNewPage(currentY, 260); // 이미지 높이 고려
        if (pictures.picture1) {
            drawTableContent(doc, currentY, 260, pictures, 'picture1', 0);
        }
        if (pictures.picture2) {
            drawTableContent(doc, currentY, 260, pictures, 'picture2', 268);
        }
        currentY += 260; // 이미지 높이와 간격을 더함
    });

    currentY += 20; // 타이틀 하단 간격

    currentY = addTextSection(
        doc,
        '개선내용',
        improvementContent,

        currentY
    );
};

const addWaterTestResult2 = (doc, evaluationItems, evaluationLocation, picture1, picture2, evaluationContent, evaluationResult, improvementResult, newPicture1, newPicture2, improvementContent) => {
    const checkAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const imgcheckAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const svgcheckAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            currentX = PAGE_MARGIN; // X 위치 초기화
            return PAGE_MARGIN; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const drawImage = (doc, imagePath, x, y, width, height) => {
        doc.image(imagePath, x + 0.5, y, {width, height});
    };

    const drawTableContent = (doc, baseY, IMG_HEIGHT, data, imageKey, xOffset) => {
        drawImage(doc, data[imageKey], PAGE_MARGIN + xOffset, baseY, 268 - 0.5, 260);
    };

    const addTextSection = (doc, title, textLines, baseY) => {
        const lineHeight = 15; // 각 줄의 높이
        const padding = 25; // 제목과 텍스트 섹션 간의 패딩
        const rectPadding = 15; // 사각형 내부의 패딩

        // textLines가 문자열이면 줄바꿈 문자 기준으로 분할하여 배열로 변환
        if (typeof textLines === 'string') {
            textLines = textLines.split('\r\n');
        }

        // textLines가 배열인지 확인하고, 배열이 아닌 경우 빈 배열로 변환
        if (!Array.isArray(textLines)) {
            textLines = [];
        }

        const calculatedRectHeight = textLines.length * lineHeight + padding + 2; // 동적으로 계산된 사각형 높이

        baseY = checkAndAddNewPage(baseY, calculatedRectHeight + rectPadding);
        scoreTitle(doc, title, baseY);

        doc.font('Pretendard').fontSize(10).fill('#000000');
        textLines?.forEach((line, index) => {
            doc.text(line, PAGE_MARGIN + 5, baseY + padding + index * lineHeight, {width: CONTENTS_WIDTH});
        });

        doc.rect(PAGE_MARGIN, baseY, CONTENTS_WIDTH, calculatedRectHeight).stroke('c9c9c9');
        baseY += calculatedRectHeight + rectPadding;
        return baseY;
    };

    addNewPage(doc);
    subTitle(doc, '시험 결과', 30);

    // 두 배열을 더 긴 배열의 길이에 맞춰 쌍으로 결합
    const maxLength = Math.max(picture1?.length, picture2?.length);
    const combinedPictures = Array.from({length: maxLength}, (_, index) => ({
        picture1: picture1[index] ? picture1[index]?.picture1.slice(1) : '',
        picture2: picture2[index] ? picture2[index]?.picture2.slice(1) : ''
    }));

    let currentY = 80; // 데이터 시작 위치

    currentY = addTextSection(doc, '평가항목', [evaluationItems], currentY);
    currentY = addTextSection(doc, '평가위치', [evaluationLocation], currentY);

    scoreTitle(doc, '평가사진', currentY);
    currentY += 20; // 타이틀 하단 간격

    combinedPictures.forEach((pictures) => {
        currentY = imgcheckAndAddNewPage(currentY, 260); // 이미지 높이 고려
        if (pictures.picture1) {
            drawTableContent(doc, currentY, 260, pictures, 'picture1', 0);
        }
        if (pictures.picture2) {
            drawTableContent(doc, currentY, 260, pictures, 'picture2', 268);
        }
        currentY += 260; // 이미지 높이와 간격을 더함
    });

    currentY += 20; // 타이틀 하단 간격
    currentY = addTextSection(doc, '평가내용', evaluationContent, currentY);

    currentY = addTextSection(doc, '평과결과 및 개선방안', evaluationResult, currentY);

    currentY = addTextSection(
        doc,
        '개선결과',
        improvementResult,

        currentY
    );

    // 두 배열을 더 긴 배열의 길이에 맞춰 쌍으로 결합
    const maxLengthnewP = Math.max(newPicture1?.length, newPicture2?.length);
    const combinednewPictures = Array.from({length: maxLength}, (_, index) => ({
        picture1: newPicture1[index] ? newPicture1[index]?.picture1.slice(1) : '',
        picture2: newPicture2[index] ? newPicture2[index]?.picture2.slice(1) : ''
    }));

    scoreTitle(doc, '개선사진', currentY);
    currentY += 20; // 타이틀 하단 간격

    combinednewPictures.forEach((pictures) => {
        currentY = imgcheckAndAddNewPage(currentY, 260); // 이미지 높이 고려
        if (pictures.picture1) {
            drawTableContent(doc, currentY, 260, pictures, 'picture1', 0);
        }
        if (pictures.picture2) {
            drawTableContent(doc, currentY, 260, pictures, 'picture2', 268);
        }
        currentY += 260; // 이미지 높이와 간격을 더함
    });

    currentY += 20; // 타이틀 하단 간격

    currentY = addTextSection(
        doc,
        '개선내용',
        improvementContent,

        currentY
    );
};

const addWaterTestResult3 = (doc, evaluationItems, evaluationLocation, picture1, picture2, evaluationContent, evaluationResult, improvementResult, newPicture1, newPicture2, improvementContent) => {
    const checkAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const imgcheckAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            return 30; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const svgcheckAndAddNewPage = (currentY, additionalHeight) => {
        if (currentY + additionalHeight > CONTENTS_END_Y) {
            addNewPage(doc);
            currentX = PAGE_MARGIN; // X 위치 초기화
            return PAGE_MARGIN; // 새로운 페이지에서 시작하는 Y 위치
        }
        return currentY;
    };

    const drawImage = (doc, imagePath, x, y, width, height) => {
        doc.image(imagePath, x, y, {width, height});
    };

    const drawTableContent = (doc, baseY, IMG_HEIGHT, data, imageKey, xOffset) => {
        drawImage(doc, data[imageKey], PAGE_MARGIN + xOffset + 0.5, baseY, 268 - 0.5, 260);
    };

    const addTextSection = (doc, title, textLines, baseY) => {
        const lineHeight = 15; // 각 줄의 높이
        const padding = 25; // 제목과 텍스트 섹션 간의 패딩
        const rectPadding = 15; // 사각형 내부의 패딩
        const calculatedRectHeight = textLines.length * lineHeight + padding + 2; // 동적으로 계산된 사각형 높이

        baseY = checkAndAddNewPage(baseY, calculatedRectHeight + rectPadding);
        scoreTitle(doc, title, baseY);

        doc.font('Pretendard').fontSize(10).fill('#000000');
        textLines.forEach((line, index) => {
            doc.text(line, PAGE_MARGIN + 5, baseY + padding + index * lineHeight, {width: CONTENTS_WIDTH});
        });

        doc.rect(PAGE_MARGIN, baseY, CONTENTS_WIDTH, calculatedRectHeight).stroke('c9c9c9');
        baseY += calculatedRectHeight + rectPadding;
        return baseY;
    };

    // SVG 섹션 추가 함수
    let currentX = PAGE_MARGIN;

    const addSVGSection = (doc, svgContent, baseY, width, height) => {
        if (currentX + width > CONTENTS_END_X) {
            currentX = PAGE_MARGIN;
            baseY += height + 15; // 다음 줄로 이동
        }

        baseY = svgcheckAndAddNewPage(baseY, height);

        SVGtoPDF(doc, svgContent, currentX, baseY, {width, height});
        currentX += width + BOX_MARGIN; // X 위치 업데이트

        return baseY;
    };

    addNewPage(doc);
    subTitle(doc, '시험 결과', 30);

    // 두 배열을 더 긴 배열의 길이에 맞춰 쌍으로 결합
    const maxLength = Math.max(picture1?.length, picture2?.length);
    const combinedPictures = Array.from({length: maxLength}, (_, index) => ({
        picture1: picture1[index] ? picture1[index]?.picture1.slice(1) : '',
        picture2: picture2[index] ? picture2[index]?.picture2.slice(1) : ''
    }));

    let currentY = 80; // 데이터 시작 위치

    currentY = addTextSection(doc, '평가항목', [evaluationItems], currentY);
    currentY = addTextSection(doc, '평가위치', [evaluationLocation], currentY);

    scoreTitle(doc, '평가사진', currentY);
    currentY += 20; // 타이틀 하단 간격

    combinedPictures.forEach((pictures) => {
        currentY = imgcheckAndAddNewPage(currentY, 260); // 이미지 높이 고려
        if (pictures.picture1) {
            drawTableContent(doc, currentY, 260, pictures, 'picture1', 0);
        }
        if (pictures.picture2) {
            drawTableContent(doc, currentY, 260, pictures, 'picture2', 268);
        }
        currentY += 260; // 이미지 높이와 간격을 더함
    });

    currentY += 20; // 타이틀 하단 간격

    currentY = addTextSection(doc, '평가내용', ['※ 소화수조 설치 상태 확인(옥내소화전 화재안전기준 제4조 의거)', ' 1. 수조의 외측에 수위계 설치 여부 확인', ' 2. 수조의 외측에 고정식 사다리 설치 여부 확인', ' 3. 조명설비 적정 여부 확인', ' 4. 수조의 밑 부문에 청소용 배수밸브 또는 배수관 설치 여부 확인', ' 5. 수조의 외측의 보기 쉬운 곳에 수조의 겸용되는 설비의 이름을 표시한 표지 설치 여부'], currentY);

    currentY = addTextSection(doc, '평과결과 및 개선방안', ['1. 소화수조 설치 상태 양호', '- 수조의 수위계 Level 상태 양호 하며, 수조의 표지 상태도 양호', '- 수조의 배관상태 양호', '- 수조의 표지 부착상태 양호'], currentY);

    currentY = addTextSection(
        doc,
        '개선결과',
        ['※ 소화수조 설치 상태 확인(옥내소화전 화재안전기준 제4조 의거)', ' 1. 수조의 외측에 수위계 설치 여부 확인', ' 2. 수조의 외측에 고정식 사다리 설치 여부 확인', ' 3. 조명설비 적정 여부 확인', ' 4. 수조의 밑 부문에 청소용 배수밸브 또는 배수관 설치 여부 확인', ' 5. 수조의 외측의 보기 쉬운 곳에 수조의 겸용되는 설비의 이름을 표시한 표지 설치 여부'],

        currentY
    );

    // 두 배열을 더 긴 배열의 길이에 맞춰 쌍으로 결합
    const maxLengthnewP = Math.max(newPicture1?.length, newPicture2?.length);
    const combinednewPictures = Array.from({length: maxLength}, (_, index) => ({
        picture1: newPicture1[index] ? newPicture1[index]?.picture1.slice(1) : '',
        picture2: newPicture2[index] ? newPicture2[index]?.picture2.slice(1) : ''
    }));

    scoreTitle(doc, '개선사진', currentY);
    currentY += 20; // 타이틀 하단 간격

    combinednewPictures.forEach((pictures) => {
        currentY = imgcheckAndAddNewPage(currentY, 260); // 이미지 높이 고려
        if (pictures.picture1) {
            drawTableContent(doc, currentY, 260, pictures, 'picture1', 0);
        }
        if (pictures.picture2) {
            drawTableContent(doc, currentY, 260, pictures, 'picture2', 268);
        }
        currentY += 260; // 이미지 높이와 간격을 더함
    });

    currentY += 20; // 타이틀 하단 간격

    currentY = addTextSection(
        doc,
        '개선내용',
        ['※ 소화수조 설치 상태 확인(옥내소화전 화재안전기준 제4조 의거)', ' 1. 수조의 외측에 수위계 설치 여부 확인', ' 2. 수조의 외측에 고정식 사다리 설치 여부 확인', ' 3. 조명설비 적정 여부 확인', ' 4. 수조의 밑 부문에 청소용 배수밸브 또는 배수관 설치 여부 확인', ' 5. 수조의 외측의 보기 쉬운 곳에 수조의 겸용되는 설비의 이름을 표시한 표지 설치 여부'],

        currentY
    );
};
