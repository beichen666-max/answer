const router = require("koa-router")();

const blog = require("../controllers/blog");

router.get("/image", blog.getSwiperImg);
router.get("/head", blog.getHead);
router.get("/info", blog.getInfo);
router.post("/answer", blog.getAnswer);
router.get("/allinfo", blog.getAllInfo);
router.post("/search", blog.getSearch);

module.exports = router;