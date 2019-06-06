import React, { useState, useEffect, useReducer } from 'react';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import axios from 'axios';

import './App.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

interface Event {
  start: any,
  end: any,
  id: any
}


const App: React.FC = () => {

  let [events, setEvents] = useState<Object[]>([]);
  const [force, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect((): any => {
    return () => {
      return events;
    }
  }, [events, force])

  useEffect((): any => {
    axios.get('/api/getEvents').then(res => {
      let newEvents: any = res.data.events.map((event: Event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end)
        return event;
      })
      setEvents(newEvents);
    }).catch(err => console.log(err))
  }, []);
  
  function changeEventTime({ event, start, end }: any) {

    const index: any = events.findIndex((calendarEvent: any) => {
      return calendarEvent.id === event.id
    });

    let newEvents: any = events;
    newEvents[index].start = start;
    newEvents[index].end = end;

    setEvents(newEvents);
    forceUpdate(1)
    
  }

  function eventStyleGetter(event: any) {
    let backgroundColor = '#' + event.hexColor;
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      display: 'block',
      border: '1px solid black',
      padding: '.5em 0',
      textAlign: 'center' as 'center'
    };

    const { type } = event;
    if (type === "fun") {
      style.backgroundColor = "#3174AD"
    }

    if (type === "work") {
      style.backgroundColor = "#3CB371"
    }

    if (type === "serious") {
      style.backgroundColor = "#DC143C"
    }

    return {
      style: style
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>React-Big-Calendar in TypeScript</h1>
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          localizer={localizer}
          onEventDrop={(e) => changeEventTime(e)}
          onEventResize={(e) => changeEventTime(e)}
          eventPropGetter={eventStyleGetter}
          resizable
          className="calendar"
        />
      </div>
      <div className="container">

      </div>
    </div>
  );
}

export default App;
