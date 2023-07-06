import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
