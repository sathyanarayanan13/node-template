# README

This is a variation of the [Express](https://expressjs.com/) template on [Aptible](https://aptible.com).

The app in this repo is deployed at [https://app-52737.on-aptible.com/](https://app-52737.on-aptible.com/).

## Deployment

1. Clone or fork the repository: `https://github.com/aptible/template-express.git`
2. Create an App on Aptible: `aptible apps:create $APP_HANDLE` 
3. Push this repository to the Aptible [Git Remote](https://deploy-docs.aptible.com/docs/git-remote):
`git remote add aptible "$GIT_REMOTE"`
`git push aptible master`
4. Create a default endpoint for the `CMD` service.
5. **Optional**: You can provision a postgres database on the same environment and then use `aptible config:set --app "$APP_HANDLE" DATABASE_URL=${db_url}` to connect your database.

That's it! Your web service will be live on your Endpoint URL as soon as the build finishes.
