"use client";
import { createContext, useContext, useState, useEffect } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [selectedVerifications, setSelectedVerifications] = useState([]); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Running on client
    const savedAmount = localStorage.getItem("amount");
    const savedVerifications = localStorage.getItem("selectedVerifications");

    if (savedAmount) setAmount(Number(savedAmount));
    if (savedVerifications) setSelectedVerifications(JSON.parse(savedVerifications));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("amount", amount);
      localStorage.setItem("selectedVerifications", JSON.stringify(selectedVerifications));
    }
  }, [amount, selectedVerifications, isClient]);

  return (
    <PaymentContext.Provider value={{ amount, setAmount, selectedVerifications, setSelectedVerifications }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
