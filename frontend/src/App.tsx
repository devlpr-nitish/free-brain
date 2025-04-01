import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import AddContent from "./pages/AddContent";
import "./index.css";
import DetailContent from "./pages/DetailContent";
import { TypesProvider } from "./contexts/TypesContect";
import Auth from "./pages/Auth";

function App() {
  return (
    // <TypesProvider>
      <Router>
        <div className="bg-[#0A0A0A] pt-10 px-10 md:px-36 min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/addcontent" element={<AddContent />} />
              <Route path="/user" element={<Account />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/content/:id" element={<DetailContent />} />
              <Route path="*" element={<NotFound />} />


            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    // </TypesProvider>
  );
}

export default App;
