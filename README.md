# standardize-geolocation

> takes geolocations of different formats and outputs a standardized version

There are several ways of representing geolocations:

  * latitude and longitude
  * latitude, longitude, and elevation
  * lat, lng
  * [number, number, optional number]
  * ...and more (as well as awkward combinations of these already listed)

This module just takes in a geolocation and tries to parse it to a standardized format everyone can use and rely on—an object with keys of latitude, longitude, and elevation

## Usage

This module exports an object with one function (for now): standardizeGeolocation().

**Minimal example:**

```js
const { standardizeGeolocation } = require('standardize-geolocation')

const location = standardizeGeolocation({
  lat: 12.3456,
  lng: -65.4321
})

// location is now:
// { latitude: 12.3456, longitude: -65.4321, elevation: undefined }
```

**Converting lots of points:**

```js
const { standardizeGeolocation } = require('standardize-geolocation')

const bigBunchOfPoints = [
  {lat: 85.238749, lng: 12.923587, elevation: 982},
  {lat: 85.238749, lng: 12.923587, elevation: 982},
  {lat: 85.238749, lng: 12.923587, elevation: 982},
  [85.238749, 12.923587, 982],
  {lat: 85.238749, lng: 12.923587}
]

const locations = bigBunchOfPoints.map(standardizeGeolocation)

```

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install --save standardize-geolocation
```

## See Also
  * [`manuelbieh/Geolib`](https://github.com/manuelbieh/Geolib) - easily do stuff with a list of geolocations (e.g. find nearest, get within radius, etc.)
  * [`blakek/geo2zip`](https://github.com/blakek/geo2zip) - translates latitude / longitude geolocations to the nearest corresponding U.S. zip code
  * [`blakek/us-zips`](https://github.com/blakek/us-zips) - a list of US ZIP codes and their geolocations

## License

MIT
