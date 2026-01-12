import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { refresh } from "./redux/auth/operations";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import AuthPage from "./components/AuthPage/AuthPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import MyLibraryPage from "./components/MyLibraryPage/MyLibraryPage";
import RecommendedBooks from "./components/RecommendedBooks/RecommendedBooks";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isRefreshing) {
    return <b>Loading user data...</b>;
  }

  return (
    <Routes>
      <Route
        path="/register"
        element={
          <RestrictedRoute redirectTo="/recommended">
            <AuthPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/recommended">
            <AuthPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/recommended"
        element={
          <PrivateRoute redirectTo="/login">
            <RecommendedPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/library"
        element={
          <PrivateRoute redirectTo="/login">
            <MyLibraryPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute redirectTo="/login">
            <RecommendedBooks />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
