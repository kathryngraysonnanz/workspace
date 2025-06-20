import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

interface TimeRecord {
  id: number;
  description: string;
  elapsedTime: number; // in seconds
  date: string; // log the date
}

const TimeTracker: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [description, setDescription] = useState<string>("");
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [recordId, setRecordId] = useState<number>(0); // To ensure unique id for each record

  // Format elapsed time into HH:MM:SS
  const formatTime = (time: number): string => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setIsRunning(false);
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    // Use "Uncategorized" if no description is provided
    const recordDescription = description || "Uncategorized";

    // Add record to history
    if (recordDescription) {
      setTimeRecords((prevRecords) => [
        ...prevRecords,
        {
          id: recordId,
          description: recordDescription,
          elapsedTime,
          date: new Date().toLocaleString(),
        },
      ]);
      setRecordId((prevId) => prevId + 1); // Increment the record id for the next entry
    }
    setElapsedTime(0);
    setIsRunning(false);
    setDescription(""); // Optionally clear description after stopping
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleDescriptionChange = (e: InputChangeEvent) => {
    setDescription(e.value as string);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Time Tracker</h1>
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>
        {formatTime(elapsedTime)}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Input
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe the time being tracked"
          style={{ marginRight: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <ButtonGroup>
          <Button onClick={startTimer} disabled={isRunning}>
            Start
          </Button>
          <Button onClick={pauseTimer} disabled={!isRunning}>
            Pause
          </Button>
          <Button onClick={stopTimer}>Stop</Button>
        </ButtonGroup>
      </div>
      <h2>Tracking History</h2>
      <Grid data={timeRecords} style={{ marginTop: "20px" }}>
        <GridColumn field="id" title="ID" />
        <GridColumn field="description" title="Description" />
        <GridColumn
          field="elapsedTime"
          title="Elapsed Time (sec)"
          cell={(props) => <td>{formatTime(props.dataItem.elapsedTime)}</td>}
        />
        <GridColumn field="date" title="Date" />
      </Grid>
    </div>
  );
};

export default TimeTracker;
