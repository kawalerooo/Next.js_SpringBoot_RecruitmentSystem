import React, { createContext, useContext, useState } from "react";
import { JobOffersContext } from "../jobOffersFiles/JobOffersContext";
import { format } from "date-fns";

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [ticketQueue, setTicketQueue] = useState([]);

  const { jobOffers } = useContext(JobOffersContext);

  const addApplication = (application, applicationId) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...application,
        applicationDate: format(new Date(), "yyyy-MM-dd"),
      }),
    };
    fetch(
      `http://localhost:8080/companyAd/addApplicant?companyAdId=${applicationId}`,
      requestOptions,
    ).then((response) => console.log(response.json()));
  };

  const updateApplicationStatus = (id, status) => {
    // const updatedApplications = applications.map((application) => {
    //   if (application.id === id) {
    //     return { ...application, status };
    //   }
    //   return application;
    // });
    // setApplications(updatedApplications);
  };

  const addTicketToQueue = (ticket) => {
    setTicketQueue([...ticketQueue, ticket]);
  };

  const isTicketCreatedForApplication = (applicationId) => {
    return ticketQueue.some((ticket) => ticket.id === applicationId);
  };

  const getJobOffer = (jobOfferId) => {
    return jobOffers.find((offer) => offer.id === jobOfferId);
  };

  const getApplication = (applicationId) => {
    // return applications.find((app) => app.id === applicationId);
  };

  const getApplicationDate = (applicationId) => {
    // const application = applications.find((app) => app.id === applicationId);
    // return application ? application.date : "";
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const contextValue = {
    // applications,
    addApplication,
    updateApplicationStatus,
    getJobOffer,
    getApplication,
    getApplicationDate,
    ticketQueue,
    addTicketToQueue,
    isTicketCreatedForApplication, //isTicketCreatedForApplication do kontekstu
  };

  return (
    <ApplicationsContext.Provider value={contextValue}>
      {children}
    </ApplicationsContext.Provider>
  );
};
