import './App.css';
import './index.css'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import React, { useState, useEffect } from 'react'
import Event from './Event';
import 'react-datepicker/src/stylesheets/datepicker.scss'
import EditEvent from './EditEvent';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})
  
function Main() {
  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''})
  const [allEvents, setAllEvents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const [previousEvent, setPreviousEvent] = useState()

  // useEffect(() => {
  //   const getData = async() => {
  //     await fetch(`https://calendarific.com/api/v2/holidays?api_key=122a5d6b2dc60efaa9d101d028323e566bfedeca&country=US&year=2022`)
  //       .then(response => response.json())
  //       .then(data => {
  //         let holidays = data.response.holidays
  //         const rendered_holidays = holidays.map((e) => {
  //           return (
  //             {title: e.name, start: new Date(e.date.iso), end: new Date(e.date.iso), allDay: true}
  //           )
  //         }) 
  //         setAllEvents(...allEvents, rendered_holidays)
  //       })
  //   }
  //   getData()
  // }, [])

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event)
    setPreviousEvent(allEvents.indexOf(event))
    setIsOpen(true)
  }

  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('calendar_events'))
    data.map(e => {
      return(
        <>
        {e.start = new Date(e.start)}
        {e.end = new Date(e.end)}
        </>
      )
    })
    setAllEvents(...allEvents, data)
  }, [])

  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(allEvents))
  }, [allEvents])

  return (
    <div className="App">
      {/* <h1 className='top-text'>Calendar</h1> */}

      {selectedEvent ? 
        <EditEvent 
          selectedEvent={selectedEvent} 
          setSelectedEvent={setSelectedEvent} 
          allEvents={allEvents}  
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          previousEvent={previousEvent} 
        />
      : null}

      <Event 
        newEvent={newEvent} 
        setNewEvent={setNewEvent} 
        allEvents={allEvents} 
        setAllEvents={setAllEvents}
      />
      <Calendar 
        localizer={localizer} 
        events={allEvents} 
        startAccessor="start" 
        endAccessor="end" 
        onSelectEvent={(e) => handleSelectedEvent(e)} 
        style={{height: 800, margin: "25px"}} 
      />
    </div>
  );
}

export default Main;