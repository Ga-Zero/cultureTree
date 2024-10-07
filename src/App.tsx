import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Rank from "./pages/Rank";
import Recommend from "./pages/Recommend";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Hall from "./pages/Hall";

function App() {
  console.log("as");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/recommend" element={<Recommend />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/hall" element={<Hall />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
