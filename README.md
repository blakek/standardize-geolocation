# standardize-geolocation

> takes geolocations of different formats and outputs a standardized version

There are several ways of representing geolocations:

- latitude and longitude
- latitude, longitude, and elevation
- lat, lng
- `longitude`, `lon`, `long`, `lng`
- ...and more (as well as awkward combinations of these already listed)

This module just takes in a geolocation and tries to parse it to a standardized
format everyone can use and rely on: an object with keys of `latitude`, `longitude`,
and `elevation`.

## Install

Using [Yarn]:

```bash
$ yarn add standardize-geolocation
```

…or using [npm]:

```bash
$ npm i --save standardize-geolocation
```

## Usage

```js
import { standardizeGeolocation } from 'standardize-geolocation';

const location = standardizeGeolocation({
  lat: 12.3456,
  lng: -65.4321
});
//» { latitude: 12.3456, longitude: -65.4321, elevation: undefined }

const points = [
  { lat: 85.238749, lng: 12.923587, elevation: 982 },
  { lat: 85.238749, lng: 12.923587, elevation: 982 },
  { lat: 85.238749, lng: 12.923587, elevation: 982 },
  [85.238749, 12.923587, 982],
  { lat: 85.238749, lng: 12.923587 }
];

const locations = points.map(standardizeGeolocation);
// [
//   { elevation: 982, latitude: 85.238749, longitude: 12.923587 },
//   { elevation: 982, latitude: 85.238749, longitude: 12.923587 },
//   { elevation: 982, latitude: 85.238749, longitude: 12.923587 },
//   { elevation: 982, latitude: 85.238749, longitude: 12.923587 },
//   { elevation: undefined, latitude: 85.238749, longitude: 12.923587 }
// ]
```

## API

### `standardizeGeolocation`

```ts
function standardizeGeolocation(point: any): BKGeolocation;
```

Attempts to create an object in this format from any known format:

```ts
{
  elevation: number | undefined;
  latitude: number;
  longitude: number;
}
```

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

### Useful Commands

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                  |
| `yarn format`       | Format the source following the Prettier styles |
| `yarn test`         | Run project tests                               |
| `yarn test --watch` | Run project tests, watching for file changes    |

## See Also

- [`manuelbieh/Geolib`](https://github.com/manuelbieh/Geolib) - easily do stuff with a list of geolocations (e.g. find nearest, get within radius, etc.)
- [`blakek/geo2zip`](https://github.com/blakek/geo2zip) - translates latitude / longitude geolocations to the nearest corresponding U.S. zip code
- [`blakek/us-zips`](https://github.com/blakek/us-zips) - a list of US ZIP codes and their geolocations

## License

MIT
