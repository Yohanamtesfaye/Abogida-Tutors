import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import axios from "axios";


const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

//higlight the dates in highlightedDays arra
const ServerDay = (props) => {

  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

const SessionBooking = ({ doctor }) => {
  const [ongoing, setOngoing] = useState([]);
  const [value, setValue] = useState(null);
  const [highlightedDays, setHighlitedDays] = useState([
    "2023-07-01",
    "2024-04-09",
    "2024-04-21",
    "2024-04-12",
  ]);
  const selectJob = async(id)=> {
    const res = await axios.get(`http://127.0.0.1:8000/core/api/tracker/${id}/`)
    setValue(id)
    setHighlitedDays(res.data)
  }
  const selectDay = async(newdate)=> {
    const date = newdate.toJSON().slice(0,10)

    const data = {
      day: date
    }
    console.log(data)
    const res = await axios.put(`http://127.0.0.1:8000/core/api/tracker/${value}/`,data)
    // setValue(id)
    setHighlitedDays(res.data)
  }
  const id = localStorage.getItem('id')
  const today = dayjs();
  const fetch = async () => {
    try{
        const reson = await axios.get(`http://127.0.0.1:8000/core/api/ongoing-jobs/${id}/`)
        setOngoing(reson.data)
    }catch(err){
        console.log(err);
    }
  }
  useEffect(() => {
   fetch()  
  }, []);
  return (
    
      <Box>
        {ongoing.map(student => ( //student.location == location &&
            
                <div key={student.id} onClick={()=> selectJob(student.job_id)} className=" text-gray-600 mx-5 shadow-lg p-3 rounded-xl my-3 bg-white transition-transform hover: hover:shadow- hover:-translate-y-1">
                  <div className='lg:flex justify-between'>
                    <div>
                      <div  className='flex'>
                        <div>
                         <p className="text-3xl  mr-10">👩‍🎓</p>
                        </div>
                        <div>
                          <p className="mr-2 font-bold text-2xl font-serif text-black">{student.full_name}</p>
                          {student.role === 'P' && <p className='font-bold text-black'>Parent</p>}
                          <div className=''>
                            <p className='text-lg inline-block mr-4'><span className='font-bold'>Grade level: </span> {student.level}</p>
                            <p className='mr-4'><span className='font-bold'>Subjects:</span> {student.subject}</p> 
                            <p><span className='font-bold'>Location: </span>{student.location}</p>
                          </div>       
                        </div>                     
                    </div>       
                    </div>
                   
                  </div>                  
                </div>
                 ))}
          {value && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(newValue) => {
                selectDay(newValue)
              }}
              defaultValue={today}
              minDate={today}
              maxDate={today.add(1, "month")}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
          </LocalizationProvider>
          )}
      </Box>
  );
};

export default SessionBooking;