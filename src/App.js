import React, { useState, useEffect } from "react";
import CourseList from "./components/CourseList";
import "./App.css";

const Banner = ({ title }) => <h1 className='m-4'>{title}</h1>;

const addScheduleTimes = (schedule) => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses),
});

const mapValues = (fn, obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  );

const addCourseTimes = (course) => ({
  ...course,
  ...timeParts(course.meets),
});

const meetsPat =
  /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = (meets) => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match
    ? {}
    : {
        days,
        hours: {
          start: hh1 * 60 + mm1 * 1,
          end: hh2 * 60 + mm2 * 1,
        },
      };
};

const App = () => {
  const [schedule, setSchedule] = useState();
  const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      // const response = require("./courses.json");
      if (!response) throw response;
      const json = await response.json();
      // const json = response;
      setSchedule(addScheduleTimes(json));
    };
    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading...</h1>;

  return (
    <div className='container'>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};
export default App;
