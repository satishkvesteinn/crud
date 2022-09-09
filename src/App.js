import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import View from "./components/students/View";
import Edit from "./components/students/Edit";

function App() {
  return (

    // Browser router
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route exact path="/" element={<Home />} />
        {/* view page */}
        <Route exact path="/view/:id" element={<View />} />
        {/* edit page */}
        <Route exact path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
