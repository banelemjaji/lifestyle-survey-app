import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SurveyForm from './components/surveyForm.jsx';
import SurveyResults from './components/surveyForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/results" element={<SurveyResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
