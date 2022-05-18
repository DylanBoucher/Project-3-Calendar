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
import axios from 'axios';

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





let events = [
  {
    title: "Big Meeting",
    start: new Date(2022, 4, 7),
    end: new Date(2022, 4, 10)
  },
  {
    title: "Vacation",
    start: new Date(2022, 4, 20),
    end: new Date(2022, 4, 23)
  },
  {
    title: "Conference",
    start: new Date(2022, 4, 25),
    end: new Date(2022, 4, 30)
  },
]

// let selected = document.getElementsByClassName('rbc-event rbc-selected')
  
function Main() {
  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''})
  const [allEvents, setAllEvents] = useState(events) //Change useState(events) to useState([]) at end
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const getData = ()  => {
    axios.get(`https://calendarific.com/api/v2/holidays?api_key=2c11d4799f6acc5a223955da9f66d10bbed87f0e&country=US&year=2022`)
    .then(res => {
      let holidays = res.data.response.holidays
      for(let i = 0; i < holidays.length; i++){
        const cal_holidays = [{title: holidays[i].name, start: holidays[i].date.iso, end: holidays[i].date.iso}]
        //setNewEvent(newEvent.title= holidays[i].name, newEvent.start= holidays[i].date.iso, newEvent.end= holidays[i].date.iso)
       //setNewEvent(...newEvent, cal_holidays[0])
        // setAllEvents([...allEvents, newEvent.title= holidays[i].name, newEvent.start= holidays[i].date.iso, newEvent.end= holidays[i].date.iso])
        setAllEvents([...allEvents, cal_holidays[0]])
        //console.log(newEvent)
        // console.log(allEvents)
        
        console.log(allEvents)
      }
      
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getData()
  }, [])
  const handleEditEvent = (e) => {
    console.log(e.target)
    console.log(allEvents)
    console.log(selectedEvent)
    console.log(allEvents.indexOf(selectedEvent))
    console.log(allEvents[2])
    setAllEvents([...allEvents, selectedEvent])
  }

  const deleteEvent = (e) => {
    console.log(e.target)
  }

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event)
    setIsOpen(true)
  }

  return (
    <div className="App">
      
      <h1 className='top-text'>Calendar</h1>

      {selectedEvent ? 
      <EditModal open={isOpen}>
        <h1 className='modal-h1'>Edit Event</h1>
        <div className='modal-container'>
            <label htmlFor='title'>Title:</label>
            <input id='title' type='text' placeholder='Add Title'  value={selectedEvent.title} onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}/>

            <label htmlFor='start'>Start Date:</label>
            <DatePicker id='start' placeholderText='Start Date'  selected={selectedEvent.start}  onChange={(start) => setSelectedEvent({...selectedEvent, start})}/>

            <label htmlFor='end'>End Date:</label>
            <DatePicker id='end' placeholderText='End Date' selected={selectedEvent.end}  onChange={(end) => setSelectedEvent({...selectedEvent, end})} />

            <div className='btn-container'>
                <button onClick={() => setIsOpen(false)} className='close-btn'>Cancel</button>
                <button onClick={deleteEvent} className='delete-btn'>Delete</button>
                <button onClick={handleEditEvent} className='add-btn'>Edit</button>
            </div>
          </div>
      </EditModal> : null}

      <Event newEvent={newEvent} setNewEvent={setNewEvent} allEvents={allEvents} setAllEvents={setAllEvents}/>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" onSelectEvent={(e) => handleSelectedEvent(e)} style={{height: 800, margin: "25px"}} />
    </div>
  );
}

export default Main;