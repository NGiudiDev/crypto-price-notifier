
# Notificador de Precios de Criptomonedas

Esta aplicación de Node.js obtiene los precios actuales de Bitcoin, Ethereum y Solana en dólares estadounidenses cada hora y envía una notificación de escritorio con los valores más recientes. El programa está diseñado para ejecutarse continuamente y garantiza que las notificaciones se envíen precisamente al inicio de cada hora. Todos los eventos se registran localmente para su posterior revisión.

## Características

- Obtiene los precios de Bitcoin (BTC), Ethereum (ETH) y Solana (SOL) en USD desde la [API de CryptoCompare](https://min-api.cryptocompare.com/).

- Envía una notificación de escritorio con los precios de criptomonedas más recientes para un acceso rápido y fácil.

- Registra todos los eventos en un archivo local (`logs/app.log`).

- Garantiza una programación precisa para ejecutar tareas al inicio de cada hora.

## Requisitos

- Node.js (se recomienda v14 o superior)

- Clave API de CryptoCompare

- Archivo de entorno (.env) con las siguientes variables:

```env
CRYPTOCOMPARE_API_KEY=tu_clave_api_cryptocompare
```

## Instalación

1. Clonar el repositorio:

```bash
  git clone https://github.com/NGiudiDev/crypto-price-notifier.git
  cd crypto-price-notifier
```

2. Instalar dependencias:

```bash
  npm install
```

3. Crear un archivo `.env` en el directorio raíz y configurar las variables de entorno requeridas como se muestra arriba.

## Uso

1. Iniciar la aplicación:

```bash
node src/index.js
```

Alternativamente, puedes usar [PM2](https://pm2.keymetrics.io/) para ejecutar la aplicación como un servicio en segundo plano:

```bash
pm2 start src/index.js --name crypto-price-notifier
```

2. El programa obtendrá automáticamente los precios de las criptomonedas y enviará una notificación de escritorio cada hora en punto.

## Ejemplo de Salida

Mensaje de notificación de ejemplo:

```
Precios actuales:
- Bitcoin (BTC): $29123.45
- Ethereum (ETH): $1823.67
- Solana (SOL): $42.15
```

Salida de registro de ejemplo:

```
[2025-08-10T12:00:00.000Z] INFO: Iniciando el proceso para obtener los precios de las criptomonedas...
[2025-08-10T12:00:01.000Z] INFO: Datos obtenidos correctamente. Mensaje a enviar:
[2025-08-10T12:00:01.000Z] INFO: Precios actuales:
- Bitcoin (BTC): $29123.45
- Ethereum (ETH): $1823.67
- Solana (SOL): $42.15
[2025-08-10T12:00:01.000Z] INFO: Notificación mostrada en el sistema operativo.
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Siéntete libre de usarlo y modificarlo según sea necesario.

## Agradecimientos

- [CryptoCompare](https://min-api.cryptocompare.com/) por proporcionar datos de criptomonedas en tiempo real.
