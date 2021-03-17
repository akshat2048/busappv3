# busappv3
bruh

# Assignment List

### Except Aayush and Akash everyone else should have their stuff done by this Sunday morning.

Akshat - god

Sameer - Work on the map. U will be figuring out how to add the stops and any other requirements into a MapBox REST API GET request and configuring it correctly. https://docs.mapbox.com/api/navigation/directions/ -- use this link to help get you started. U may have to npm install mapbox. -- only do this if u have to. Also when forward geocoding run it as an async function on componentDidMount() of App.js so that it compiles the latitude and longitude of all the addresses while the app is running so that when the bus driver clicks route it instantly does it instead of compiling the latitude and longitude and then generating the route.

Akash - Work w/ Aayush to make the android map. Backend. Need to be able to compute all the data crunched from the showcase app. Essentially you need to receive data from every bus route driven and compute the time/fuel/money saved. First step is to set up a system to receive this data. The computation is super simple. Set up a cluster that monitors objects/documents of the format {"time": Double, "fuel": Double, "money": Double, "routeId": String, "date": String, "id": String}. Set up a system that can effectively compile this data and the stats that go along with it.

Aayush - Work w/ Akash to make the android app happen. https://reactnative.dev/docs/native-modules-android --use this to import native modules into React. https://developer.here.com/documentation/android-sdk-lite/4.4.4.0/dev_guide/index.html --use this to help guide you with implementing android map.

Artie - Work w/ me on making the ios map.

Thevindu - Work on the showcase app. Need to be able to track distance traveled by bus. https://aboutreact.com/react-native-calculate-distance-between-two-locations/ --use this to help get you started. make sure u find out how to get current longitude and latitude. also use precise location.



