import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/signin.component";

const Shop = () => {
  return <h1>Shop page</h1>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
