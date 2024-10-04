import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarsProps {
  onChange: (value: Value) => void;
}

export default function Calendars({ onChange }: CalendarsProps) {
  return (
    <div>
      <Calendar onChange={onChange} />
    </div>
  );
}
