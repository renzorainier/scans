import Head from "next/head";
import { useState,useEffect } from "react";
// import Scan from "components/Scan";
// import PastAttendance from "/components/PastView";
// import TodayAttendance from "/components/TodayView";
// import SavePresentStudents from "components/Save";
// import Generate from "components/Generate";
import StudentCollection from "components/Create";
import BadgeWriter from "components/Badge";
import BadgeReader from "components/BadgeAssign";
// import TabSelector from "components/Tab";
import Main from "components/Main";

export default function Home() {

  return (
    <>
      <Head>
        <title>scans | view</title>
        <meta name="description" content="Welcome to Scas Attendance Scan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpeg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
    <Main />
    {/* <StudentCollection />
    <BadgeWriter /> */}
    {/* <BadgeReader /> */}
    </>
  );
}