"use client";
import { createContext, useContext } from "react";

const RecaptchaContext = createContext(null);

export const RecaptchaProvider = ({ recaptchaSiteKey, children }) => {
  return (
    <RecaptchaContext.Provider value={recaptchaSiteKey ?? null}>
      {children}
    </RecaptchaContext.Provider>
  );
};

export const useRecaptchaSiteKey = () => useContext(RecaptchaContext);
