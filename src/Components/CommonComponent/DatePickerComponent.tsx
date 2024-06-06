import { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Nullable } from 'primereact/ts-helpers'

const DatePickerComponent = () => {
  const [date, setDate] = useState<Nullable<Date>>(null)

  return (
    <>
      <div
        className="card flex  justify-items-center"
        style={{
        
          height: 'auto',
          gap: '0px',
          borderRadius: '10px',
          border: '1.13px solid #D5E1EA',
          backgroundColor: '#D5E1EA',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
        
        
        }}>
        <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
      </div>
    </>
  )
}

export default DatePickerComponent
