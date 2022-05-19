import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, { useState, useEffect } from 'react'
import Event from './Event';
import 'react-datepicker/src/stylesheets/datepicker.scss'
import EditModal from './EditModal';
import DatePicker from 'react-datepicker'

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

// let events = [
//   {
//     title: "Big Meeting",
//     start: new Date(2022, 4, 7),
//     end: new Date(2022, 4, 10)
//   },
//   {
//     title: "Vacation",
//     start: new Date(2022, 4, 20),
//     end: new Date(2022, 4, 23)
//   },
//   {
//     title: "Conference",
//     start: new Date(2022, 4, 25),
//     end: new Date(2022, 4, 30)
//   },
// ]
  
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
  //             {title: e.name, start: new Date(e.date.iso), end: new Date(e.date.iso), allday: true}
  //           )
  //         }) 
  //         setAllEvents(...allEvents, rendered_holidays)
  //       })
  //   }
  //   getData()
  // }, [])

  const handleEditEvent = () => {
    const data = JSON.parse(localStorage.getItem('calendar_events'))
    data.splice(data.indexOf(previousEvent), 1, selectedEvent)
    localStorage.setItem('calendar_events', JSON.stringify(data))
    allEvents.splice(previousEvent, 1, selectedEvent)
    setIsOpen(false)
  }

  const deleteEvent = () => {
    const data = JSON.parse(localStorage.getItem('calendar_events'))
    data.splice(data.indexOf(selectedEvent), 1)
    localStorage.setItem('calendar_events', JSON.stringify(data))
    allEvents.splice(allEvents.indexOf(selectedEvent), 1)
    setIsOpen(false)
  }

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event)
    setPreviousEvent(allEvents.indexOf(event))
    setIsOpen(true)
  }
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('calendar_events'))
    data.map(e => {
      e.start = new Date(e.start)
      e.end = new Date(e.end)
    })
    setAllEvents(...allEvents, data)
  }, [])

  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(allEvents))
  }, [allEvents])

  return (
    <div className="App">
      <h1 className='top-text'>Calendar</h1>

      {selectedEvent ? 
      <EditModal open={isOpen}>
        <div className='btn-container'>
          <button onClick={() => setIsOpen(false)} className='close-btn'>Cancel</button>
          
          <button onClick={handleEditEvent} className='add-btn'>Edit</button>
        </div>
        <h1 className='modal-h1'>Edit Event</h1><hr/>
        
        <div className='modal-container'>
            <input id='title' type='text' placeholder='Add Title'  value={selectedEvent.title} onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}/>

            <DatePicker id='start' placeholderText='Start Date'  selected={selectedEvent.start}  onChange={(start) => setSelectedEvent({...selectedEvent, start})}/>

            <DatePicker id='end' placeholderText='End Date' selected={selectedEvent.end}  onChange={(end) => setSelectedEvent({...selectedEvent, end})} />

            <button onClick={deleteEvent} className='delete-btn'>Delete</button>
          </div>
      </EditModal> : null}

      <Event newEvent={newEvent} setNewEvent={setNewEvent} allEvents={allEvents} setAllEvents={setAllEvents}/>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" onSelectEvent={(e) => handleSelectedEvent(e)} style={{height: 800, margin: "25px"}} />
    </div>
  );
}

export default Main;