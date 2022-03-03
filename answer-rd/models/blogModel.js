const db = require('./db')

module.exports = {
    getSwiperImg() {
        return db.query('select * from t_swiper_img');
    },
    getHead() {
        return db.query('select * from t_head');
    },
    getInfo() {
        return db.query(`
            select qus.question_id,qus.title,qus.hot,qus.img,usr.user_id,usr.username,cate.cate_name
            from t_question qus,t_user usr,t_category cate
            where qus.user_id = usr.user_id and qus.cate_id = cate.cate_id
        `);
    },
    getAllInfo() {
        return db.query('select * from t_question');
    },
    getByText(searchtext) {
        return db.query("select * from t_question where title like '%" + searchtext + "%'");
    },
    getByQuestionId(question_id) {
        return db.query('select * from t_answer where question_id=?', [question_id]);
    }
}