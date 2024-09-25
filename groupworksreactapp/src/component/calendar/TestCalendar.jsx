import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import styled from "styled-components";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import BusinessTripEventFrom from "../attendance/BusinessTripEventFrom";
import OutworkEventForm from "../attendance/OutworkEventForm";
import VacationEventForm from "../attendance/VacationEventForm";

const StyledCalendarDiv = styled.div`
  background-color: white;
  border-radius: 1%;
  width: 100%;

  & > Modal {
    background-color: green;
  }
`;



const TestCalendar = ({ refresh }) => {
  const loginMemberNo = sessionStorage.getItem("loginMemberNo");

  const [eventList, setEventList] = useState([]);  // 이벤트 리스트 상태 추가

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNo, setSelectedNo] = useState("");

  useEffect(() => {

    Promise.all([
      fetch(`${process.env.GROUPWORKS_API_URL}/app/api/attendance/business-trip?loginMemberNo=${loginMemberNo}`).then(resp => resp.json()),
      fetch(`${process.env.GROUPWORKS_API_URL}/app/api/attendance/outside-work?loginMemberNo=${loginMemberNo}`).then(resp => resp.json()),
      fetch(`${process.env.GROUPWORKS_API_URL}/app/api/attendance/vacation?loginMemberNo=${loginMemberNo}`).then(resp => resp.json()),
    ])
    .then(([bTripData, outsideWorkData, vacationData]) => {
      const newEventList = [];

      bTripData.bTripList.forEach((vo) => {
        newEventList.push({
          groupId: "business-trip",
          id: vo.no,
          title: vo.memo !== null ? "출장 : " + vo.memo : "출장",
          start: vo.startDate,
          end: vo.endDate,
          color: "orange",
        });
      });

      outsideWorkData.outsideWorkList.forEach((vo) => {
        newEventList.push({
          groupId: "outside-work",
          id: vo.no,
          title: "외근",
          start: vo.startTime,
          end: vo.endTime,
          color: "green",
        });
      });

      vacationData.vacationList.forEach((vo) => {
        newEventList.push({
          groupId: "vacation",
          id: vo.no,
          title: "휴가",
          start: vo.startDate,
          end: vo.endDate,
        });
      });

      setEventList(newEventList);  // 상태 업데이트
    });
  }, [refresh, loginMemberNo]);


  const handleEventClick = (info) => {
    setModalVisible(true);
    setSelectedNo(info.event.id);
    setSelectedEvent(info.event.groupId);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteEvent = ( ) => {
    fetch(`${process.env.GROUPWORKS_API_URL}/app/api/attendance/${selectedEvent}/${selectedNo}`,{
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.msg === 'okay'){
        alert("삭제완료 !");
        window.location.reload();
      }
      else{
        alert("삭제 실패");
        window.location.reload();
      }
    })
  };

  return (
    <>

      <StyledCalendarDiv>
        <FullCalendar
          locale={koLocale}
          // defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          aspectRatio="2.5"
          contentHeight={600}
          events={eventList}
          eventClick={handleEventClick}
          />  
          {
            modalVisible && 
            (
              <Modal 
              isOpen={modalVisible}
              style={ {
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    width: "100%",
                    height: "100vh",
                    zIndex: "10",
                    position: "fixed",
                    top: "0",
                    left: "0",
                  },
                  content: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "400px",
                    height: "600px",
                    zIndex: "150",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "10px",
                    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "white",
                    justifyContent: "center",
                    overflow: "auto",
                   
                  },
              } }
              >
                <h2>
                수정 / 삭제 하시겠습니까?
                </h2>
                {
                  selectedEvent === 'business-trip'
                  ?
                    <BusinessTripEventFrom type="put" putId={selectedNo} />       
                  :
                  (
                    selectedEvent === 'outside-work'
                    ?
                      <OutworkEventForm type="put" putId={selectedNo}/>
                    :
                    <VacationEventForm type="put" putId={selectedNo} /> 
                  )
                }
                <br />
                <div>
                <Button variant="danger" onClick={handleDeleteEvent}>삭제</Button>
                <Button variant="warning" onClick={closeModal}>닫기</Button>
                </div>
              </Modal>
            )
          }
        </StyledCalendarDiv>
    </>
  );
};

export default TestCalendar;
