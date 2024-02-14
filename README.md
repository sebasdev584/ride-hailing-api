## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/api](http://localhost:3000) with your browser to navigate api.

## Learn More

For run test

```bash
npm run test
```

## Endpoints
Run Seeder GET
```code
Path: {{baseUrl}}/api/seed
```

Request Get all Rides GET
```code
Path: {{baseUrl}}/api/get-all-riders
```

Response: 
```code
{
    "message": "Datos encontrados",
    "data": [
        {
            "_id": String,
            "latitud": {
                "$numberDecimal": "42.27925"
            },
            "longitud": {
                "$numberDecimal": "-62.73018"
            },
            "__v": 0,
            "createdAt": "2024-02-13T04:16:03.816Z",
            "updatedAt": "2024-02-13T04:16:04.074Z",
            "email_rider": String
        },
    ]
}
```

Request Ride POST
```code
Path: {{baseUrl}}/api/request-ride/{id_rider}
body: {
    "latitud": number,
    "longitud": number,
    "direction": string,
    "email": email string
}
```
Response: 
```code
{
    "message": "Carrera asignada",
    "data": {
        "id_race": String,
        "direction": String
    }
}
```

## Finish Ride POST
```code
Path: {{baseUrl}}/api/finish-ride/{id_race}
body: {
    "km_traveled": 20,
    "payment_type": "credit_card",
    "time": 20
}
```
Response: 
```code
{
    "message": "Carrera finalizada correctamente",
    "data": {
        "id_race": String,
        "amount": Number
    }
}
```

## Payment Race GET
```code
Path: {{baseUrl}}/api/payment/{id_race}
```
Response: 
```code
{
    "message": "Pago realizado correctamente",
    "data": {
        "savePayment": {
            "reference": String,
            "amount": Number,
            "payment_type": "credit_card"
        }
    }
}
```

## Deploy

[App Deploy](ride-hailing-api-dev-gshk.3.us-1.fl0.io)
