import './App.css';
import Calendar from 'react-calendar';
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(new Date())

  const onChange = (date) => {
    setDate(date)
  }

  return (
    <div className="App">
      <Calendar onChange={onChange} value={date} />
      {console.log(date)}
      {/* <p>{date.toString()}</p> */}
    </div>
  );
}

export default App;
