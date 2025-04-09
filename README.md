### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### Endpoints

### Users ###

### Getters --> GET /users : Gets all users
###             GET /users/by : Gets an user by a key value pair  // {key: @String, value: @any }
### Setters --> POST /users/update : Updates an user by ID // { @User } **Check User class**
### Login / Register --> POST /auth/login: Logs in and returns the user and a token // {email: @String: password: @String}
###                      POST /auth/register Register a new user in the db and grants him a new token // { @User }


## ENV

## DATABASE_URL='YOUR_DATABASE_STRING'
## JWT_KEY='YOUR_JWT_KEY'