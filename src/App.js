import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Tips from "./components/Tips";
import Home from "./components/Home";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MyEvents from "./components/MyEvents";
import Todolist from "./components/Todolist";
import Budget from "./components/Budget";
import EventDetails from "./components/EventDetails";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>Tapis app</Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/tips">Vinkit</Link> <Link to="/home">etusivu</Link>{" "}
          <Link to="/events">my events</Link>{" "}
          <Routes>
            <Route path="/tips" element={<Tips />} />
            <Route path="/home" element={<Home />} />
            <Route path="/events" element={<MyEvents />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/events/:eventId/budget" element={<Budget />} />
            <Route path="/events/:eventId/todolist" element={<Todolist />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
