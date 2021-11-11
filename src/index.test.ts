import test from 'ava';
import { standardizeGeolocation } from '.';

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min + 1) + min;
const randomElevation = () => randomBetween(-1000, 1000);
const randomLatitude = () => randomBetween(-89.99, 89.99);
const randomLongitude = () => randomBetween(-179.99, 179.99);
const randomPoint = () => ({
  latitude: randomLatitude(),
  longitude: randomLongitude(),
  elevation: randomElevation()
});

test('understands object with keys latitude and longitude', t => {
  const testPoint = {
    latitude: randomLatitude(),
    longitude: randomLongitude()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.latitude);
  t.is(actual.longitude, testPoint.longitude);
});

test('understands object with keys lat and lng', t => {
  const testPoint = {
    lat: randomLatitude(),
    lng: randomLongitude()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.lat);
  t.is(actual.longitude, testPoint.lng);
});

test('understands object with keys lat and long', t => {
  const testPoint = {
    lat: randomLatitude(),
    long: randomLongitude()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.lat);
  t.is(actual.longitude, testPoint.long);
});

test('understands object with keys lat and lon', t => {
  const testPoint = {
    lat: randomLatitude(),
    lon: randomLongitude()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.lat);
  t.is(actual.longitude, testPoint.lon);
});

test('understands array with length of 2 as latitude and longitude', t => {
  const testPoint = [randomLatitude(), randomLongitude()];

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint[0]);
  t.is(actual.longitude, testPoint[1]);
});

test('understands array with length of 3 as latitude, longitude, and elevation', t => {
  const testPoint = [randomLatitude(), randomLongitude(), randomElevation()];

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint[0]);
  t.is(actual.longitude, testPoint[1]);
  t.is(actual.elevation, testPoint[2]);
});

test('understands valid point with elevation as "elevation"', t => {
  const testPoint = {
    latitude: randomLatitude(),
    longitude: randomLongitude(),
    elevation: randomElevation()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.latitude);
  t.is(actual.longitude, testPoint.longitude);
  t.is(actual.elevation, testPoint.elevation);
});

test('understands valid point with elevation as "alt"', t => {
  const testPoint = {
    lat: randomLatitude(),
    lng: randomLongitude(),
    alt: randomElevation()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.lat);
  t.is(actual.longitude, testPoint.lng);
  t.is(actual.elevation, testPoint.alt);
});

test('understands valid point with elevation as "altitude"', t => {
  const testPoint = {
    lat: randomLatitude(),
    lon: randomLongitude(),
    altitude: randomElevation()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.lat);
  t.is(actual.longitude, testPoint.lon);
  t.is(actual.elevation, testPoint.altitude);
});

test('understands valid point with elevation as "elev"', t => {
  const testPoint = {
    lat: randomLatitude(),
    long: randomLongitude(),
    elev: randomElevation()
  };

  const actual = standardizeGeolocation(testPoint);

  t.is(actual.latitude, testPoint.lat);
  t.is(actual.longitude, testPoint.long);
  t.is(actual.elevation, testPoint.elev);
});

test('can use Array methods to work with array of valid points', t => {
  const testPoints = [randomPoint(), randomPoint(), randomPoint()];
  const actual = testPoints.map(standardizeGeolocation);

  actual.forEach((result, i) => {
    t.is(result.latitude, testPoints[i].latitude);
    t.is(result.longitude, testPoints[i].longitude);
    t.is(result.elevation, testPoints[i].elevation);
  });
});

test('returns type number for valid points', t => {
  const testPoints = [
    randomPoint(),
    [randomLatitude(), randomLongitude()],
    {
      latitude: `${randomLatitude()}`,
      longitude: `${randomLongitude()}`
    },
    [`${randomLatitude()}`, `${randomLongitude()}`]
  ];

  testPoints
    .map(standardizeGeolocation)
    .forEach(({ latitude, longitude, elevation }) => {
      t.is(typeof latitude, 'number');
      t.is(typeof longitude, 'number');
      t.false(Number.isNaN(elevation));
      t.true(elevation === undefined || typeof elevation === 'number');
    });
});

test('handles points outside a valid range', t => {
  t.throws(() => standardizeGeolocation({ lat: -91, lon: 0 }), {
    instanceOf: RangeError,
    message: /latitude/
  });

  t.throws(() => standardizeGeolocation({ lat: 91, lon: 0 }), {
    instanceOf: RangeError,
    message: /latitude/
  });

  t.throws(() => standardizeGeolocation({ lat: 0, lon: -181 }), {
    instanceOf: RangeError,
    message: /longitude/
  });

  t.throws(() => standardizeGeolocation({ lat: 0, lon: 181 }), {
    instanceOf: RangeError,
    message: /longitude/
  });
});
