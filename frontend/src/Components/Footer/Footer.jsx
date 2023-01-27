import React from "react";
import styles from "./Footer.module.scss";
import visa from "../../images/visa.png";
import mc from "../../images/mc.png";
import mir from "../../images/mir.png";
import vk from "../../images/vk.svg";
import tg from "../../images/tg.svg";

const Footer = () => {
  return (
    <footer>
      <div className={styles.cards}>
        <div>
          <img src={visa} alt="visa" />
        </div>
        <div>
          <img src={mc} alt="mc" />
        </div>

        <div>
          <img src={mir} alt="mir" />
        </div>
      </div>
      <div className={styles.services}>
        <div className={styles.title}>Услуги</div>
        <p>Фитнес-программы</p>
        <p>Детский клуб</p>
        <p>Персональный тренинг</p>
        <a href="/massage">Массаж</a>
      </div>
      <div className={styles.work}>
        <div className={styles.title}>Работа</div>
        <a href="/job">Вакансии</a>
      </div>
      <div className={styles.clubCards}>
        <div className={styles.title}>Клубные карты</div>
        <p>Виды клубных карт</p>
        <p>Персональные тренировки</p>
      </div>
      <div className={styles.social}>
        <div className={styles.title}>Мы в соцсетях</div>
        <div>
          <a href="http://vk.com" target="_blank" rel="noreferrer">
            <img src={vk} alt="vk" />
          </a>
          <a href="http://telegram.com" target="_blank" rel="noreferrer">
            <img src={tg} alt="tg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
