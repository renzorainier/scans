import { useState, useEffect } from "react";

const Greeting = () => {
  const [date] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [showReminder, setShowReminder] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const fivetosix = ["Good Morning"];
    const sixtoseven = ["Good Morning"];
    const seventoeight = ["Good Morning"];
    const eighttonine = ["Good Morning"];
    const ninetoten = ["Good Morning"];
    const tentoeleven = ["Good Morning"];
    const eleventotwelve = ["Good Morning"];
    const afternoonGreetings = ["Good Afternoon"];
    const eveningGreetings = ["Good Evening"];

    const hour = date.getHours();
    let greetingOptions = [];

    if (hour >= 5 && hour < 6) {
      greetingOptions = fivetosix;
      setTimeOfDay("fivetosix");
    } else if (hour >= 6 && hour < 7) {
      greetingOptions = sixtoseven;
      setTimeOfDay("sixtoseven");
    } else if (hour >= 7 && hour < 8) {
      greetingOptions = seventoeight;
      setTimeOfDay("seventoeight");
    } else if (hour >= 8 && hour < 9) {
      greetingOptions = eighttonine;
      setTimeOfDay("eighttonine");
    } else if (hour >= 9 && hour < 10) {
      greetingOptions = ninetoten;
      setTimeOfDay("ninetoten");
    } else if (hour >= 10 && hour < 11) {
      greetingOptions = tentoeleven;
      setTimeOfDay("tentoeleven");
    } else if (hour >= 11 && hour < 12) {
      greetingOptions = eleventotwelve;
      setTimeOfDay("eleventotwelve");
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
    if (timeOfDay === "fivetosix") {
      return "/pictures/fivetosix.jpg";
    } else if (timeOfDay === "sixtoseven") {
      return "/pictures/sixtoseven.jpg";
    } else if (timeOfDay === "seventoeight") {
      return "/pictures/seventoeight.jpg";
    } else if (timeOfDay === "eighttonine") {
      return "/pictures/eighttonine.jpg";
    } else if (timeOfDay === "ninetoten") {
      return "/pictures/ninetoten.jpg";
    } else if (timeOfDay === "tentoeleven") {
      return "/pictures/tentoeleven.jpg";
    } else if (timeOfDay === "eleventotwelve") {
      return "/pictures/eleventotwelve.jpg";
    } else if (timeOfDay === "afternoon") {
      return "/pictures/afternoon.jpg";
    } else {
      return "/pictures/night.jpg";
    }
  };


  const getTextColor = () => {
    if (timeOfDay === "evening") {
      return "text-white";
    }
    return "text-gray-900";
  };

  return (
    <div className="flex justify-center pt-1 items-center">
      <div
        className={`w-full p-5 mr-5 ml-5 rounded-lg shadow-lg mx-auto ${getTextColor()}`}
        style={{
          backgroundImage: `url(${getImageUrl()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ minHeight: "200px" }}>
          <h2 className="text-3xl font-bold mb-2">{greeting} Scasians! </h2>
          <p className="mb-2 font-bold">Today is {dateString}</p>
          {showReminder && (
            <h3 className="text-sm font-bold mb-2 ">
              If you have not already get your qr-code scanned now :&gt;
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Greeting;

// "Top of the morning",
// "Rise and shine",
// "Good day to you",
// "Hello sunshine",
// "Wakey wakey, eggs and bakey",
// "Hope you slept well",
// "Lets get this day started",
// "Time to be awesome",
// "Its a great day to learn",
// "Good day, beautiful",
// "Wishing you a lovely day ahead",
// "May your day be filled with joy and positivity",
// "Sending positive vibes your way",
// "Hope you have a productive day",
// "Lets make today count",
// "Heres to a great day ahead",
// "Seize the day and make it yours",
// "Good morning, superstar!",
// "Make today your best day yet",

// "Hello there",
// "Howdy",
// "Hey hey",
// "How's your day going?",
// "Keep up the good work",
// "Stay strong, finish strong",
// "We got this",
// "Let's finish the day strong, keep it up",

// "Greetings",
// "Salutations",
// "Well hello there",
// "Time to unwind",
// "Hope you had a great day",
// "Rest up for tomorrow",
// "Great job today",
// "Let's aim to do even better tomorrow",
// "Keep up the good work",
