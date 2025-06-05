import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { useNavigate } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Profile from "./components/Profile";
import RightBar from "./components/RightBar";
import MainLayout from "./Layouts/MainLayout";
import Chat from "./components/Chat";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Find from "./components/Find";
import News from "./components/News";
import Editor from "./components/editor";
import GroupList from "./components/Grouplist";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}>
          {" "}
        </Route>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={user ? <Home /> : <LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/find" element={<Find />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/editor" element={<Editor />}></Route>
        <Route
          path="/group"
          element={<GroupList currentUserId={user._id} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
