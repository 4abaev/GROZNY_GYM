import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoaches } from "../../features/coachSlice";
import { postForm } from "../../features/coachformSlice";
import styles from "./Coach.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";

const Coach = () => {
  const dispatch = useDispatch();
  const coaches = useSelector((state) => state.coach.coaches);
  const error = useSelector((state) => state.coach.error);
  const loading = useSelector((state) => state.coach.loading);
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [weight, setWeight] = useState("");
  const [isSport, setIsSport] = useState("");
  const [select, setSelect] = useState({
    _id: "63c7f17453f3e15520a46af8",
  });

  useEffect(() => {
    dispatch(fetchCoaches());
  }, [dispatch]);

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(postForm({ name, phone, weight, isSport }));
    if (name !== "" && weight !== "" && isSport !== "" && phone !== "") {
      return swal(
        "Форма отправлена",
        "We свяжемся с вами в ближайшее time",
        "success"
      );
    } else if (name === "" || weight === "" || isSport === "" || phone === "") {
      return swal("", "Заполните all поля", "warning");
    }
  };

  if (loading) {
    return <div className={styles.loader}>Loading</div>;
  }

  return (
    <main>
      {coaches.map((coach) => {
        if (coach._id === select._id) {
          return (
            <div className={styles.coachMain} key={coach._id}>
              <img
                className={styles.imgCoach}
                src={`http://localhost:4000/assets/images/coaches/${coach.image}`}
                alt="Фотография тренера"
              />
              <div className={styles.secondDiv}>
                <div className={styles.name}>{coach.name}</div>
                <div className={styles.description}>{coach.description}</div>
              </div>
              <div className={styles.form}>
                <Typography component="h1" variant="h5">
                  Чтобы записаться заполните форму
                </Typography>
                <Box
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
                    label="Ваше имя"
                    name="name"
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Иван"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="tel"
                    label="Контактный телефон"
                    type="tel"
                    id="tel"
                    autoComplete="tel"
                    onChange={(e) => setphone(e.target.value)}
                    value={phone}
                    placeholder="+79659506825"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="weight"
                    label="Ваш вес"
                    type="text"
                    id="weight"
                    autoComplete="weight"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    placeholder="99"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="isSport"
                    label="Какими видами спорта занимались?"
                    type="text"
                    id="isSport"
                    autoComplete="isSport"
                    onChange={(e) => setIsSport(e.target.value)}
                    value={isSport}
                    placeholder="Легкая атлетика"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Записаться
                  </Button>
                </Box>
              </div>
            </div>
          );
        }
      })}
      {coaches.map((coach) => {
        if (coach._id !== select._id) {
          return (
            <div className={styles.coachSecond} key={coach._id}>
              <div className={styles.imgBlock}>
                <img
                  className={styles.imgCoach}
                  src={`http://localhost:4000/assets/images/coaches/${coach.image}`}
                  alt="Фотография тренера"
                />
              </div>
              <div className={styles.name}>{coach.name}</div>
              <div className={styles.description}>{coach.description}</div>
              <button onClick={() => setSelect(coach)}>
                Подробнее
              </button>
            </div>
          );
        }
      })}
    </main>
  );
};

export default React.memo(Coach);
