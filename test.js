import test from 'ava'
import { standardizeGeolocation } from '.'

const randomBetween = (min, max) => Math.random() * (max - min + 1) + min
const randomElevation = () => randomBetween(-1000, 1000)
const randomLatitude = () => randomBetween(-90, 90)
const randomLongitude = () => randomBetween(-180, 180)

test('understands object with keys latitude and longitude', t => {
  const testPoint = {
    latitude: randomLatitude(),
    longitude: randomLongitude()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.latitude)
  t.is(actual.longitude, testPoint.longitude)
})

test('understands object with keys lat and lng', t => {
  const testPoint = {
    lat: randomLatitude(),
    lng: randomLongitude()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.lat)
  t.is(actual.longitude, testPoint.lng)
})

test('understands object with keys lat and long', t => {
  const testPoint = {
    lat: randomLatitude(),
    long: randomLongitude()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.lat)
  t.is(actual.longitude, testPoint.long)
})

test('understands object with keys lat and lon', t => {
  const testPoint = {
    lat: randomLatitude(),
    lon: randomLongitude()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.lat)
  t.is(actual.longitude, testPoint.lon)
})

test('understands array with length of 2 as latitude and longitude', t => {
  const testPoint = [randomLatitude(), randomLongitude()]

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint[0])
  t.is(actual.longitude, testPoint[1])
})

test('understands array with length of 3 as latitude, longitude, and elevation', t => {
  const testPoint = [randomLatitude(), randomLongitude(), randomElevation()]

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint[0])
  t.is(actual.longitude, testPoint[1])
  t.is(actual.elevation, testPoint[2])
})

test('understands valid point with elevation as "elevation"', t => {
  const testPoint = {
    latitude: randomLatitude(),
    longitude: randomLongitude(),
    elevation: randomElevation()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.latitude)
  t.is(actual.longitude, testPoint.longitude)
  t.is(actual.elevation, testPoint.elevation)
})

test('understands valid point with elevation as "alt"', t => {
  const testPoint = {
    lat: randomLatitude(),
    lng: randomLongitude(),
    alt: randomElevation()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.lat)
  t.is(actual.longitude, testPoint.lng)
  t.is(actual.elevation, testPoint.alt)
})

test('understands valid point with elevation as "altitude"', t => {
  const testPoint = {
    lat: randomLatitude(),
    lon: randomLongitude(),
    altitude: randomElevation()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.lat)
  t.is(actual.longitude, testPoint.lon)
  t.is(actual.elevation, testPoint.altitude)
})

test('understands valid point with elevation as "elev"', t => {
  const testPoint = {
    lat: randomLatitude(),
    long: randomLongitude(),
    elev: randomElevation()
  }

  const actual = standardizeGeolocation(testPoint)

  t.is(actual.latitude, testPoint.lat)
  t.is(actual.longitude, testPoint.long)
  t.is(actual.elevation, testPoint.elev)
})

test('can use Array methods to work with array of valid points', t => {
  const randomPoint = () => ({
    lat: randomLatitude(),
    lng: randomLongitude(),
    alt: randomElevation()
  })

  const testPoints = [randomPoint(), randomPoint(), randomPoint()]
  const actual = testPoints.map(standardizeGeolocation)

  actual.forEach((result, i) => {
    t.is(result.latitude, testPoints[i].lat)
    t.is(result.longitude, testPoints[i].lng)
    t.is(result.elevation, testPoints[i].alt)
  })
})
