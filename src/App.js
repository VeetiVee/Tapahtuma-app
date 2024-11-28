import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Tips from "./components/Tips";
import Home from "./components/Home";
import MyEvents from "./components/MyEvents";
import Todolist from "./components/Todolist";
import Budget from "./components/Budget";
import Schedule from "./components/Schedule";
import EventDetails from "./components/EventDetails";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Tapis App
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/tips">
                Tips
              </Button>
              <Button color="inherit" component={Link} to="/events">
                My Events
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/tips" element={<Tips />} />
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<MyEvents />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/events/:eventId/budget" element={<Budget />} />
          <Route path="/events/:eventId/todolist" element={<Todolist />} />
          <Route path="/events/:eventId/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
