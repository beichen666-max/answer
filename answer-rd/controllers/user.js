// 引入jwt 秘钥之类的东西
var jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

let mySecretKey = 'eqfwe45%^&(*(&4656)))_4*%#';

module.exports = {
    loginApp: async(ctx) => {
        // 1. 接数据
        let user = ctx.request.body;
        // 2. 验证
        // 3. 查数据库
        let res = await userModel.getByNameAndPwd(user.username, user.password);
        if (res.length > 0) {
            ctx.body = {
                code: 2200, //操作成功 一切正常
                data: {
                    state: 'success',
                    avatar: res[0].avatar,
                    username: res[0].username,
                    identity: res[0].is_student
                },
            };
        } else {
            ctx.body = {
                code: 00,
                data: {
                    state: 'fail',
                },
            };
        }
    },

    loginWeb: async(ctx) => {
        // 1. 接数据
        let user = ctx.request.body;
        // 2. 验证
        // 3. 查数据库
        let res = await userModel.getByNameAndPwd(user.username, user.pass);
        if (res.length > 0) {
            // payload装载 是一个对象 存用户的东西
            let payload = {
                userId: res[0].user_id,
                username: res[0].username
            }

            // 登录成功，生成token    mySecretKey秘钥    expiresIn是一个对象 可以设置过期时间
            let token = jwt.sign(payload, mySecretKey, { expiresIn: '2d' });
            //生成签名
            ctx.body = {
                code: 2200, //操作成功 一切正常
                data: {
                    state: 'success',
                    token,
                    userId: res[0].user_id,
                },
            };
        } else {
            ctx.body = {
                code: 2200,
                data: {
                    state: 'fail',
                },
            };
        }
    },
    register: async(ctx) => {
        // 接数据
        let { username, password, identity } = ctx.request.body;
        //验证信息
        let results = await userModel.getByUserName(username);
        if (results.length > 0) {
            ctx.body = {
                code: 2200,
                data: {
                    state: "error_user_exists",
                },
            };
        } else {
            //将用户信息插入数据库
            let results2 = await userModel.saveInfo(username, password, identity);
            if (results2.affectedRows > 0) {
                ctx.body = {
                    code: 2200,
                    data: {
                        state: "success"
                    }
                }
            } else {
                ctx.body = {
                    code: 2500,
                    data: {
                        state: "error_insert_fail"
                    }
                }

            }
        }

    },

    // register: async(ctx) => {
    //     //接数据
    //     let { username, pass, tel, identity } = ctx.request.body;
    //     //验证信息
    //     let results = await userModel.getByUserName(username);
    //     if (results.length > 0) {
    //         ctx.body = {
    //             code: 2200,
    //             data: {
    //                 state: "error_user_exists",
    //             },
    //         };
    //     } else {
    //         //将用户信息插入数据库
    //         let results2 = await userModel.saveInfo(username, pass, tel, identity);
    //         if (results2.affectedRows > 0) {
    //             ctx.body = {
    //                 code: 2200,
    //                 data: {
    //                     state: "success"
    //                 }
    //             }
    //         } else {
    //             ctx.body = {
    //                 code: 2500,
    //                 data: {
    //                     state: "error_insert_fail"
    //                 }
    //             }

    //         }
    //     }

    // },
    checkLogin: async(ctx) => {
        try {
            let accessToken = ctx.header.authorization;
            //解密
            jwt.verify(accessToken, mySecretKey);
            ctx.body = {
                code: 2200,
                state: 'success'
            }
        } catch (err) {
            // ctx.status = 401;
            ctx.body = {
                code: 1401,
                state: 'fail'
            }
        }
    },
    getUserInfo: async(ctx) => {
        try {
            let token = ctx.header.authorization;
            let decoded = jwt.verify(token, mySecretKey)
                // console.log(decoded) //{ userId: 1, username: 'lisi', iat: 1636552615, exp: 1636725415 }
                // let { userId } = decoded  //解构的方法写也对
            userId = decoded.userId
            let results = await userModel.getByUserId(userId);
            // console.log(results);
            //   [ RowDataPacket {
            //     username: 'lisi',
            //     avatar: 'uploads/avatars/20211106/1.webp'
            //   }]
            if (results.length > 0) {
                ctx.body = {
                    code: 2200,
                    data: {
                        userInfo: results[0],
                    },
                };
            }
        } catch (err) {
            console.log(err);
        }
    },
    answer: async(ctx) => {
        let answer = ctx.request.body
        console.log(answer)
        let results = await userModel.saveAnswer(answer.answertext);
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 2200,
                data: {
                    state: "success"
                }
            }
        } else {
            ctx.body = {
                code: 2500,
                data: {
                    state: "error_insert_fail"
                }
            }

        }
    }
}