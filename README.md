# Crypto Price Notifier

This Node.js application fetches the current Bitcoin price every hour and sends it as a WhatsApp message using Twilio. The program is designed to run continuously and ensures that messages are sent precisely at the start of each hour.

## Features

- Fetches Bitcoin price in USD and ARS from the [CryptoCompare API](https://min-api.cryptocompare.com/).
- Sends a desktop notification with the price details for quick and easy access.

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
  pm2 start app.js --name bitcoin-price-notifier
```

2. The program will automatically fetch the Bitcoin price and send a WhatsApp message every hour on the dot.

## Example Output

### WhatsApp Message

```
Precios actuales:
- Bitcoin (BTC): $29123.45
- Ethereum (ETH): $1823.67
- Solana (SOL): $42.15
```

### Console Logs

```bash
  The next message will be sent in 3600 seconds...
  Fetching Bitcoin price...
  Sending message with the price: Current Bitcoin price:
  - USD: $26000
  - ARS: $9500000
  Message sent successfully: SID SMXXXXXXXXXXXXXXXXX
```

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features.

## Acknowledgements

- [CryptoCompare](https://min-api.cryptocompare.com/) for providing real-time cryptocurrency data.
