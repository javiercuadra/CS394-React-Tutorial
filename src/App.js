import React, { useState, useEffect } from "react";

import { useData } from "./utilities/firebase";
import { timeParts } from "./utilities/times";

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

const App = () => {
  const [schedule, loading, error] = useData("/", addScheduleTimes);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;

  return (
    <div className='container'>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};
export default App;
