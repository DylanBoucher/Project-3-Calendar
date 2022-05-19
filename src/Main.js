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
// import axios from 'axios';

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
  const [allEvents, setAllEvents] = useState([]) //Change useState(events) to useState([]) at end
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})

  useEffect(() => {
    const getData = async() => {
      await fetch(`https://calendarific.com/api/v2/holidays?api_key=122a5d6b2dc60efaa9d101d028323e566bfedeca&country=US&year=2022`)
        .then(response => response.json())
        .then(data => {
          let holidays = data.response.holidays
          
        const rendered_holidays = holidays.map((e) => {
          // let title = e.name
          // let start =  new Date(e.date.iso)
          // let end = new Date(e.date.iso)
           
          
          return (
            {title: e.name, start: new Date(e.date.iso), end: new Date(e.date.iso)}
          )

          
        }) 
        setAllEvents(rendered_holidays)
        
        console.log(allEvents)
          // setAllEvents([rendered_holidays])
          // allEvents.forEach(e => {
          //   console.log(e)
          //   e.forEach(b => {
          //     console.log(b.cal_holidays)
          //     setAllEvents([b.cal_holidays])
          //     console.log(allEvents)
          //   })
          // })
          
          

          // holidays.map((e, idx) => {
          //   let title = e.name
          //   let start =  new Date(e.date.iso)
          //   let end = new Date(e.date.iso)
          //   const cal_holidays = [{title: title, start: start, end: end}]
          //   //console.log(cal_holidays)   
          //   return(
          //     <>        
          //     </>
          //   ) 
          // })
          
          //console.log(allEvents)
        })
    }
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