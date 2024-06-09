const admin = require("firebase-admin");


const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.sendNotification = async (registrationToken, message) => {
  // const payload = {
  //   notification: {
  //     title: message.title,
  //     body: message.body,
  //   },
  //   data: message.data || {},
  // };
  // try {
  //   const response = await admin.messaging().sendToDevice(registrationToken, payload);
  //   console.log("Successfully sent message:", response);
  // } catch (error) {
  //   console.log("Error sending message:", error);
  // }

  const payload = {
    token: registrationToken,
    data: {
      title: message.title,
      body: message.body,
    }
  }

  admin.messaging().send(payload)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};


// // Example usage
// const registrationToken = "your-registration-token-from-frontend";
// const message = {
//   title: "Hello",
//   body: "This is a test notification",
//   image: "",
// };

// sendNotification(registrationToken, message);
