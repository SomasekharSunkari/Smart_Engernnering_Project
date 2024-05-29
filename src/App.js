import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import About from "./Components/About";
import HomeComponent from "./Components/HomeComponent";
import Upload from "./Components/Upload";
import Delete from "./Components/Delete";
import Update from "./Components/Update";
function App() {
  return (
    <>
      <div className="App w-screen min-h-screen bg-cover bg-fixed  bg-left">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            {/* <Route path="/service" element={<Services />}>
              <Route path="uploadfiles" element={<Upload />} />
              <Route path="updatefiles" element={<Update />} />
              <Route path="deletefiles" element={<Delete />} />
            </Route> */}
            <Route path="/service" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
      {/* <div className="w-screen min-h-screen bg-blue-400"></div> */}
    </>
  );
}

export default App;
