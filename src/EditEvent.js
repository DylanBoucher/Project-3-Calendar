import React from 'react'
import EditEventModal from './EditEventModal';
import DatePicker from 'react-datepicker'

function EditEvent(props) {
    const { selectedEvent, setSelectedEvent, allEvents, setIsOpen, isOpen, previousEvent } = props

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

  return (
    <EditEventModal open={isOpen}>
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
      </EditEventModal>
    
  )
}

export default EditEvent