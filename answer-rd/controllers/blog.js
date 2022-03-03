const blogModel = require("../models/blogModel");

module.exports = {
    getSwiperImg: async(ctx) => {
        let image = await blogModel.getSwiperImg();
        ctx.body = {
            state: "success",
            image,
        };
    },
    getHead: async(ctx) => {
        let head = await blogModel.getHead();
        ctx.body = {
            state: "success",
            head,
        };
    },
    getInfo: async(ctx) => {
        let info = await blogModel.getInfo();
        // console.log(info)
        ctx.body = {
            state: "success",
            info,
        };
    },
    getAllInfo: async(ctx) => {
        let info = await blogModel.getAllInfo();
        ctx.body = {
            state: "success",
            info,
        };
    },
    getSearch: async(ctx) => {
        //接数据
        let text = ctx.request.body;
        //验证信息
        // console.log(text.searchtext)
        let results = await blogModel.getByText(text.searchtext);
        // console.log(results)
        if (results.length > 0) {
            ctx.body = {
                code: 2200,
                data: {
                    state: "success",
                    results
                },
            };
        }
    },
    getAnswer: async(ctx) => {
        //接数据
        let answer = ctx.request.body;
        //验证信息
        // console.log(text.searchtext)
        let results = await blogModel.getByQuestionId(answer.question_id);
        // console.log(results)
        if (results.length > 0) {
            ctx.body = {
                code: 2200,
                data: {
                    state: "success",
                    results
                },
            };
        }
    },
};