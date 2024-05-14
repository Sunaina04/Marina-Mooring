import { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Nullable } from 'primereact/ts-helpers'

const DatePickerComponent = () => {
  const [date, setDate] = useState<Nullable<Date>>(null)

  return (
    <>
      <div
        className="card flex justify-content-center"
        style={{
          width: '500px',
          height: 'auto',
          gap: '0px',
          borderRadius: '10px',
          border: '1.13px solid #D5E1EA',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1rem',
        }}>
        <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
      </div>
    </>
  )
}

export default DatePickerComponent
