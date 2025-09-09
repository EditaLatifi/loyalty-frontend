import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDpPBn6WLUqxHAdLz2TeEbsnEaPxkX3Dro",
  authDomain: "loyaltyapp-ed70b.firebaseapp.com",
  projectId: "loyaltyapp-ed70b",
  storageBucket: "loyaltyapp-ed70b.firebasestorage.app",
  messagingSenderId: "661175051173",
  appId: "1:661175051173:web:9747e8aed5c161057f3e4c"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Replace with your actual VAPID key (from Firebase console)
const VAPID_KEY = "BIjwECbfxgEUOeiBgDu5FXmiMtE9-SGEQIT68uga2_0BtQsXy1h0WtsYUkdaY8mr_x1KwFDmz7ZEHSb2QlSzVS0";

export const getDeviceToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log("🔐 Device FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ Error getting token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
