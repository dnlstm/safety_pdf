const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
// const sharp = require('sharp');

const {evalafterUploadImage, resultid, evaluateSituation, equipmentSituation, updateEvaluation, newEquipmentSituation, evaluateWater, evaluateWater2, updateWaterAll, getLatestData, evaluateWaterver2, evaluateWater2ver2, V2updateWaterAll, V2getLatestData, V2evalafterUploadImage, evaluateGas2, evaluateGas, updateGasAll, getLatestGasData, evalafterUploadImage3, createPdf} = require('../controllers/post');
const {isLoggedIn} = require('../middlewares');
const {newevaluation} = require('../controllers/post');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fse.ensureDirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            try {
                fs.readdirSync(`uploads/tmp/${req.params.id}-uploads/Water${req.params?.page}`);
            } catch (error) {
                console.error(`uploads/tmp/${req.params.id}-uploads 폴더가 없어 uploads/tmp/${req.params.id}-uploads 폴더를 생성합니다.`);
                fse.ensureDirSync(`uploads/tmp/${req.params.id}-uploads/Water${req.params?.page}`);
            }

            // fse.emptyDirSync(`uploads/${req.params.id}-uploads`);
            cb(null, `uploads/tmp/${req.params.id}-uploads/Water${req.params?.page}`);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    })
});
const V2upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            try {
                fs.readdirSync(`uploads/tmp/${req.params.id}-uploads/V2Water${req.params?.page}`);
            } catch (error) {
                console.error(`uploads/tmp/${req.params.id}-uploads 폴더가 없어 uploads/tmp/${req.params.id}-uploads 폴더를 생성합니다.`);
                fse.ensureDirSync(`uploads/tmp/${req.params.id}-uploads/V2Water${req.params?.page}`);
            }

            // fse.emptyDirSync(`uploads/${req.params.id}-uploads`);
            cb(null, `uploads/tmp/${req.params.id}-uploads/V2Water${req.params?.page}`);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    })
});

const upload3 = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            try {
                fs.readdirSync(`uploads/tmp/${req.params.id}-uploads/Gas${req.params?.page}`);
            } catch (error) {
                console.error(`uploads/tmp/${req.params.id}-uploads 폴더가 없어 uploads/tmp/${req.params.id}-uploads 폴더를 생성합니다.`);
                fse.ensureDirSync(`uploads/tmp/${req.params.id}-uploads/Gas${req.params?.page}`);
            }

            // fse.emptyDirSync(`uploads/${req.params.id}-uploads`);
            cb(null, `uploads/tmp/${req.params.id}-uploads/Gas${req.params?.page}`);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    })
});

const upload2 = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            try {
                fs.readdirSync(`uploads/picture`);
            } catch (error) {
                console.error(`uploads/picture 폴더를 생성합니다.`);
                fse.ensureDirSync(`uploads/picture`);
            }

            // fse.emptyDirSync(`uploads/${req.params.id}-uploads`);
            cb(null, `uploads/picture`);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    })
});

// router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

router.post(`/evalimg/:id/Water:page`, isLoggedIn, upload.fields([{name: 'picture1'}, {name: 'picture2'}, {name: 'newPicture1'}, {name: 'newPicture2'}]), evalafterUploadImage);

router.post(`/V2evalimg/:id/Water:page`, isLoggedIn, V2upload.fields([{name: 'picture1'}, {name: 'picture2'}, {name: 'newPicture1'}, {name: 'newPicture2'}]), V2evalafterUploadImage);

router.post(`/evalimg/:id/Gas:page`, isLoggedIn, upload3.fields([{name: 'picture1'}, {name: 'picture2'}, {name: 'newPicture1'}, {name: 'newPicture2'}]), evalafterUploadImage3);

router.get('/updateWaterAll/:id', isLoggedIn, updateWaterAll);

router.get('/V2updateWaterAll/:id', isLoggedIn, V2updateWaterAll);

router.get('/updateGasAll/:id', isLoggedIn, updateGasAll);

router.get('/getLatestData/:id/Water:page', isLoggedIn, getLatestData);

router.get('/V2getLatestData/:id/Water:page', isLoggedIn, V2getLatestData);

router.get('/getLatestData/:id/Gas:page', isLoggedIn, getLatestGasData);

router.get('/result/:id', isLoggedIn, resultid);

router.get('/evaluateSituation/:evaluateId', isLoggedIn, evaluateSituation);

router.post('/newevaluation', isLoggedIn, upload2.single('picture'), newevaluation);

router.put('/evaluateSituation/:evaluateId', isLoggedIn, upload2.single('picture'), updateEvaluation);

router.get('/equipmentSituation/:evaluateId', isLoggedIn, equipmentSituation);

router.post('/equipmentSituation/:evaluateId', isLoggedIn, newEquipmentSituation);

router.post('/evaluateWater/:evaluateId', isLoggedIn, evaluateWater);

router.get('/evaluateWater/:evaluateId', isLoggedIn, evaluateWater2);

router.post('/evaluateGas/:evaluateId', isLoggedIn, evaluateGas);

router.get('/evaluateGas/:evaluateId', isLoggedIn, evaluateGas2);

router.post('/evaluateWaterver2/:evaluateId', isLoggedIn, evaluateWaterver2);

router.get('/evaluateWaterver2/:evaluateId', isLoggedIn, evaluateWater2ver2);

router.get('/create-pdf/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;

    try {
        const pdfPath = await createPdf(id);
        res.json({message: 'PDF created successfully', path: pdfPath});
    } catch (error) {
        res.status(500).json({error: 'Failed to create PDF'});
    }
});

module.exports = router;
