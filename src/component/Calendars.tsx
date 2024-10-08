import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarsProps {
  onChange: (value: Value) => void;
}

export default function Calendars({ onChange }: CalendarsProps) {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onChangeCalendar = useCallback(
    (value: Value) => {
      setCalendarValue(value);
      onChange(value);
      setSelectedDate(value instanceof Array ? value[0] : value);
    },
    [onChange]
  );

  const tileClassName = ({ date }: { date: Date }) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
      ? "selected-date"
      : "";
  };

  return (
    <div>
      <Calendar
        onChange={onChangeCalendar}
        value={calendarValue}
        tileClassName={tileClassName}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
      />
      <style>{`
        .selected-date {
          background-color: #007bff; 
          color: white;
        }
        .react-calendar {
          border: none; 
        }
      `}</style>
    </div>
  );
}
