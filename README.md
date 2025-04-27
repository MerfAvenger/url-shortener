# url-shortener

## Runtime Notes

First, ensure your `.env` file is configured according to [.env.example](/.env.example) file and the instructions in [development notes](#environment).

---

#### Deployment

The application can be built and deployed to your docker runtime using docker compose:

`docker compose up -d`

If there is no existing database, a new one will be initialised using the `POSTGRES_*` variables and the `PGDATA` directory in the provided `.env` file.

---

#### Teardown

To stop the server and preserve the database:

`docker compose down`

To stop the server and clear the database:

**!Warning!** this will delete the data in the database volume!

`docker compose down --volumes`

---

## Development notes

### Environment

To configure your `.env` file:

- Copy [.env.example](/.env.example) and rename it to `.env`.
- Follow the instructions in the file for each value marked "_FILL ME_".

### Client

#### Source Structure

- Containers are the high level components and deal with specific features and tasks.
- The `/Components` folder contains utility components specific to a container.

#### Component Styling

- `index.css` declares global styling for the application.
- `App.css` and other parent components generally control the positioning and maximum bounds of their children.
- General styling for child components (such as in the forms) is set by the parent component.

### Server

#### Routing

- Route handlers handle HTTP response tasks and react to output from services.
- New routes can be added by creating a handler file in `/server/src/routes` and exporting an object with `{method, path, handler}`.
- New routes need to be added to `/server/src/routes/index.ts`

#### Services

- Services interact with the database and safely wrap queries for the route handler.
- New queries for the services are defined under `server/src/queries/index.ts` to make managing and reusing them easier.

### Docker

- The `App.Dockerfile` orchestrates building and deploying the client and the server application, since the server will also be serving the app.
- The `Database.Dockerfile` extends the

## Feature Notes

Some comments on the original specification:

### Build a React application that allows you enter a URL ✔️

The initial application was bootstrapped using Vite + TS + React to create a new application.

### When the form is submitted, return a shortened version of the URL ✔️

When a URL is created the server returns the new short URL and information about it to the frontend to be displayed to the user.

### Save a record of the shortened URL to a database ✔️

When a URL is created it is stored in the database.

### Ensure the slug of the URL ( abc123 in the screenshot above) is unique ✔️

The server attempts to randomly generate a slug. After it has generated one, it checks the databases for references, and will regenerate a new slug up to X times (configurable) until it finds a valid one.

If the server fails to generate a unique slug in the maximum number of attempts, it will fail with a 500.

This process could be more robust, as when the database begins to fill up we will have an increased risk of collisions and potential failures to generate unique URLs.

### When the shortened URL is accessed, redirect to the stored URL ✔️

The server receives requests to `/*slug*`. It then attempts to fetch the associated URL from the database, and redirects the user to it's `long` URL.

### If an invalid slug is accessed, display a 404 Not Found page ❌

The server rejects invalid slugs with a 404 _message_ as a string.

Improvements could be made in order to serve an actual 404 page matching the application styling. One solution with this would be to implement `react-router-dom` in order to allow the application to read and respond to more routes than simply `/`.

The server would then redirect the client to the 404 route if the slug accessed was invalid.

A simpler solution could be to make a static 404 page, and serve this as a response when the user accesses an invalid URL.

### You should have a list of all URLs saved in the database ✔️

When a user creates a URL, it is saved in a Postgres database.

### Add support for accounts so people can view the URLs they have created ✔️

Users must create an account in order to create URLs. The created URLs are then associated with their account using a Postgres Reference field, and fetched by user.

### Validate the URL provided is an actual URL ✔️

This is mostly handled by the frontend HTML \<input\> tag's URL validation, and displayed to the user using CSS Validation to indicate when the URL is invalid.

When the URL is sent to the server it is validated again using the `validator` npm package, and rejected if it fails validation there.

### Display an error message if invalid ✔️

A "Failed to create URL" message is displayed to the user but this could be improved.

### Make it easy to copy the shortened URL to the clipboard ✔️

The application provides a copy button beside the newly generated URL. One improvement could be to also add this to the URL Cards used to display their URLs after creation, too.

### Allow users to modify the slug of their URL ❌

A new `/api/modify-url` endpoint could be created to allow users to edit the randomly generated slug of their URL. This could be accessed by a user from the "My URLs" tab which displays the list.

### Track visits to the shortened URL ✔️

URLs have their `value` field incremented as the router redirects the user to the long URL.

### Add rate-limiting to prevent bad-actors ❌

If given some extra time, one could sit the application behind a service such as Cloudflare or implement a DDoS protection service using docker (for example [DDoS Protect](https://hub.docker.com/r/sflow/ddos-protect/)).

### Add a dashboard showing how popular your URLs are ✔️

Users can view the list of their URLs upon login.

### Build a Docker image of your application ✔️

The application was built with docker in mind, using `compose` to orchestrate building and deploying the application to a machine.

This process could either be used direclty on the host machine, or the images could be built separately and uploaded to a cloud service's repository such as AWS or GCP. It could then be run using their cloud compute services. There may be some changes needed to handle the difference in host user, in particular regarding access to the database data volume.
