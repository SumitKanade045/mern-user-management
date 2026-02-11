const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const { validateUser } = require("../middleware/validationMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/", controller.getUsers);
router.get("/export", controller.exportUsers);
router.get("/search", controller.getUsers); // Using getUsers for search as well
router.get("/:id", controller.getUserById);
router.post("/", upload.single("avatar"), validateUser, controller.createUser);
router.put("/:id", upload.single("avatar"), validateUser, controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
