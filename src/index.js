import dotenv from "dotenv";
import twilio from "twilio";
import winston from "winston";

dotenv.config();

//? winston configuration to create logs.
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "/logs/app.log" }),
  ],
});

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
  logger.info("Obteniendo datos de la API de CryptoCompare...");

  return fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,ARS",
    {
      headers: {
        Authorization: `Apikey ${process.env.CRYPTOCOMPARE_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      logger.error(`Error al obtener datos de la API: ${response.status}`);

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
      logger.info(`Mensaje enviado exitosamente: SID ${result.sid}`);
    })
    .catch((error) => {
      logger.error("Error al enviar el mensaje de WhatsApp:", error);
    });
};

//? function to fetch bitcoin price and send the message.
const getBitcoinPrice = () => {
  logger.info("Iniciando el proceso para obtener el precio de Bitcoin...");

  fetchCrypto()
    .then((cryptoData) => {
      const message = `Precio actual de Bitcoin:\n- USD: $${cryptoData.USD}\n- ARS: $${cryptoData.ARS}`;
      
      logger.info("Datos obtenidos correctamente. Mensaje a enviar:");
      logger.info(message);

      return sendMessage(message);
    })
    .catch((error) => {
      logger.error("Error en el proceso de envío del precio de Bitcoin:", error);
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

  logger.info(`El próximo mensaje se enviará en ${delay / 1000} segundos...`);

  //? wait until the next full hour and then set a regular interval.
  setTimeout(() => {
    getBitcoinPrice();
    setInterval(getBitcoinPrice, 3600000);
  }, delay);
};

//? start the program.
scheduleMessage();