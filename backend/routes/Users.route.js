const { usersController } = require("../controllers/Users.controller");
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, usersController.getUsers);
router.patch("/edituser/:id", usersController.editUser);
router.post(
  "/registration",
  [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 символов"
    ).isLength({ min: 4, max: 20 }),
  ],
  usersController.register
);
router.post(
  "/login",
  [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 символов"
    ).isLength({ min: 4, max: 20 }),
  ],
  usersController.login
);
router.patch('/addtoCart/:userId/:assemblyId', authMiddleware, usersController.addToCartAssembly)
router.get('/cart/:userId',  usersController.getAssemblyCart)
router.patch('/delete/cart/:userId/:assemblyId', authMiddleware, usersController.deleteAssemblyfromCart)
router.patch("/addtoSubs/:id/:subId", authMiddleware, usersController.addToSubscription) //ПРиобретение подписки
router.patch("/upbalance/:id", usersController.upBalance) // пополнение счета

module.exports = router;
