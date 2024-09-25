import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import styled from "styled-components";

const StyledCalendarDiv = styled.div`
  background-color: white;
  border-radius: 1%;
  width: 100%;
`;

const Calendar = ({ refresh }) => {
  const loginMemberNo = sessionStorage.getItem("loginMemberNo");

  const [bTripList, setBTripList] = useState([]);
  const [outsideWorkList, setOutsideWorkList] = useState([]);
  const [vacationList, setVacationList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    console.log("렌더중");
    fetch(
      `${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/attendance/business-trip?loginMemberNo=${loginMemberNo}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setBTripList(data.bTripList);
      });

    fetch(
      `${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/attendance/outside-work?loginMemberNo=${loginMemberNo}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setOutsideWorkList(data.outsideWorkList);
      });

    fetch(
      `${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/attendance/vacation?loginMemberNo=${loginMemberNo}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setVacationList(data.vacationList);
      });
  }, [refresh, loginMemberNo]);

  const events = () => {
    const eventList = [];
    
    bTripList.forEach((vo) => {
      eventList.push({
        id: vo.no,
        title: "출장",
        start: vo.startDate,
        end: vo.endDate,
        color: "orange",
      });
    });

    outsideWorkList.forEach((vo) => {
      eventList.push({
        id: vo.no,
        title: "외근",
        start: vo.startTime,
        end: vo.endTime,
        color: "green",
      });
    });

    vacationList.forEach((vo) => {
      eventList.push({
        id: vo.no,
        title: "휴가",
        start: vo.startDate,
        end: vo.endDate,
      });
    });

    return eventList;
  };

  const handleEventClick = (info) => {
    console.log("클릭호출");
    setSelectedEvent(info.event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <StyledCalendarDiv>
      <FullCalendar
        locale={koLocale}
        // defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        aspectRatio="2.5"
        contentHeight={600}
        events={events()}
        eventClick={handleEventClick}
      />

      {modalVisible && (
        <div className="modal">
          <h2>이벤트 수정</h2>
          <div>
            <h2>제목 :</h2>
            <input type="text" placeholder={selectedEvent.title} />
            <button onClick={closeModal}>수정 완료</button>
          </div>
        </div>
      )}
    </StyledCalendarDiv>
  );
};

export default Calendar;
