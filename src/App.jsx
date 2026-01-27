import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useState } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/country/:code" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;