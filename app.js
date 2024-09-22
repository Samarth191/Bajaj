import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const response = await fetch('https://your-api-endpoint/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder="Enter JSON data"
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <ul>
            {selectedOptions.includes('alphabets') && (
              <li>Alphabets: {response.alphabets.join(', ')}</li>
            )}
            {selectedOptions.includes('numbers') && (
              <li>Numbers: {response.numbers.join(', ')}</li>
            )}
            {selectedOptions.includes('highestLowercaseAlphabet') && (
              <li>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</li>
            )}
          </ul>
        </div>
      )}
      <select multiple onChange={handleOptionChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highestLowercaseAlphabet">Highest Lowercase Alphabet</option>
      </select>
    </div>
  );
}

export default App;