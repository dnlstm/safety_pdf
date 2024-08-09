const express = require('express');
const router = express.Router();
const fse = require('fs-extra');
const CODE = require('../controllers/CODE');

// const User = require('../schemas/User');
const Main = require('../schemas/Main');

router.post('/main', async (req, res, next) => {
    const {id} = req.user;
    const {img} = req.body;

    // const {filename} = req.file;

    try {
        console.log(req.body);
        const main = await Main.create({
            names: req.body.names,
            rank: req.body.rank,
            department: req.body.department,
            workplace: req.body.workplace,
            buildingMaterial: req.body.buildingMaterial,
            buildingStructure: req.body.buildingStructure,
            TotalFloorArea: req.body.TotalFloorArea,
            BuildingArea: req.body.BuildingArea,
            numberofGroundFloors: req.body.numberofGroundFloors,
            NumberofBasementFloors: req.body.NumberofBasementFloors,
            MainUse: req.body.MainUse,
            DateofUse: req.body.DateofUse,
            img: req.body.img,
            id: id
        });
        console.log('데이터베이스 저장 완료');
        console.log('------------------------------ck', img.replace('img', 'uploads'), img.replace('/img', 'uploads'), img.replace('/img', 'uploads').replace('tmp', 'save').replace(`${id}-uploads`, `${id}-uploads/${main._id}`));

        fse.moveSync(img.replace('/img', 'uploads'), img.replace('/img', 'uploads').replace('tmp', 'save').replace(`${id}-uploads`, `${id}-uploads/${main._id}`));
        res.status(201).json({'code': CODE.SUCCESS});
        console.log(main);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// router.post('/join', async (req, res, next) => {
//     try {
//         const join = await Join.create({
//             id: req.body.id,
//             password: req.body.password,
//             name: req.body.name,
//             email: req.body.email
//         });
//         console.log(join);
//         res.status(201).json(join);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

module.exports = router;
