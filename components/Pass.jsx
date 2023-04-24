import { useState } from 'react';

function PasswordProtectedContent() {
  const [password, setPassword] = useState('');
  const [showContent, setShowContent] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Replace this with your actual password check logic
    if (password === 'password') {
      setShowContent(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!showContent && (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
          >
            Submit
          </button>
        </form>
      )}
      {showContent && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Protected Content</h1>
          <p className="text-gray-700">
            This is protected content that is only visible once you enter the correct password.
          </p>
        </div>
      )}
    </div>
  );
}


export default PasswordProtectedContent;
