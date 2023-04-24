import React, { useState } from "react";

function PasswordProtectedComponent() {
  const [password, setPassword] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (password === "mysecretpassword") {
      setShowContent(true);
    } else {
      alert("Incorrect password, please try again.");
    }
  };

  return (
    <div>
      {!showContent && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {showContent && (
        <div>
          <h1>Protected Content</h1>
          <p>This is protected content that is only visible once you enter the correct password.</p>
        </div>
      )}
    </div>
  );
}

export default PasswordProtectedComponent;
