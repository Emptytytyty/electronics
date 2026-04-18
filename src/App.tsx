import "./App.css";
import "./variables.css";
import { Route, Routes } from "react-router";
import { Login } from "./components/pages/Login/Login";
import { Home } from "./components/pages/Home/Home";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Header } from "./components/Header/Header";
import { useDispatch, useSelector } from "./services/store";
import { getUserSelector, logout } from "./services/slices/UserSlice";
import { useCallback, useEffect } from "react";
import { clearStore } from "./services/slices/MainDataSlice";

function App() {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const handleRefreshWindow = useCallback(() => {
    if (user) {
      dispatch(logout(user));
      dispatch(clearStore());
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleRefreshWindow)
    return () => {
      window.removeEventListener('beforeunload', handleRefreshWindow);
    };
  }, [handleRefreshWindow]);

  return (
    <>
      <Header></Header>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>Страница не найдена 404</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
