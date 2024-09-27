import "../css/Detail.css";

export default function Detail() {
  return (
    <div className="detail mw">
      <div className="title">
        <h2>툴투즈 로트렉 : 몽마르트의 별</h2>
        <div className="date_hall">
          <p>2024.09.14 ~ 2025.03.03</p>
          <p>마이아트뮤지엄</p>
        </div>
      </div>
      <section className="sec1">
        <div className="sideL">
          <img src="/img/test.jpg" alt="" />
        </div>
        <div className="sideR">
          <p className="left">등급</p>
          <p className="right">8세 이상 관람가</p>
          <p className="left">관람시간</p>
          <p className="right">165분</p>
          <p className="left">출연</p>
          <p className="right">
            정성화, 양준모, 민우혁, 서영주, 이정열, 정재은, 김진수 등
          </p>
          <p className="left">가격</p>
          <p className="right">
            VIP석 160,000원R석 140,000원S석 110,000원A석 80,000원
          </p>
          <p className="left">공연시간 안내</p>
          <p className="right">금요일(19:30)토요일(14:00,18:30)일요일(14:00)</p>
          <button className="book">예매처 바로가기</button>
        </div>
      </section>
      <section className="sec2">
        <img
          src="http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF246648_240809_0928370.jpg"
          alt=""
        />
      </section>
      <section className="sec3">
        <h2>관람리뷰</h2>
        <button>리뷰 작성하기</button>
        <textarea
          name="review"
          id="review"
          placeholder="리뷰를 작성해주세요"
        ></textarea>
      </section>
    </div>
  );
}
