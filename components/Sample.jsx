import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    setInput(input + e.target.value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEqual = () => {
    try {
      setResult(eval(input));
    } catch (e) {
      setResult('Error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-80">
        <div className="bg-white rounded-t-lg p-4 shadow-md">
          <div className="text-right text-gray-500">{input}</div>
          <div className="text-right text-4xl font-bold">{result}</div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          <button
            className="bg-gray-200 rounded-lg py-3 px-4 shadow-md"
            onClick={handleClear}
          >
            C
          </button>
          <button
            className="bg-gray-200 rounded-lg py-3 px-4 shadow-md"
            value="/"
            onClick={handleClick}
          >
            ÷
          </button>
          <button
            className="bg-gray-200 rounded-lg py-3 px-4 shadow-md"
            value="*"
            onClick={handleClick}
          >
            ×
          </button>
          <button
            className="bg-gray-200 rounded-lg py-3 px-4 shadow-md"
            value="-"
            onClick={handleClick}
          >
            -
          </button>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <button
              key={num}
              className="bg-gray-200 rounded-lg py-3 px-4 shadow-md"
              value={num}
              onClick={handleClick}
            >
              {num}
            </button>
          ))}
          <button
            className="bg-gray-200 rounded-lg py-3 px-4 shadow-md col-span-2"
            value="0"
            onClick={handleClick}
          >
            0
          </button>
          <button
            className="bg-gray-200 rounded-lg py-3 px-4 shadow-md"
            value="."
            onClick={handleClick}
          >
            .
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg py-3 px-4 shadow-md col-span-2"
            onClick={handleEqual}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;