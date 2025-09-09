import { useState } from "react";
import axios from "axios";

function WalletCardButton({ customerId }) {
  const [loading, setLoading] = useState(false);
  const [googleUrl, setGoogleUrl] = useState(null);

  const addToAppleWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/apple-wallet/generate/${customerId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `loyalty-${customerId}.pkpass`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Apple Wallet error:", err);
    }
    setLoading(false);
  };

  const addToGoogleWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/google-wallet/generate-link/${customerId}`
      );
      setGoogleUrl(res.data.saveUrl);
      window.open(res.data.saveUrl, "_blank");
    } catch (err) {
      console.error("Google Wallet error:", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={addToAppleWallet} disabled={loading}>
        Add to Apple Wallet
      </button>
      <button onClick={addToGoogleWallet} disabled={loading}>
        Add to Google Wallet
      </button>
      {googleUrl && (
        <p>
          Or open: <a href={googleUrl}>{googleUrl}</a>
        </p>
      )}
    </div>
  );
}

export default WalletCardButton;
