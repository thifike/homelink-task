# HomeLink task information

## Approach

I wanted to create a "types first" REST API and generate Open API documentation from those types and also present a Swagger UI to be able to test the API without the use of Postman (although I did include a Postman collection in the 'assets' folder just in case).

To be able to generate the Open API documentation I decided to use [TSOA](https://tsoa-community.github.io/). The task specifically said include error handling and input checking, luckily TSOA could do validation of parameters well, and no coding is needed as it is mainly annotation based.

### Input validation

As mentioned before TSOA handles input validation and it is also able to validate parameters too. See the `Device` type as an example in `types.ts`.

```
export interface DeviceCreationParams {
  /**
   * @minLength 3 Series information must not be shorter than 3 characters!
   */
  series: string;
  /**
   * @minLength 3 Model name must not be shorter than 3 characters!
   */
  modelName: string;
  deviceConfiguration:
    | ThermalDeviceConfiguration
    | EnvironmentalDeviceConfiguration
    | SmokeDeviceConfiguration;
}
```

### Data store

For simplicity I decided to create my own File data source which writes into a single JSON file.

## Assumptions made

### The API runs on a Gateway inside the home

I assumed that the API runs on the gateway, so the flow of events are the following:

1. Gateway starts up with empty database
2. New device is installed in the home and paired with the Gateway -> Device invokes the Gateway's registerDevice feature to register itself
3. Configuration updates are done from a user device probably, like a PC or a phone or tablet
4. The registered devices periodically send updates to the gateway about their current readings
5. The gateway is then queried for status (data point)

### Configuration != Status

I thought a device's configuration and its status should be modeled differently, for example a heat alarm has low and high thresholds for temperature but it reports different data; it should return the actual temperature and the status of its alarm (alarming or normal). Therefore I made the configuration integral part of the device's data and created a separate status (data point) entity.

### Device status updates are faked

I created a simulator which fakes device status data points whenever the gateway is queried to be able to demonstrate acting on the faked readings - for example to put an Alarm into Alarm state if the thresholds are breached.

### No tests needed

The task not mentions anywhere specifically that test are needed so I decided to leave them out, just created a single test to showcase how I normally approach it.

## Project structure

```
|
|-- assets
|      |-- HomeLink.postman_collection.json     - the Postman Collection for testing
|-- build                                       - temporary build directory, will contain coverage reports
|-- database
|      |-- database.json                        - sample database with test data
|-- dist                                        - temporary build directory, transpiled .js files go here
|-- src                                         - source files
|-- test                                        - test files
... <usual Node and TypeScript files>
|-- tsoa.json                                   - TSOA instructions
```

## Running the project

### Prerequisites

To be able to run the code you will need to have Node.js (v20+ recommended) installed and both `node` and `npm` available on the path. Verify your installation with these commands:

```
node -v
npm -v
```

The output should look similar to this:

```
$ node -v
v22.11.0
$ npm -v
8.19.2
```

### Install dependencies

Before trying to build or run or test the application, dependencies must be installed first using:

```
npm install
```

### Build

```
npm run build
```

### Run

For this command to work the previous `Build` section must be executed first.

```
npm run server
```

## Test

```
npm run test
```

Coverage report is saved into the `build` folder.

## Update test snapshots

Although it will not be needed, but to update snapshots just run the following command:

```
npm run test-update
```

## Clean

To clean the project folder (remove transpiled files, dependencies, etc.) run the following command:

```
npm run clean
```

Before running anything else after this, the dependencies must be installed again!

## Interacting with the API

The API is accessible on http://localhost:3000.

### Swagger UI

The UI is accessible on http://localhost:3000/docs/.

### Postman

I added a Postman Collection to the project, it's in the `assets` directory. Just import into Postman to play around with the requests.

FYI: The examples saved in Postman use the identifiers that are currently available in the database available in `database/database.json`. If you delete the file, don't forget that the identifiers in the collection must be updated to match the new identifiers!
