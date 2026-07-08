import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import MarketingBusiness from "@/pages/MarketingBusiness";
import Innovation from "@/pages/Innovation";
import TechHackathons from "@/pages/TechHackathons";
import Sustainability from "@/pages/Sustainability";
import Creativity from "@/pages/Creativity";
import OpportunityDetails from './pages/OpportunityDetails';
import ScrollToTop from './components/ScrollToTop';
import Register from './pages/Register';
import PostChallenge from './pages/PostChallenge';
import Login from './pages/Login';
import About from './pages/About'; // You need this file!
import Contact from './pages/Contact'; // You need this file!

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketing-business" element={<MarketingBusiness />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/tech-hackathons" element={<TechHackathons />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/creativity" element={<Creativity />} />
          <Route path="/opportunity/:id" element={<OpportunityDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-a-challenge" element={<PostChallenge />} />
          <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
          {/* HERE IS YOUR MISSING LOGIN ROUTE 👇 */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;