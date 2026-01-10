"use client";
import React from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const TawkMessenger = ({ propertyId, widgetId }) => {
  return <TawkMessengerReact propertyId={propertyId} widgetId={widgetId} />;
};

export default TawkMessenger;
