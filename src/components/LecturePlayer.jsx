import React, { useRef, useState, useEffect } from "react";
import "./LecturePlayer.css";

const curriculum = [
  {
    id: 1,
    title: "1. HTML 개요와 역사",
    videoSrc: "/videos/black_beep_1.mp4",
    duration: 600, // 10분
  },
  {
    id: 2,
    title: "2. 기본 구조와 태그",
    videoSrc: "/videos/black_beep_1.mp4",
    duration: 600,
  },
  {
    id: 3,
    title: "3. 시맨틱 태그의 이해",
    videoSrc: "/videos/black_beep_1.mp4",
    duration: 600,
  },
  {
    id: 4,
    title: "4. 폼과 입력 요소",
    videoSrc: "/videos/black_beep_1.mp4",
    duration: 600,
  },
  {
    id: 5,
    title: "5. 멀티미디어 및 베스트 프랙티스",
    videoSrc: "/videos/black_beep_1.mp4",
    duration: 600,
  },
];

const LecturePlayer = () => {
  const videoRef = useRef(null);
  const [selectedLecture, setSelectedLecture] = useState(curriculum[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [selectedLecture]);

  const handleLectureSelect = (lecture) => {
    setSelectedLecture(lecture);
    setProgress(0);
  };

  return (
    <div className="container">
      <div className="video-section">
        <video ref={videoRef} controls key={selectedLecture.id}>
          <source src={selectedLecture.videoSrc} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      </div>
      <div className="info-section">
        <h2>HTML의 이해 - 강의 커리큘럼</h2>
        <ul>
          {curriculum.map((item) => (
            <li
              key={item.id}
              onClick={() => handleLectureSelect(item)}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                fontWeight: selectedLecture.id === item.id ? "bold" : "normal",
                color: selectedLecture.id === item.id ? "#007bff" : "#000",
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>

        <h2>진도율</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{Math.floor(progress)}% 완료</p>
      </div>
    </div>
  );
};

export default LecturePlayer;
