import { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";

function ScanQR() {
  const [scanResult, setScanResult] = useState("");
  const [reward, setReward] = useState(null);

  const handleScan = async (result) => {
    if (result && result.text && result.text !== scanResult) {
      setScanResult(result.text);
      try {
        const parsed = JSON.parse(result.text); // expects { id: ..., reward_type: ... }
        const res = await axios.post("http://localhost:5000/api/customers/scan", {
          customer_id: parsed.id,
        });
        setReward(res.data.reward);
      } catch (err) {
        alert("Invalid QR or scan failed.");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrScanner
        delay={500}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px" }}
      />
      <p>Scan Result: {scanResult}</p>
      {reward && (
        <p style={{ color: "green", fontWeight: "bold" }}>{reward}</p>
      )}
    </div>
  );
}

export default ScanQR;
