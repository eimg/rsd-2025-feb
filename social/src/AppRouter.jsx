import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Show from "./pages/Show";
import AddPost from "./pages/AddPost";

export default function() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/show/:id" element={<Show />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add" element={<AddPost />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
