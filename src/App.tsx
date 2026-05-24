import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import Presentation from '@pages/Presentation';
import Explanation from '@pages/Explanation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/explanation" element={<Explanation />} />
      </Routes>
    </Router>
  );
}

export default App;
