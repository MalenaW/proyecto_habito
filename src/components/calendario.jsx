import { Calendar } from 'react-native-calendars';
import React from 'react'
import { getDate } from 'date-fns';

export default function calendario() {
    const  hoy = getDate()
  return (
    <Calendar
  onDayPress={day => {
    console.log('Seleccionaste el día', day.dateString);
    // Podés guardar ese día como día de hábito
  }}
  
  markedDates={{
    hoy: { marked: true, dotColor: 'blue' },
    
    }}/>
  )
}

