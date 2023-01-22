import React from "react";

const List = ({ people }) => {
  const getAge = (date) => {
    // console.log(date)
    let temp = Date.parse(date);
    // temp = temp.getUTCFullYear() - 1970
    let newdate = new Date(date);
    // Hours part from the timestamp
    let month_diff = Date.now() - newdate.getTime();

    //convert the calculated difference in date format
    let age_dt = new Date(month_diff);

    //extract year from date
    let year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    let age = Math.abs(year - 1971);

    return age;
  };

  const calculateDays = (birth) => {
    let today = new Date();
    let bday = new Date(birth);
    let age = today.getFullYear() - bday.getFullYear();

    let upcomingBday = new Date(
      today.getFullYear(),
      bday.getMonth(),
      bday.getDate()
    );

    if (today > upcomingBday) {
      upcomingBday.setFullYear(today.getFullYear() + 1);
    }

    var one_day = 24 * 60 * 60 * 1000;

    let daysLeft = Math.ceil(
      (upcomingBday.getTime() - today.getTime()) / one_day
    );
    return daysLeft
  };

  return (
    <>
      {people.map((person) => {
        const { id, name, date } = person;
        return (
          <article key={id} className="person">
            {/* <img src={image} alt={name}/> */}
            <div>
              <h4>{name}</h4>
              <p>{date} </p>
              <div>{calculateDays(date)}</div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
