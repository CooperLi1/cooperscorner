import React from "react";

const backgroundStyle = {
  backgroundImage: "url('/background.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
};

interface BackgroundProps {
  children: React.ReactNode;
}

export default function BackgroundComponent({ children }: BackgroundProps) {
  return <div style={backgroundStyle}>{children}</div>;
}
