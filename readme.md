# Shadhin Bangla Railway

This is a train Service Management System with Scheduling, Wallet Integration, and User Management.

## run the project

```
1. npm i node bcrypt cors dotenv express jsonwebtoken mongo mongoose node node cron validator
```

## working with the APIs

Root directory with versioning `http://localhost:5000/api/v1`

## user routes

1. post `/user/signup`

   - example `req.body`

   ```
   {
       "name": "Grace Lee",
       "email": "gracelee@example.com",
       "password": "aBc123!"
   },
   ```

2. get `/user/login`

   - example `req.body` for login

   ```
   {
       "email": "gracelee@example.com",
       "password": "aBc123!"
   }
   ```

## station routes

1. post `/station`

   - example `req.body`

   ```
    {
       "name": "Central Station",
       "distanceFromCenter": 5,
       "location": {
           "city": "New York",
           "state": "New York"
       }
   }
   ```

2. get `/station`

   - example `req.body`

   ```
    {
       "name": "Central Station",
    }
   ```

3. patch `/station/:id` id = stationId

   you can add update single or multiple fields

   - example `req.body`

   ```

    {
       "name": "Central Station",
       "distanceFromCenter": 5,
       "location": {
           "city": "New York",
           "state": "New York"
       }
   }
   ```

## ticket route

1.  post `/purchase-ticket`

    validated for insufficient balance, used aggregation.

    stopStation and startStation availability is checked. If the train.stops array does not include these station, ticket purchase is not performed and user is sent all the stops for the train and then choose from it.

    To calculate fare, a special property `distanceFromCenter` is used. For this, I have imagined a central station from where every train starts. `distanceFromCenter` is treated as km and the fare is calculated according to stops and travel distance.

    - example `req.body`

    ```
    {
    "userId": "66be0d5bd17a80d9cbd73b4f",
    "trainId": "66be0cbfd7bcad03c59c2a6d",
    "startStation": "Downtown Station",
    "stopStation": "Grand Terminal"
    }
    ```

## wallet route

1. post `/wallet`

   - example `req.body`

   ```
    {
   	"user": {
   		"email": "johndoe2@example.com",
   		"id": "66be0d5bd17a80d9cbd73b4f"
   	},
   	"balance": 0,
   	"transactions": []
    }
   ```

2. get `/wallet/:email` email = user.email

   - example `req.body`

   ```
    n/a
   ```

3. get `/balance/:email` email = user.email

   - example `req.body`

   ```
    n/a
   ```

4. patch `/add-balance/:email` email = user.email

   - example `req.body`

   ```
    {
    "amount": 4
    }
   ```

## train route

1. post `/train/add-train`

   - example `req.body`

   ```
     {
        "name": "Express Line 1",
        "stops": [
            {
                "station": "Grand Terminal",
                "distanceFromCenter": 19,
                "arrivalTime": "09:00",
                "departureTime": "09:10"
            },
            {
                "station": "City Center Station",
                "distanceFromCenter": 24,
                "arrivalTime": "09:30",
                "departureTime": "09:40"
            },
            {
                "station": "Lakeside Station",
                "distanceFromCenter": 30,
                "arrivalTime": "10:00",
                "departureTime": "10:10"
            },
            {
                "station": "Capitol Station",
                "distanceFromCenter": 37,
                "arrivalTime": "10:30",
                "departureTime": "10:40"
            },
            {
                "station": "Bayfront Station",
                "distanceFromCenter": 41,
                "arrivalTime": "11:00",
                "departureTime": "11:10"
            },
            {
                "station": "Downtown Station",
                "distanceFromCenter": 46,
                "arrivalTime": "11:30",
                "departureTime": "11:40"
            }
        ],
        "status": "Scheduled"
    },
   ```
