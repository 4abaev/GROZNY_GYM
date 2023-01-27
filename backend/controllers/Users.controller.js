const User = require("../models/User.model");
const Subscription = require("../models/Subscription.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
module.exports.usersController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  editUser: async (req, res) => {
    const { id } = req.params;

    try {
      const hashPassword = bcrypt.hashSync(
        req.body.password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user2 = await User.findById( id );

      const user = await User.findByIdAndUpdate(id, {
        login: req.body.login.length <= 0 ? user2.login : req.body.login,
        password: hashPassword.length <= 0 ? user2.password : hashPassword,
        role: req.body.role.length <= 0 ? user2.role : req.body.role,
        banned: req.body.banned.length <= 0 ? user2.banned : req.body.banned,
        image: req.body.image.length <= 0 ? user2.image : req.body.image,
        name: req.body.name.length <= 0 ? user2.name : req.body.name,
        surname:
          req.body.surname.length <= 0 ? user2.surname : req.body.surname,
        patronymic:
          req.body.patronymic.length <= 0
            ? user2.patronymic
            : req.body.patronymic,
      });
      return res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { login, password, image, cash } = req.body;
      if (login.length === 0) {
        return res
          .status(401)
          .json({ error: "Имя пользователя не должно быть пустым" });
      }
      const errors = validationResult(req);
      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res
          .status(400)
          .json({ error: `Пользователь ${login} не найден` });
      }
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Пароль должен быть больше 4 символов",
        });
      }
      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res
          .status(401)
          .json({ error: "Неправильный логин или пароль!" });
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
        image: candidate.image,
        cash: candidate.cash
      };

      const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      res.json({ token, image, cash, login: payload.login, id: payload.id, candidate });
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  register: async (req, res) => {
    const { login, password } = req.body;
    if (login.length === 0) {
      return res
        .status(401)
        .json({ error: "Имя пользователя не должно быть пустым" });
    }
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Пароль должен быть больше 4 или меньше 10 символов",
        });
      }

      const candidate = await User.findOne({ login });
      if (candidate) {
        return res
          .status(400)
          .json({ error: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = User.create({
        login,
        password: hashPassword,
      });
      return res.json("Пользователь успешно зарегестрирован");
    } catch (error) {
      res.status(400).json("Registration Error" + error);
    }
  },

  getAssemblyCart: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).populate("subscription");

      return res.json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  //ДОБАВЛЕНИЕ АОНЕМЕНТА
  addToSubscription: async (req, res) => {
    try {

      const user = await User.findById(req.params.id).populate("subscription");
      const subs = await Subscription.findById(req.params.subId);

      const cash = user.cash;
      const price = subs.price;
      if ((user.subscription.findIndex((i) => String(i._id) === String(subs._id))) !== -1) {
        return res.json("sac del");
      }
      if (cash < price) {
        return res.json("недостаточно средств");
      }

      // const cash = await user.cash - subscription.price;
      const addToSubs = await User.findByIdAndUpdate(
        req.params.id,
        {
          $push: { subscription: req.params.subId },
          cash: cash - price,

        },
        { new: true }
      );
      res.json(addToSubs);

    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  //ПОПОЛНЕНИЕ СРЕДСТВ
  upBalance: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const newBalance = Number(user.cash) + Number(req.body.cash)
      await User.findByIdAndUpdate(req.params.id, { cash: newBalance });
      res.json(user.cash);

    } catch (error) {
      res.status(400).json(error.message);
    }
  },

  addToCartAssembly: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { cart: req.params.assemblyId },
        },
        { new: true }
      );
      return res.json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
  deleteAssemblyfromCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { cart: req.params.assemblyId },
      });
      return res.json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
