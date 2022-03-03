const db = require('./db')

module.exports = {
    getByNameAndPwd(username, pass) {
        return db.query('select * from t_user where username=? and pass=?', [username, pass]);
    },
    getByUserId(userId) {
        return db.query('select username, avatar, is_publisher from t_user where user_id=?', [userId]);
    },
    saveInfo(username, password, identity) {
        return db.query('insert into t_user (username, pass, is_student) values(?,?,?)', [username, password, identity]);
    },
    getByUserName(username) {
        return db.query('SELECT * FROM t_user WHERE username=?', [username]);
    },
    saveAnswer(answertext) {
        return db.query('insert into t_answer (content) values(?)', [answertext]);
    },

}