
# Crypto Price Notifier

This Node.js application fetches the current prices of Bitcoin, Ethereum, and Solana in US dollars every hour and sends a desktop notification with the latest values. The program is designed to run continuously and ensures that notifications are sent precisely at the start of each hour. All events are logged locally for later review.

## Features

- Fetches the prices of Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) in USD from the [CryptoCompare API](https://min-api.cryptocompare.com/).
- Sends a desktop notification with the latest crypto prices for quick and easy access.
- Logs all events to a local file (`logs/app.log`).
- Ensures accurate scheduling to execute tasks at the start of each hour.

## Requirements

- Node.js (v14 or higher recommended)

- CryptoCompare API Key

- Environment file (.env) with the following variables:

```env
CRYPTOCOMPARE_API_KEY=your_cryptocompare_api_key
```

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/NGiudiDev/crypto-price-notifier.git
  cd crypto-price-notifier
```

2. Install dependencies:

```bash
  npm install
```

3. Create a `.env` file in the root directory and configure the required environment variables as shown above.

## Usage

1. Start the application:

```bash
node src/index.js
```

Alternatively, you can use [PM2](https://pm2.keymetrics.io/) to run the application as a background service:

```bash
pm2 start src/index.js --name crypto-price-notifier
```

2. The program will automatically fetch the crypto prices and send a desktop notification every hour on the dot.

## Example Output

Example notification message:

```
Precios actuales:
- Bitcoin (BTC): $29123.45
- Ethereum (ETH): $1823.67
- Solana (SOL): $42.15
```

Example log output:

```
[2025-08-10T12:00:00.000Z] INFO: Iniciando el proceso para obtener los precios de las criptomonedas...
[2025-08-10T12:00:01.000Z] INFO: Datos obtenidos correctamente. Mensaje a enviar:
[2025-08-10T12:00:01.000Z] INFO: Precios actuales:
- Bitcoin (BTC): $29123.45
- Ethereum (ETH): $1823.67
- Solana (SOL): $42.15
[2025-08-10T12:00:01.000Z] INFO: Notificación mostrada en el sistema operativo.
```

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features.

## Acknowledgements

- [CryptoCompare](https://min-api.cryptocompare.com/) for providing real-time cryptocurrency data.
