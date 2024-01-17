import React, { createContext, useCallback, useEffect, useState } from "react";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queueEnabled, setQueueEnabled] = useState(true);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [ticketOrder, setTicketOrder] = useState([]);
  const [completedMeetings, setCompletedMeetings] = useState([]);
  const [ticketQueue, setTicketQueue] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // Fetch z pobieraniem stanu queueEnabled
    fetch("http://localhost:8080/queue")
      .then((res) => res.json())
      .then((data) => {
        setQueueEnabled(data.queueEnabled);
      });

    fetch("http://localhost:8080/companyAd/all")
      .then((res) => res.json())
      .then((data) => {
        const tickets = [];

        data.map((companyAd) => {
          companyAd.applicants.map((applicant) => {
            if (applicant.queueTicket) {
              if (applicant.status === "W kolejce")
                tickets.push({
                  ...applicant.queueTicket,
                  application: applicant,
                });

              if (applicant.status === "W trakcie rozmowy") {
                setCurrentTicket({
                  ...applicant.queueTicket,
                  application: applicant,
                });
                setNotes({
                  [applicant.queueTicket.id]: applicant.queueTicket.notes,
                });
              }

              if (applicant.status === "Zakończono") {
                if (
                  !completedMeetings.some(
                    (meeting) => meeting.id === applicant.queueTicket.id,
                  )
                )
                  completedMeetings.push({
                    ...applicant.queueTicket,
                    application: applicant,
                  });
              }
            }
          }, []);
        }, []);

        const priorityMapping = { HIGH: 3, NORMAL: 2 };
        tickets.sort(
          (a, b) => priorityMapping[b.priority] - priorityMapping[a.priority],
        );

        setTicketQueue(tickets);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addTicketToQueue = (newTicket) => {
    setTicketQueue((prevQueue) => [...prevQueue, newTicket]);
  };

  const removeTicketFromQueue = (ticketId) => {
    setTicketQueue((prevQueue) =>
      prevQueue.filter((ticket) => ticket.id !== ticketId),
    );
  };

  const startMeeting = () => {
    const nextTicketId = ticketOrder[0];
    if (nextTicketId) {
      const nextTicket = ticketQueue.find(
        (ticket) => ticket.id === nextTicketId,
      );
      // setCurrentTicket(nextTicket);
      setTicketQueue((prevQueue) =>
        prevQueue.filter((ticket) => ticket.id !== nextTicketId),
      );
      setTicketOrder((prevOrder) => prevOrder.slice(1));
    }
  };

  const endMeeting = () => {
    currentTicket.application.status = "Zakończono";
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...currentTicket.application,
      }),
    };
    fetch(`http://localhost:8080/applicant`, requestOptions).then(
      (response) => {
        window.location.href = "/queueManagement";
      },
    );
  };

  const updateTicketOrder = useCallback((queue) => {
    const sortedQueue = [...queue].sort((a, b) => {
      if (a.priority === "High" && b.priority === "High") {
        return (a.id || "").localeCompare(b.id || "");
      } else if (a.priority === "High") {
        return -1;
      } else if (b.priority === "High") {
        return 1;
      } else {
        return (a.priority || "").localeCompare(b.priority || "");
      }
    });
    const order = sortedQueue.map((ticket) => ticket.id);
    setTicketOrder(order);
  }, []);

  return (
    <QueueContext.Provider
      value={{
        queueEnabled,
        setQueueEnabled,
        ticketQueue,
        currentTicket,
        startMeeting,
        endMeeting,
        addTicketToQueue,
        removeTicketFromQueue,
        ticketOrder,
        updateTicketOrder,
        completedMeetings,
        setNotes,
        notes,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
