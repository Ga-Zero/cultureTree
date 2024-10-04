import "../css/place.css";

interface Mark {
  fcltynm: string;
  adres: string;
}

export default function Place({ item }: { item: Mark }) {
  return (
    <li className="place">
      <p>{item.fcltynm}</p>
      <p>{item.adres}</p>
    </li>
  );
}
