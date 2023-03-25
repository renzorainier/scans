import { useState, useEffect } from 'react';

const Greeting = () => {
  const [date, setDate] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 100000000000);

    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    const hour = date.getHours();

    const morningGreetings = [
      'Good morning',
      'Top of the morning',
      'Rise and shine',
      'Good day to you',
      'Hello sunshine',
      'Wakey wakey, eggs and bakey',
      'Hope you slept well',
      'Let\'s get this day started',
      'Time to be awesome',
      'It\'s a great day to learn'
    ];

    const afternoonGreetings = [
      'Good afternoon',
      'Hello there',
      'Howdy',
      'Hey hey',
      'How\'s your day going?',
      'Keep up the good work',
      'Stay strong, finish strong',
      'We got this',
      'Just a few more hours to go',
      'Let\'s finish the day strong'
    ];

    const eveningGreetings = [
      'Good evening',
      'Greetings',
      'Salutations',
      'Well hello there',
      'Time to unwind',
      'Hope you had a great day',
      'Rest up for tomorrow',
      'Great job today',
      'Let\'s aim to do even better tomorrow',
      'Keep up the good work'
    ];


    let greetingOptions = [];

    if (hour >= 5 && hour < 12) {
      greetingOptions = morningGreetings;
    } else if (hour >= 12 && hour < 18) {
      greetingOptions = afternoonGreetings;
    } else {
      greetingOptions = eveningGreetings;
    }

    const randomIndex = Math.floor(Math.random() * greetingOptions.length);
    setGreeting(greetingOptions[randomIndex]);
  }, [date]);

  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="items-center w-full text-gray-700 bg-white p-5 text-sm rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">{greeting} Scasians! </h2>
      <p className="text-gray-600 mb-2">
        Today is {dateString}
      </p>
    </div>
  );
};

export default Greeting;
