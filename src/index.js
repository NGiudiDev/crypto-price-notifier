import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

//? twilio configurations.
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

//? whatsApp phone numbers (origin and destination).
const fromWhatsApp = `whatsapp:${process.env.ORIGIN_PHONE}`
const toWhatsApp = `whatsapp:${process.env.DESTINE_PHONE}`;

//? initialize twilio client.
const client = twilio(accountSid, authToken);

//? fetch the bitcoin price from the CryptoCompare API.
const fetchCrypto = () => {
  return fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,ARS",
    {
      headers: {
        Authorization: `Apikey ${process.env.CRYPTOCOMPARE_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject(
        new Error(`Error al obtener datos de la API: ${response.status}`)
      );
    }

    return response.json();
  });
};

//? send a WhatsApp message using twilio.
const sendMessage = (message) => {
  return client.messages
    .create({
      body: message,
      from: fromWhatsApp,
      to: toWhatsApp,
    })
    .then((result) => {
      console.log(`Mensaje enviado exitosamente: SID ${result.sid}`);
    })
    .catch((error) => {
      console.error("Error al enviar el mensaje de WhatsApp:", error);
    });
};

//? function to fetch bitcoin price and send the message.
const getBitcoinPrice = () => {
  console.log("Obteniendo el precio de Bitcoin...");

  fetchCrypto()
    .then((cryptoData) => {
      const message = `Precio actual de Bitcoin:\n- USD: $${cryptoData.USD}\n- ARS: $${cryptoData.ARS}`;
      
      console.log("Enviando mensaje con el precio:", message);

      return sendMessage(message);
    })
    .catch((error) => {
      console.error("Error en el proceso de envío del precio de Bitcoin:", error);
    });
};

//? function to calculate the time until the next full hour.
const calculateDelayToNextHour = () => {
  const now = new Date();
  const nextHour = new Date(now);
  
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  
  return nextHour - now;
};

//? schedule the interval to execute every hour on the dot.
const scheduleMessage = () => {
  const delay = calculateDelayToNextHour();

  console.log(`El próximo mensaje se enviará en ${delay / 1000} segundos...`);

  //? wait until the next full hour and then set a regular interval.
  setTimeout(() => {
    getBitcoinPrice();
    setInterval(getBitcoinPrice, 3600000);
  }, delay);
};

//? start the program.
scheduleMessage();