import { getUserSelector, logout } from "../../services/slices/UserSlice";
import { useDispatch, useSelector } from "../../services/store";
import "./Header.css";
import userImage from "../../assets/images/user.svg";
import { useCallback, useEffect, useRef } from "react";
import { clearStore } from "../../services/slices/MainDataSlice";

export const Header = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = useCallback(() => {
    if (user) {
      dispatch(logout(user));
      dispatch(clearStore());
    }
  }, [user]);

  useEffect(() => {
    if (logoutButtonRef.current)
      logoutButtonRef.current.addEventListener("click", handleLogout);

    return () => {
      if (logoutButtonRef.current)
        logoutButtonRef.current?.removeEventListener("click", handleLogout);
    };
  }, [logoutButtonRef.current, handleLogout]);

  return (
    <div className="header">
      <h1 className="logo">Electronics</h1>
      <div className="profile">
        <img
          src={userImage}
          alt="человечек в круге"
          className="profile__image"
        />
        {user && (
          <>
            <p className="profile__login">{user}</p>
            <button ref={logoutButtonRef} className="profile__logout">
              -Выйти-
            </button>
          </>
        )}
      </div>
    </div>
  );
};
