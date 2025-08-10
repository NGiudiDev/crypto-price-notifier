import dotenv from "dotenv";
import winston from "winston";
import notifier from "node-notifier";

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
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

//? fetch the prices of BTC, ETH and SOL in USD from the CryptoCompare API.
const fetchCrypto = () => {
  logger.info("Obteniendo datos de la API de CryptoCompare...");

  return fetch(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,SOL&tsyms=USD",
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

//? send a notification in the OS using node-notifier.
const sendMessage = (message) => {
  notifier.notify({
    title: 'Crypto Price Notifier',
    message: message,
    sound: true
  });
  logger.info('Notificación mostrada en el sistema operativo.');
};

//? function to fetch crypto prices and send the message.
const getCryptoPrices = () => {
  logger.info("Iniciando el proceso para obtener los precios de las criptomonedas...");

  fetchCrypto()
    .then((cryptoData) => {
      const message = `Precios actuales:\n- Bitcoin (BTC): $${cryptoData.BTC.USD}\n- Ethereum (ETH): $${cryptoData.ETH.USD}\n- Solana (SOL): $${cryptoData.SOL.USD}`;

      logger.info("Datos obtenidos correctamente. Mensaje a enviar:");
      logger.info(message);

      return sendMessage(message);
    })
    .catch((error) => {
      logger.error("Error en el proceso de envío de los precios de criptomonedas:", error);
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
    getCryptoPrices();
    setInterval(getCryptoPrices, 3600000);
  }, delay);
};

//? start the program.
scheduleMessage();