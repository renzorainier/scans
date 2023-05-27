import React, { useState, useEffect } from "react";
import Head from "next/head";
import Main from "components/Main";
import LoadingPage from "components/LoadingPage";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>scans | scas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpeg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>{isLoading ? <LoadingPage /> : <Main />}</div>
    </>
  );
}
