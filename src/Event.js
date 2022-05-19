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
                    <div className='btn-container'>
                        <button onClick={() => setIsOpen(false)} className='close-btn'>Cancel</button>
                        <button onClick={handleAddEvent} className='add-btn'>Add</button>
                    </div>

                    <h1 className='modal-h1'>New Event</h1><hr/>
                    
                    <div className='modal-container'>
                        <input id='title' type='text' placeholder='Add Title'  value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>

                        <DatePicker id='start' placeholderText='Start Date'  selected={newEvent.start}  onChange={(start) => setNewEvent({...newEvent, start})}/>

                        <DatePicker id='end' placeholderText='End Date' selected={newEvent.end}  onChange={(end) => setNewEvent({...newEvent, end})} />
                    </div> 
                </Modal>
            </div>
        </>
    )
}

export default Event