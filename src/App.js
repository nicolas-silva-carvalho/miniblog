import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";

import { AuthProvider } from "./context/authContext";

import { useAuthentication } from "./hooks/useAuthentication";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import DashBoard from "./pages/Dashboard/DashBoard";
import Search from "./pages/Search/Search";
import Post from "./pages/Posts/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user == undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  // if (loadingUser) {
  //   return <p>Carregando...</p>;
  // }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar></NavBar>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/about" element={<About></About>}></Route>
              <Route path="/search" element={<Search></Search>}></Route>
              <Route path="/posts/:id" element={<Post></Post>}></Route>
              <Route
                path="/login"
                element={!user ? <Login></Login> : <Navigate to="/"></Navigate>}
              ></Route>
              <Route
                path="/register"
                element={
                  !user ? <Register></Register> : <Navigate to="/"></Navigate>
                }
              ></Route>
              <Route
                path="/posts/create"
                element={
                  user ? (
                    <CreatePost></CreatePost>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/posts/edit/:id"
                element={
                  user ? (
                    <EditPost></EditPost>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/dashboard"
                element={
                  user ? (
                    <DashBoard></DashBoard>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
            </Routes>
          </div>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
