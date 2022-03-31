import React from "react";

import {
  getCourseTerm,
  getCourseNumber,
  hasConflict,
} from "../utilities/times";

const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);

  const style = {
    backgroundColor: isDisabled
      ? "lightgrey"
      : isSelected
      ? "#B0E5A4"
      : "white",
  };

  const toggle = (x, lst) =>
    lst.includes(x) ? lst.filter((y) => y !== x) : [x, ...lst];

  return (
    <div
      className='card m-1 p-2'
      onClick={() =>
        isDisabled ? null : setSelected(toggle(course, selected))
      }
      style={style}
    >
      <div className='card-body'>
        <div className='card-title'>
          {getCourseTerm(course)} CS {getCourseNumber(course)}
        </div>
        <div className='card-text'>{course.title}</div>
        <div className='card-text'>{course.meets}</div>
      </div>
    </div>
  );
};

export default Course;
