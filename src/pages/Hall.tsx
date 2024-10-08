import React, { useEffect, useState } from "react";
import "../css/map.css";
import Place from "../component/Place";
import Card from "../component/Card";
import Loading from "../component/Loading";

declare global {
  interface Window {
    kakao: any;
  }
}
interface Mark {
  fcltynm: string;
  adres: string;
}

interface Performance {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

export default function Hall() {
  const [fclt, setFclt] = useState<[]>([]);
  const [markedIds, setMarkedIds] = useState<Mark[]>([]);
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://ruehan-kopis.org/performance-facilities?&cpage=1&rows=3200`;
      const res = await fetch(url);
      const data = await res.json();
      setFclt(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (fclt.length === 0) return;

    setLoading(true);

    const initMap = (latitude: number, longitude: number) => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 5,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const displayMarker = (place: any) => {
        const { la, lo, fcltynm, adres } = place;

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(la, lo),
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(
            `<div style="padding:5px;font-size:12px;">${fcltynm}</div>`
          );
          infowindow.open(map, marker);
        });

        setMarkedIds((prevMarkedIds) => {
          if (!prevMarkedIds.some((item) => item.fcltynm === fcltynm)) {
            return [...prevMarkedIds, { fcltynm, adres }];
          }
          return prevMarkedIds;
        });
      };

      const fetchPerformances = async () => {
        const performancePromises = markedIds.map(async (item) => {
          const performanceUrl = `https://ruehan-kopis.org/performances?stdate=20241002&eddate=20241002&cpage=1&rows=10&shprfnmfct=${item.fcltynm}`;

          try {
            const response = await fetch(performanceUrl);
            const performanceData = await response.json();
            return performanceData;
          } catch (error) {
            console.error(error);
            return [];
          }
        });

        const results = await Promise.all(performancePromises);
        const flattenedPerformances = results.flat();
        setPerformances(flattenedPerformances);
        setLoading(false);
      };

      fetchPerformances();

      fclt.forEach((location) => {
        const { la, lo } = location;

        const distance =
          Math.sqrt(Math.pow(latitude - la, 2) + Math.pow(longitude - lo, 2)) *
          111139;

        if (distance <= 5000) {
          displayMarker(location);
        }
      });
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initMap(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  }, [fclt, markedIds]);

  return (
    <div className="Map mw">
      <h2>주변 공연장 안내</h2>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="sec1_map">
            {markedIds.length === 0 ? (
              <p className="blank">검색결과가 없습니다</p>
            ) : (
              <ul>
                {markedIds.map((item, index) => (
                  <Place key={index} item={item} />
                ))}
              </ul>
            )}
          </section>
          <section className="sec2_map">
            <h2>관련 공연</h2>
            {performances.length === 0 ? (
              <p className="blank">검색결과가 없습니다</p>
            ) : (
              <ul>
                {performances.map((item) => (
                  <Card key={item.mt20id} item={item} />
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
