import { useEffect, useState } from 'react';
import api from '../api';
function SurveyResults() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/results');
        setResults(res.data);
      } catch (err) {
        setError('Failed to load results');
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!results) return <p>Loading survey results...</p>;
  if (results.message) return <p>{results.message}</p>; 

  return (
    <div className="max-w-4xl mx-auto px-8 py-6 text-base leading-relaxed text-gray-800">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-semibold text-xl pl-2">_Surveys</h2>
        <div className="space-x-6">
          <a href="/" className="hover:underline">FILL OUT SURVEY</a>
          <a href="/results" className="text-blue-500 font-medium hover:underline">VIEW SURVEY RESULTS</a>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-6 text-center">Survey Results</h3>

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <p>Total number of surveys :</p> <p>{results["totalSurveys number of surveys"]}</p>
        <p>Average Age :</p> <p>{results["Average Age"]}</p>
        <p>Oldest person who participated in survey :</p> <p>{results["Oldest person who participated in survey"]}</p>
        <p>Youngest person who participated in survey :</p> <p>{results["Youngest person who participated in survey"]}</p>

        <p className="mt-4">Percentage of people who like Pizza :</p> <p className='mt-4'>{results["Percentage of people who like Pizza"]} %</p>
        <p>Percentage of people who like Pasta :</p> <p>{results["Percentage of people who like Pasta"]} %</p>
        <p>Percentage of people who like Pap and Wors :</p> <p>{results["Percentage of people who like Pap and Wors"]} %</p>

        <p className="mt-4">People who like to watch movies :</p> <p className="mt-4">{results["People who like to watch movies"]}</p>
        <p>People like to listen to radio :</p> <p>{results["People like to listen to radio"]}</p>
        <p>People like to eat out :</p> <p>{results["People like to eat out"]}</p>
        <p>People like to watch TV :</p> <p>{results["People like to watch TV"]}</p>
      </div>
    </div>
  );
}

export default SurveyResults;
