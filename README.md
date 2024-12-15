# Crypto Price Notifier

This Node.js application fetches the current Bitcoin price every hour and sends it as a WhatsApp message using Twilio. The program is designed to run continuously and ensures that messages are sent precisely at the start of each hour.

## Features

- Fetches Bitcoin price in USD and ARS from the [CryptoCompare API](https://min-api.cryptocompare.com/).

- Sends a WhatsApp message with the price details using Twilio's messaging API.

- Ensures accurate scheduling to execute tasks at the start of each hour.

## Requirements

- Node.js (v14 or higher recommended)

- Twilio Account with WhatsApp sandbox enabled

- CryptoCompare API Key

- Environment file (.env) with the following variables:

```env
  TWILIO_ACCOUNT_SID=your_twilio_account_sid
  TWILIO_AUTH_TOKEN=your_twilio_auth_token

  ORIGIN_PHONE=your_twilio_sandbox_phone_number
  DESTINE_PHONE=recipient_phone_number_including_country_code
  
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
  node app.js
```

Alternatively, you can use [PM2](https://pm2.keymetrics.io/) to run the application as a background service:

```bash
  pm2 start app.js --name bitcoin-price-notifier
```

2. The program will automatically fetch the Bitcoin price and send a WhatsApp message every hour on the dot.

## Example Output

### WhatsApp Message

```
Current Bitcoin price:
- USD: $26000
- ARS: $9500000
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

## Notes

- Ensure the Twilio sandbox phone number (`ORIGIN_PHONE`) and recipient phone number (`DESTINE_PHONE`) are properly configured.

- The program uses Twilio's free sandbox, which requires prior registration of recipient phone numbers for testing.

- If you encounter any errors during API requests or message sending, check the `.env` file and verify your credentials.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features.

## Acknowledgements

- [Twilio](https://www.twilio.com/) for their powerful messaging API.

- [CryptoCompare](https://min-api.cryptocompare.com/) for providing real-time cryptocurrency data.
