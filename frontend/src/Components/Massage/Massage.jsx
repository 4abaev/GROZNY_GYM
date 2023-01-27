import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMassage } from "../../features/massageSlice";
import { postForm } from "../../features/formSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "react-reveal/Fade";
import styles from "./Massage.module.scss";
import photo from "../../images/massage2.jpg";
import photo2 from "../../images/massage.jpg";
import { separator } from "../helpers/separator";
import swal from "sweetalert";

const Massage = () => {
  const massage = useSelector((state) => state.massage.massage);
  const loading = useSelector((state) => state.massage.loading);
  const error = useSelector((state) => state.massage.error);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [forWhichMassage, setforWhichMassage] = useState("");

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetPhone = (e) => {
    setphone(e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetMassaje = (e) => {
    setforWhichMassage(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(postForm({ name, phone, email, forWhichMassage }));
    if (name !== "" && email !== "" && forWhichMassage !== "" && phone !== "") {
      return swal(
        "Форма отправлена",
        "We свяжемся с you в ближайшее time",
        "success"
      );
    } else if (
      name === "" ||
      email === "" ||
      forWhichMassage === "" ||
      phone === ""
    ) {
      return swal("", "Заполните all поля", "warning");
    }
  };

  useEffect(() => {
    dispatch(getMassage());
  }, [dispatch]);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (loading) {
    return <div className={styles.loader}>Loading</div>;
  }

  return (
    <>
      <Fade left cascade>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.p1}>
              Мало who знает, что массаж very полезен в комплексе с физическими
              нагрузками and просто необходим тем, кто занимается sports и
              посещает спортзал.
            </div>
            <div>
              Вместе с team массажистов Grozny Gym we решили рассказать, how
              массаж влияет на body в зависимости от вида спортивных нагрузок,
              какие виды массажа полезны для тех, who посещает тренажерный зал,
              and how часто нужно посещать сеансы массажа в сочетании со sports.
            </div>
            <div>
              Спорт и массаж together отлично работают на оздоровление организма в
              целом. They помогают избавиться от стресса, улучшают work
              сердечно-сосудистой системы, активизируют и приводят в норму
              work органов и полезны для профилактики неврозов, бессонницы,
              инфарктов и инсультов.
            </div>
          </div>
          <div className={styles.image}>
            <img src={photo} alt="massage" />
            <div className={styles.content}>
              <h3>ПОЛЬЗА МАССАЖА В КОМПЛЕКСЕ С ТРЕНИРОВКАМИ</h3>
            </div>
          </div>
        </div>
      </Fade>
      <Fade right cascade>
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <img src={photo2} alt="massage" />
            <div className={styles.content}>
              <h3>
                Какую пользу приносит массаж body after физических нагрузок?
              </h3>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <ul>
                <li>
                  Помогает восстановить work мышц и снять усталость и
                  напряжение after тренировки.
                </li>
                <li>
                  Усиливает метаболические процессы и питание тканей, улучшает
                  обмен веществ в клетках. Как результат — запускает процесс
                  похудения.
                </li>
                <li>
                  Способствует восстановлению и омоложению организма, улучшает
                  эмоциональное и physical state, запускает полноценную
                  детоксикацию и очищение организма.
                </li>
                <li>Улучшает дыхание, метаболизм и питание muscular тканей.</li>
                <li>Улучшает work нервной системы.</li>
                <li>
                  Дает ощущение легкости в body за счет вывода лишней жидкости и
                  молочной кислоты.
                </li>
                <li>
                  Улучшает mood и снимает ощущение усталости after
                  тренировки.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.noWrapper}>Наши услуги</div>
        <div className={styles.wrapper2}>
          {massage.map((item) => {
            return (
              <div className={styles.cards} key={item._id}>
                <div className={styles.photo}>
                  <img
                    src={`assets/images/massage/${item.image}`}
                    alt="massage"
                  />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <hr />
                </div>
                <div className={styles.textContainer}>
                  <h6>{item.description}</h6>
                </div>
                <div>
                  <p>{separator(item.price)} ₽</p>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className={styles.audit}>Как записаться на массаж</h1>
      </Fade>
      <Fade bottom cascade>
        <div className={styles.wrapper3}>
          <div className={styles.form}>
            <Typography component="h1" variant="h4" className={styles.typo}>
              Заполните форму
            </Typography>
            <Box
              className={styles.box}
              component="form"
              noValidate
              onSubmit={handleForm}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Имя"
                name="name"
                autoComplete="name"
                onChange={handleSetName}
                value={name}
                placeholder="Билли"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Электронная почта"
                type="mail"
                id="mail"
                autoComplete="mail"
                onChange={handleSetEmail}
                value={email}
                placeholder="example@mail.ru"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="tel"
                label="Телефон"
                type="tel"
                id="tel"
                autoComplete="tel"
                onChange={handleSetPhone}
                value={phone}
                placeholder="+79659506825"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="massage"
                label="На какой массаж?"
                type="text"
                id="massage"
                autoComplete="massage"
                onChange={handleSetMassaje}
                value={forWhichMassage}
                placeholder="На массаж шеи"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Отправить
              </Button>
            </Box>
          </div>
          <Typography component="h1" variant="h5">
            ИЛИ
          </Typography>
          <div className={styles.call}>
            <Typography component="h1" variant="h5">
              <div>Запишитесь по телефону</div>
            </Typography>
            <div className={styles.phone}>
              Позвоните в department продаж
              <a href="tel:+7937 935 99 92"> +7(937) 935 99 92</a>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default React.memo(Massage);
