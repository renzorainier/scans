import { useState, useEffect } from "react";

const Greeting = () => {
  const [date] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [showReminder, setShowReminder] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const morningGreetings = ["Good Morning"];
    const afternoonGreetings = ["Good Afternoon"];
    const eveningGreetings = ["Good Evening"];

    const hour = date.getHours();
    let greetingOptions = [];

    if (hour >= 5 && hour < 12) {
      greetingOptions = morningGreetings;
      setTimeOfDay("morning");
    } else if (hour >= 12 && hour < 18) {
      greetingOptions = afternoonGreetings;
      setTimeOfDay("afternoon");
    } else {
      greetingOptions = eveningGreetings;
      setTimeOfDay("evening");
    }

    const randomIndex = Math.floor(Math.random() * greetingOptions.length);
    setGreeting(greetingOptions[randomIndex]);

    // Check if it's a weekday and if it's morning or afternoon
    if (date.getDay() >= 1 && date.getDay() <= 5 && hour >= 5 && hour < 18) {
      setShowReminder(true);
    }
  }, [date]);

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getImageUrl = () => {
    if (timeOfDay === "morning") {
      return "pictures/morning-image.jpg";
    } else if (timeOfDay === "afternoon") {
      return "picures/afternoon-image.jpg";
    } else {
      return "/components/pictures/night.jpg";
    }
  };

  return (
    <div
      className="flex justify-center pt-1 items-center"
      style={{
        backgroundImage: `url(${getImageUrl()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full text-gray-700 bg-white p-5 mr-5 ml-5 rounded-lg shadow-lg mx-auto "

      >
        <h2 className="text-2xl font-bold mb-2">{greeting} Scasians! </h2>
        <p className="text-gray-600 mb-2 text-sm font-bold">Today is {dateString}</p>
        {showReminder && (
          <h3 className="text-2xl mb-2">
            If you haven't already, get your qr-code scanned now :&gt;
          </h3>
        )}
        <h3 className=" mb-2">
          If you haven't already, get your qr-code scanned now :&gt;
        </h3>
      </div>
    </div>
  );
};

export default Greeting;


// "Top of the morning",
//       "Rise and shine",
//       "Good day to you",
//       "Hello sunshine",
//       "Wakey wakey, eggs and bakey",
//       "Hope you slept well",
//       "Lets get this day started",
//       "Time to be awesome",
//       "Its a great day to learn",
//       "Good day, beautiful",
//       "Wishing you a lovely day ahead",
//       "May your day be filled with joy and positivity",
//       "Sending positive vibes your way",
//       "Hope you have a productive day",
//       "Lets make today count",
//       "Heres to a great day ahead",
//       "Seize the day and make it yours",
//       "Good morning, superstar!",
//       "Make today your best day yet"

// "Hello there",
// "Howdy",
// "Hey hey",
// "How's your day going?",
// "Keep up the good work",
// "Stay strong, finish strong",
// "We got this",
// "Let's finish the day strong, keep it up"

// "Greetings",
// "Salutations",
// "Well hello there",
// "Time to unwind",
// "Hope you had a great day",
// "Rest up for tomorrow",
// "Great job today",
// "Let's aim to do even better tomorrow",
// "Keep up the good work"
