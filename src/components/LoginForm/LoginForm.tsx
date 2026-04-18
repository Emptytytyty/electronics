import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { getLoginError, loginAction } from "../../services/slices/UserSlice";
import "./LoginForm.css";

type LoginFormProps = {};

export const LoginForm = ({}: LoginFormProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(getLoginError);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAction({ login, password }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login__form">
        <label className="login__label">
          <span>Логин</span>
          <input
            className="login__input login__input-login"
            type="text"
            name="login"
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="IvanovII"
          />
        </label>
        <label className="login__label">
          <span>Пароль</span>
          <input
            className="login__input login__input-password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="*********"
          />
        </label>
        <button className="login__button">Войти</button>
        {error && <span className="login__error">{error}</span>}
      </form>
    </>
  );
};
