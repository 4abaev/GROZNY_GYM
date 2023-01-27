import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.scss";
import logo from "../../images/logo.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BalansUp } from "../../features/usersSlice";
import PaymentForm from "./Cards";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const login = useSelector((state) => state.users.login);

  const user = useSelector((state) => state.users.users);
  console.log(user, "users");

  //UPBALAnce
  const dispatch = useDispatch();

  const [balance, setBalance] = useState("");

  const UpBalanc = async (e) => {
    e.preventDefault();
    dispatch(BalansUp({ balance, id }));
    setBalance("");
  };

  const handleSetBalance = (e) => {
    setBalance(e.target.value);
  };
  //

  const clearToken = () => {
    window.location.reload();
    localStorage.clear(token);
  };

  const handleClick = () => {
    setShow(false);
    window.location.href = "/login";
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);

  return (
    <header>
      <div className={styles.logo}>
        <a href="/">
          {" "}
          <img src={logo} alt="logoPhoto" className={styles.logoImage} />
        </a>
      </div>

      <div className={styles.routes}>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#960018" : "white",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "6px",
            };
          }}
          className={styles.navigationButton}
          to="/simulators"
        >
          Тренажёры
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#960018" : "white",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "6px",
            };
          }}
          className={styles.navigationButton}
          to="/coaches"
        >
          Тренеры
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#960018" : "white",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "6px",
            };
          }}
          className={styles.navigationButton}
          to="/massage"
        >
          Массаж
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#960018" : "white",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "6px",
            };
          }}
          className={styles.navigationButton}
          to="/sports_bar"
        >
          Спорт-Бар
        </NavLink>
      </div>

      <div className={styles.burger} onClick={handleShow}>
        <GiHamburgerMenu />
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll="true"
        className={styles.offcanvas}
      >
        <Offcanvas.Header className={styles.offcanvas_header} closeButton>
          <Offcanvas.Title className={styles.offcanvas_title}>
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.offcanvas_body}>
          <div className={styles.auth}>
            <Link to="/login" hidden={token}>
              <button onClick={handleClick} className={styles.bottone1}>
                <strong>Личный кабинет</strong>
              </button>
            </Link>
          </div>
          {token && (
            <>
              <div className={styles.profilebox}>
                <div className={styles.nickname}>{login}</div> |
                <div
                  className={styles.profile}
                  onClick={() => window.location.reload()}
                >
                  <Link to="/admin/edituser">Личный кабинет</Link>
                </div>
                |
                <div className={styles.logoutbtn}>
                  <button onClick={clearToken}>Выйти</button>
                </div>
              </div>
              <div className={styles.user_ca2sh}>
                <div> Денег на счету:{user.cash}</div>
                <Button onClick={handleOpen}>Пополнить счет</Button>
                <Modal
                  open={open}
                  onClose={HandleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      color="#631b1b"
                      variant="h4"
                      component="h2"
                    >
                      Оплата банковской картой
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                    ></Typography>
                    <Typography>
                      <form onSubmit={UpBalanc} required action="submit">
                        <PaymentForm />
                        <FormControl fullWidth sx={{ m: 1 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Amount
                          </InputLabel>
                          <OutlinedInput
                            //  sx={{ m: 2 }}
                            id="outlined-adornment-amount"
                            value={balance}
                            onChange={handleSetBalance}
                            startAdornment={
                              <InputAdornment required position="start">
                                ₽
                              </InputAdornment>
                            }
                            label="Amount"
                          />
                          <button
                            className={styles.payBTN}
                            color="error"
                            variant="outlined"
                            size="large"
                            type="submit"
                          >
                            PAY
                          </button>
                        </FormControl>
                        {/* <input onChange={handleSetBalance} value={balance} /> */}
                      </form>
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
