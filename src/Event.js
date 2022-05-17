import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Modal from './Modal'

function Event(props) {
    const { newEvent, setNewEvent, allEvents, setAllEvents } = props

    const [isOpen, setIsOpen] = useState(false)

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent])
      }

  return (
      <>
        <div>
            <div className='open-btn'>
                <button onClick={() => setIsOpen(true)} className='add-event'>Add Event</button>
            </div>

            <Modal open={isOpen}>
                <h1 className='modal-h1'>New Event</h1>
                <div className='modal-container'>
                    <label for='title'>Title:</label>
                    <input id='title' type='text' placeholder='Add Title'  value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>

                    <label for='start'>Start Date:</label>
                    <DatePicker id='start' placeholderText='Start Date'  selected={newEvent.start}  onChange={(start) => setNewEvent({...newEvent, start})}/>

                    <label for='end'>End Date:</label>
                    <DatePicker id='end' placeholderText='End Date' selected={newEvent.end}  onChange={(end) => setNewEvent({...newEvent, end})} />

                    <div className='btn-container'>
                        <button onClick={() => setIsOpen(false)} className='close-btn'>Close</button>
                        <button onClick={handleAddEvent} className='add-btn'>Add Event</button>
                    </div>
                    
                </div> 
            </Modal>
        </div>
        
      </>
    
  )
}

export default Event