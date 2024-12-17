import React, { createContext, useState, useContext } from "react";

// Create Context
const ModalContext = createContext();

// Create Modal Provider
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to toggle the modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use ModalContext
export const useModal = () => useContext(ModalContext);
