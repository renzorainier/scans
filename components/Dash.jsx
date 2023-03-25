import { useState, useEffect } from 'react';

const Greeting = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const qrCodeReminder = () => {
    return 'Don\'t forget to scan your QR code today!';
  };

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Welcome, Student!</h2>
      <p className="text-gray-600 mb-2">Today is {date.toLocaleDateString()}, {date.toLocaleTimeString()}</p>
      <p className="text-red-500 font-bold">{qrCodeReminder()}</p>
    </div>
  );
};

export default Greeting;
