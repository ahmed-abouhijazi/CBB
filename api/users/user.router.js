const { createUser,
    getUsersById,
    getUsers,
    updateUser,
    deletUser } = require("./user.controller");
const router = require("express").Router();

router.post("/insert",createUser);
router.get("/getAll",getUsers);
router.get("/get/:id",getUsersById);
router.patch("/update",updateUser);
router.delete("/delete",deletUser)

module.exports = router;
