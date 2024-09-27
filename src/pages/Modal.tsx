import PickCard from "../component/PickCard";

export default function Modal() {
  return (
    <div>
      <h2>공연 pick 🍀</h2>
      <p className="h2_p">선호하는 공연 3개를 Pick 해주세요 👀</p>
      <ul>
        <PickCard />
        <PickCard />
        <PickCard />
        <PickCard />
      </ul>
    </div>
  );
}
