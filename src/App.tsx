import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecommendationTool from "./pages/RecommendationTool";
import Results from "./pages/Results";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/plan" element={<RecommendationTool />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
};

export default App;
