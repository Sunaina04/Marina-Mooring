import { useState } from 'react'
// import { Calendar } from 'primereact/calendar'
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DatePickerComponent = () => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [startDate, setStartDate] = useState(new Date());
  
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
   
   // endDate.setDate(endDate.getDate() + 1);
    if (value && value.length === 2 && value[0] && value[1]) {
      setStartDate(value[0]);
     
      setEndDate(value[1]);
      
    }
  };

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
           <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" 
            hideOnRangeSelection inline/>

        
      </div>
    </>
  )
}

export default DatePickerComponent
