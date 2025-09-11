import { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";

function ScanQR() {
  const [scanResult, setScanResult] = useState("");
  const [reward, setReward] = useState(null);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState("");

  const handleScan = async (result) => {
    if (result && result.text && result.text !== scanResult) {
      setScanResult(result.text);

      try {
        const token = localStorage.getItem("token");
        const business_id = localStorage.getItem("business_id");

        // send scan to backend using your scan-wallet route
        const res = await axios.post(
          "https://loyalty-backend-mu.vercel.app/api/scan/scan-wallet",
          { serial: result.text, business_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessage(res.data.message);
        setPoints(res.data.points);
        setReward(res.data.reward);
      } catch (err) {
        console.error(err);
        alert("❌ Scan failed or invalid QR code.");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div>
      <h2>📷 Scan Customer Wallet</h2>
      <QrScanner
        delay={500}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "320px" }}
      />

      {scanResult && <p><b>Serial:</b> {scanResult}</p>}
      {message && <p><b>{message}</b></p>}
      {points !== null && <p>⭐ Points: {points}</p>}
      {reward && <p style={{ color: "green", fontWeight: "bold" }}>🎉 {reward}</p>}
    </div>
  );
}

export default ScanQR;
