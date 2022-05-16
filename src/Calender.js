import React, { useState } from 'react'
import Calendar from 'react-calendar'
import './App.css'

const Mycalendar = (props) => {
    const [date, setDate] = useState(new Date())

    const onClickDay = () => {
        console.log('you chose ' + date.toDateString())
    }

    return (
        <div>
            <h1 className='text-center top-text'>My Calendar</h1>
            <div className='add-event'>
               <button className='btn'>+</button> 
            </div>
            
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} selectRange={false} onClickDay={onClickDay}/>
            </div>
            {date.length > 0 ? (
                <p className='text-center'><span className='bold'>Start: </span>{date[0].toDateString()} &nbsp;| &nbsp; <span className='bold'>End: </span>{date[1].toDateString()}</p>
            ): (
                <p className='text-center'> <span className='bold'>Selected Date: </span>{date.toDateString()}</p>
            )}

            
        </div>
    )
}

export default Mycalendar