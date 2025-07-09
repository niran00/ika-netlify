"use client";
import CircleLoader from "react-spinners/CircleLoader";

export default function Preloader() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        zIndex: 999999, // Ensure it covers everything
      }}
    >
      {/* Spinner */}
      <CircleLoader color="#00539f" size={120} />

      {/* Centered Text */}
      <div
        style={{
          position: "absolute",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#00539f",
          pointerEvents: "none",
        }}
      >
        IKA
      </div>
    </div>
  );
}
