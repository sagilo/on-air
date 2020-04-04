# On-Air

## What is On Air?

A NodeJS solution to broadcast your Microsoft Teams presence to a Yeelight smart bulb. The app uses the [Presence Api](https://docs.microsoft.com/graph/api/presence-get), which is available in [Microsoft Graph](https://docs.microsoft.com/graph/overview), allowing to retrieve your presence. This could potentially allow someone to update the Yeelight light bulb from a remote machine they do not use, as long as it is on the same network.

## Hardware Requirements
A Yeelight bulb will help to make this work out of the box, but you can actually use any other bulb and update `src/bulb.js` accordingly.

## Prerequisites
To run the application, you need the following:

- [Node.js](https://nodejs.org/) installed on your machine.
- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.

If you don't have a Microsoft account, there are a couple of options to get a free account:

- You can [sign up for a new personal Microsoft account](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=12&ct=1454618383&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https://mail.live.com/default.aspx&id=64855&cbcxt=mai&bk=1454618383&uiflavor=web&uaid=b213a65b4fdc484382b6622b3ecaa547&mkt=E-US&lc=1033&lic=1).
- You can [sign up for the Office 365 Developer Program](https://developer.microsoft.com/office/dev-program) to get a free Microsoft 365 subscription.

### Register a web application with the Azure Active Directory admin center
- [Register an application](https://github.com/microsoftgraph/msgraph-training-nodeexpressapp/tree/master/Demos/03-add-msgraph) in Azure Active directory
  - Provide `user.read` & `Presence.Read` permissions and get an admin concent 
  - If you are a Microsoft employee, there is a procedure for getting this, contact me (salowenh) for assistance 
  
## Configure the application
1. Clone the repo
1. Rename the `.env.example` file to `.env`
1. Edit the `.env` file and make the following changes.
    1. Replace YOUR_APP_ID_HERE with the Application Id you got from the App Registration Portal.
    1. Replace YOUR_APP_PASSWORD_HERE with the password you got from the App Registration Portal.
    1. Replace BULB_IP with the Yeelight **local** IP
    1. Set INTERVAL_SECONDS with the required presence query interval, default is 2 minutes
1. On you CLI, run the following to install dependencies:
    ```Shell
    npm install
    ```

## Run the application
1. On you CLI, run the following to run the application
    ```Shell
    npm start
    ```

1. Open a browser and browse to `http://localhost:3000`
1. Sign in
1. Hit the `Start` button on the top bar

## Credits
The application is based over [this MS Graph training](https://github.com/microsoftgraph/msgraph-training-nodeexpressapp)

## Other solutions
[Isaac Levin](https://github.com/isaacrlevin) has a [similar application](https://github.com/isaacrlevin/PresenceLight) for Windows which works with Philips Hue
