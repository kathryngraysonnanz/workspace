import React, { useState } from "react";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import "@progress/kendo-theme-default/dist/all.css";

interface EventData {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const initialEvents: EventData[] = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2023, 9, 10, 10, 0),
    end: new Date(2023, 9, 10, 11, 0),
  },
  {
    id: 2,
    title: "Project Update",
    start: new Date(2023, 9, 12, 14, 0),
    end: new Date(2023, 9, 12, 15, 0),
  },
];

const CalendarView: React.FC = () => {
  const [data, setData] = useState<EventData[]>(initialEvents);

  const handleDataChange = (event: any) => {
    // Make sure the event object contains data
    if (event.data) {
      const updatedData = event.data.map((item: EventData) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }));

      setData(updatedData);
    }
  };

  const onEventAdd = (event: EventData) => {
    const newEvent: EventData = {
      id: data.length + 1, // Simple way to generate a new ID
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    };
    setData([...data, newEvent]);
  };

  return (
    <div>
      <Scheduler
        data={data}
        onDataChange={handleDataChange}
        defaultDate={new Date()}
        defaultView="month"
        editable={{
          add: true,
          edit: true,
          remove: true,
          drag: true,
          resize: true,
          select: true,
        }}
      >
        <DayView />
        <WeekView />
        <MonthView />
        <AgendaView />
      </Scheduler>
    </div>
  );
};

export default CalendarView;
