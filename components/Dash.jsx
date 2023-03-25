import { useState, useEffect } from "react";

const Greeting = () => {
  const [date] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const morningGreetings = [
      "Good morning",
      "Top of the morning",
      "Rise and shine",
      "Good day to you",
      "Hello sunshine",
      "Wakey wakey, eggs and bakey",
      "Hope you slept well",
      "Lets get this day started",
      "Time to be awesome",
      "Its a great day to learn",
      "Good day, beautiful",
      "Wishing you a lovely day ahead",
      "May your day be filled with joy and positivity",
      "Sending positive vibes your way",
      "Hope you have a productive day",
      "Lets make today count",
      "Heres to a great day ahead",
      "Seize the day and make it yours",
      "Good morning, superstar!",
      "Make today your best day yet"
    ];

    const afternoonGreetings = [
      "Good afternoon",
      "Hello there",
      "Howdy",
      "Hey hey",
      "How's your day going?",
      "Keep up the good work",
      "Stay strong, finish strong",
      "We got this",
      "Let's finish the day strong, keep it up"
    ];

    const eveningGreetings = [
      "Good evening",
      "Greetings",
      "Salutations",
      "Well hello there",
      "Time to unwind",
      "Hope you had a great day",
      "Rest up for tomorrow",
      "Great job today",
      "Let's aim to do even better tomorrow",
      "Keep up the good work"
    ];

    const hour = date.getHours();
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

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-center pt-1 items-center">
      <div
        className="w-full text-gray-700 bg-white p-5 text-sm rounded-lg shadow-lg mx-auto "
        style={{ maxWidth: "90%" }}
      >
      <h2 className="text-2xl font-bold mb-2">{greeting} Scasians! </h2>
      <p className="text-gray-600 mb-2">
        Today is {dateString}
      </p>
    </div>
  </div>


  );
};

export default Greeting;
