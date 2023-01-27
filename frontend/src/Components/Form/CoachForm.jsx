import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForm, deleteForm } from "../../features/coachformSlice";
import styles from "./CoachForm.module.scss";

const Form = () => {
  const form = useSelector((state) => state.coachform.coachform);
  const loading = useSelector((state) => state.coachform.loading);
  const error = useSelector((state) => state.coachform.error);

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(deleteForm({ id }));
  };

  useEffect(() => {
    dispatch(getForm());
  }, [dispatch]);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <div className={styles.main}>
      {loading && <div className={styles.loader}>Loading</div>}
        {form.map((item) => {
          return (
            <div className={styles.forms} key={item._id}>
              <p>Заявка №{item._id}</p>
              <div>Имя: {item.name}</div>
              <div>Телефон: {item.phone}</div>
              <div>Вес: {item.weight} кг</div>
              <div>Какими видами спорта занимались?: {item.isSport}</div>
              <button onClick={() => handleRemove(item._id)}>
                Удалить заявку
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(Form);
