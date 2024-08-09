const bcrypt = require('bcrypt');
const passport = require('passport');
const Join = require('../schemas/Join');
const CODE = require('./CODE');
const Main = require('../schemas/Main');
const NewEvaluation = require('../schemas/NewEvaluation');
const WaterAll = require('../schemas/Water/WaterAll');

exports.join = async (req, res, next) => {
    const {id, password, names, email, office, phone} = req.body;
    try {
        const exIdUser = await Join.findOne({id});
        if (exIdUser) {
            return res.json({'code': CODE.FAIL, 'message': '이미 존재하는 아이디입니다.'}), console.log('이미 존재하는 아이디입니다.');
        }
        const exEmailUser = await Join.findOne({email});
        if (exEmailUser) {
            return res.json({code: CODE.FAIL, 'message': '이미 존재하는 이메일입니다.'}), console.log('이미 존재하는 이메일입니다.');
        }

        const exPhoneUser = await Join.findOne({phone});
        if (exPhoneUser) {
            return res.json({code: CODE.FAIL, 'message': '이미 존재하는 전화번호입니다.'}), console.log('이미 존재하는 전화번호입니다.');
        }

        const hash = await bcrypt.hash(password, 12);
        const user = await Join.create({
            id,
            password: hash,
            names,
            email,
            office,
            phone
        });
        res.status(201).json({'code': CODE.SUCCESS});
        console.log(user);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.json({code: CODE.FAIL, 'message': info.message});
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({'code': CODE.SUCCESS}), console.log('로그인 성공');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.json({'code': CODE.SUCCESS});
        console.log('로그아웃 성공');
    });
};

exports.islogin = (req, res) => {
    res.json(req.user.id);
};

exports.idSearch = async (req, res, next) => {
    const {names, email} = req.body;
    try {
        const exIdUser = await Join.findOne({names});
        console.log(exIdUser);

        if (!exIdUser) {
            return res.json({'code': CODE.FAIL, 'message': '가입하지 않은 이름입니다.'});
            console.log('가입하지 않은 이름입니다.');
            console.log(exIdUser);
        }

        if (!(exIdUser.email === email)) {
            return res.json({code: CODE.FAIL, 'message': '이메일이 잘못되었습니다.'});
            console.log('이메일이 잘못되었습니다.');
            console.log(exEmailUser);
        }

        res.json({'code': CODE.SUCCESS, 'message': '이메일로 Id를 보냈습니다.'});
        console.log('이메일로 Id를 보냈습니다.');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.pwSearch = async (req, res, next) => {
    const {id, email} = req.body;
    try {
        const exIdUser = await Join.findOne({id});
        if (!exIdUser) {
            return res.json({'code': CODE.FAIL, 'message': '가입하지 않은 Id입니다.'});

            console.log('가입하지 않은 Id입니다.');
        }
        if (!(exIdUser.email === email)) {
            return res.json({code: CODE.FAIL, 'message': '이메일이 잘못되었습니다.'});

            console.log('이메일이 잘못되었습니다.');
        }

        res.json({'code': CODE.SUCCESS, 'message': '이메일로 비밀번호를 보냈습니다.'});
        console.log('이메일로 Password를 보냈습니다.');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.mylistview = async (req, res, next) => {
    const {id} = req.user;

    try {
        const exIdUser = await Main.find({id});

        res.json({'code': CODE.SUCCESS, 'mylistview': exIdUser});
        console.log('mylistview데이터 전송 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
exports.list = async (req, res, next) => {
    try {
        const evaluations = await NewEvaluation.find({
            $or: [{'userid.admin': req.user.id}, {'userid.userid': req.user.id}]
        }).sort({_id: -1});

        const evaluationsWithWaterAll = await Promise.all(
            evaluations.map(async (evaluation) => {
                const waterAll = await WaterAll?.findOne({author: evaluation._id});
                return {
                    ...evaluation.toObject(),
                    hasWaterAll: !!waterAll
                };
            })
        );

        res.json(evaluationsWithWaterAll);
        console.log('list데이터 전송 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
exports.evaluater = async (req, res, next) => {
    try {
        const tableData = await Join.find();

        for (let i = 1; i < pageSize + 1; i++) {
            const pu = tableData[i + (page - 1) * pageSize];
            undefined !== pu && projects.push(pu);
        }
        res.json(projects);

        console.log('list데이터 전송 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.deleteEV = async (req, res, next) => {
    const _id = req.body.id;
    try {
        await NewEvaluation.findByIdAndDelete(_id);

        res.status(201).json('deleteEV 성공');
        console.log('deleteEV 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.updateEV = async (req, res, next) => {
    const _id = req.body.id;
    const {evaluation, adde} = req.body;
    console.log(_id, evaluation, adde);
    try {
        const username = adde.map((item) => item.info[0]);

        const userid = adde.map((item) => item.info[1]);

        const user = await NewEvaluation.findByIdAndUpdate(_id, {...evaluation, userid, username}, {new: true});

        res.status(201).json(user);
        console.log(user);

        console.log('updateEV 성공');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
