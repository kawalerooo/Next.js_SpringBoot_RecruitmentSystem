import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export const JobOffersContext = createContext();

export const JobOffersProvider = ({ children }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);
  const [filters, setFilters] = useState({
    positionLevel: {},
    contractType: {},
    workload: {},
    workMode: {},
  });
  const [favoriteOffers, setFavoriteOffers] = useState([]);
  const { data: session } = useSession();

  // const [sessionChecked, setSessionChecked] = useState(false);
  // useEffect(() => {
  //   if (session && !sessionChecked) {
  //     axios.get(`http://localhost:8080/companyAd/all`).then((response) => {
  //       setJobOffers(response.data);
  //     });
  //     setSessionChecked(true);
  //   }
  // }, [session, sessionChecked]);

  useEffect(() => {
    if (session) {
      axios.get(`http://localhost:8080/companyAd/all`).then((response) => {
        setJobOffers(response.data);
      });

      fetch(`http://localhost:8080/user/uid?uid=${session.user.name}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accountRole === "ADMIN") {
            setIsAdmin(true);
          }
        });
    }
  }, [session]);

  const addJobOffer = (jobOffer) => {
    const newJobOffer = {
      ...jobOffer,
      id: generateId(),
    };
    setJobOffers([...jobOffers, newJobOffer]);
  };

  const editJobOffer = (id, updatedJobOffer) => {
    const updatedOffers = jobOffers.map((offer) => {
      if (offer.id === id) {
        return { ...offer, ...updatedJobOffer };
      }
      return offer;
    });
    setJobOffers(updatedOffers);
  };

  const deleteJobOffer = (id) => {
    const updatedOffers = jobOffers.filter((offer) => offer.id !== id);
    setJobOffers(updatedOffers);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const updateFilters = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value],
      },
    }));
  };

  const filterJobOffers = () => {
    return jobOffers.filter((offer) => {
      return Object.keys(filters).every((category) => {
        return Object.keys(filters[category]).every((key) => {
          if (!filters[category][key]) {
            return true;
          }
          return offer[category][key];
        });
      });
    });
  };

  const toggleFavoriteOffer = (id) => {
    setFavoriteOffers((prevFavoriteOffers) => {
      if (prevFavoriteOffers.includes(id)) {
        return prevFavoriteOffers.filter((offerId) => offerId !== id);
      } else {
        return [...prevFavoriteOffers, id];
      }
    });
  };

  const contextValue = {
    jobOffers,
    addJobOffer,
    editJobOffer,
    deleteJobOffer,
    filters,
    updateFilters,
    filterJobOffers,
    favoriteOffers,
    toggleFavoriteOffer,
    isAdmin,
    selectedApplication,
    setSelectedApplication,
  };

  return (
    <JobOffersContext.Provider value={contextValue}>
      {children}
    </JobOffersContext.Provider>
  );
};
