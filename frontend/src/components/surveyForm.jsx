import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function SurveyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    date_of_birth: '',
    contact_number: '',
    fav_food_pizza: false,
    fav_food_pasta: false,
    fav_food_pap_wors: false,
    fav_food_other: false,
    movies_rating: 0,
    radio_rating: 0,
    eat_out_rating: 0,
    tv_rating: 0
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'radio' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Required fields check
    if (!formData.full_name || !formData.email || !formData.date_of_birth || !formData.contact_number) {
      setError('Please fill in all required fields.');
      return;
    }

    // Age validation
    const birthDate = new Date(formData.date_of_birth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 5 || age > 120) {
      setError('Age must be between 5 and 120 years.');
      return;
    }

    // Ratings validation
    const ratingFields = ['movies_rating', 'radio_rating', 'eat_out_rating', 'tv_rating'];
    for (let field of ratingFields) {
      if (formData[field] === 0) {
        setError('Please select a rating for all questions.');
        return;
      }
    }

    const selectedFoods = [];
    if (formData.fav_food_pizza) selectedFoods.push('Pizza');
    if (formData.fav_food_pasta) selectedFoods.push('Pasta');
    if (formData.fav_food_pap_wors) selectedFoods.push('Pap and Wors');
    if (formData.fav_food_other) selectedFoods.push('Other'); // Or however you handle 'Other'

    const dataToSubmit = {
      ...formData, // includes personal details, ratings
      favorite_foods: selectedFoods // override with the array
    };
    // Remove individual fav_food_.booleans if they are not needed directly by the backend
    delete dataToSubmit.fav_food_pizza;
    delete dataToSubmit.fav_food_pasta;
    delete dataToSubmit.fav_food_pap_wors;
    delete dataToSubmit.fav_food_other;

    try {
      const res = await api.post('/survey', formData);
      setSuccess(res.data.message);
      setTimeout(() => navigate('/results'), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-6 text-base leading-relaxed text-gray-800">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-semibold text-xl pl-2">_Surveys</h2>
        <div className="space-x-6">
          <a href="/" className="text-blue-500 font-medium hover:underline">FILL OUT SURVEY</a>
          <a href="/results" className="text-black hover:underline">VIEW SURVEY RESULTS</a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <div className="flex gap-6">
          <div className="w-65 pt-1">Personal Details:</div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <label htmlFor="full_name" className="mb-1">Full Names</label>
              <input type="text" name="full_name" id="full_name" value={formData.full_name} onChange={handleChange} className="w-64 border border-blue-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-64 border border-blue-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date_of_birth" className="mb-1">Date of Birth</label>
              <input type="date" name="date_of_birth" id="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-64 border border-blue-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact_number" className="mb-1">Contact Number</label>
              <input type="text" name="contact_number" id="contact_number" value={formData.contact_number} onChange={handleChange} className="w-64 border border-blue-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 outline-none"/>
            </div>
          </div>
        </div>

        {/* Favorite Food */}
        <div className="flex flex-wrap items-center gap-4">
          <p className="whitespace-nowrap mr-2">What is your favorite food?</p>
          {[{ label: 'Pizza', name: 'fav_food_pizza' }, { label: 'Pasta', name: 'fav_food_pasta' }, { label: 'Pap and Wors', name: 'fav_food_pap_wors' }, { label: 'Other', name: 'fav_food_other' }]
            .map((item) => (
              <label key={item.name} className="flex items-center gap-1">
                <input type="checkbox" name={item.name} checked={formData[item.name]} onChange={handleChange} />
                {item.label}
              </label>
            ))}
        </div>

        {/* Rating Table */}
        <div>
          <p className="mb-3">
            Please rate your level of agreement on a scale from 1 to 5, with 1 being "strongly agree" and 5 being "strongly disagree."
          </p>
          <table className="w-full border-collapse border border-blue-400 text-center text-sm table-fixed">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-blue-400 px-2 py-2 text-left w-2/6"></th>
                <th className="border border-blue-400 px-2 py-2 w-1/6">Strongly Agree</th>
                <th className="border border-blue-400 px-2 py-2 w-1/6">Agree</th>
                <th className="border border-blue-400 px-2 py-2 w-1/6">Neutral</th>
                <th className="border border-blue-400 px-2 py-2 w-1/6">Disagree</th>
                <th className="border border-blue-400 px-2 py-2 w-1/6">Strongly Disagree</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'I like to watch movies', name: 'movies_rating' },
                { label: 'I like to listen to radio', name: 'radio_rating' },
                { label: 'I like to eat out', name: 'eat_out_rating' },
                { label: 'I like to watch TV', name: 'tv_rating' }
              ].map((item) => (
                <tr key={item.name}>
                  <td className="border border-blue-400 px-2 py-2 text-left w-2/6">{item.label}</td>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <td key={num} className="border border-blue-400 px-2 py-2 w-2/6">
                      <input
                        type="radio"
                        name={item.name}
                        value={num}
                        checked={formData[item.name] === num}
                        onChange={handleChange}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Messages */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;
