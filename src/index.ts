import './types';

function tryGetNumber(value: any): number | undefined {
  const valueAsNumber = Number(value);
  return isNaN(valueAsNumber) ? undefined : valueAsNumber;
}

function createPoint(rawLatitude: any, rawLongitude: any, rawElevation: any) {
  const latitude = tryGetNumber(rawLatitude);

  if (latitude > 90 || latitude < -90) {
    throw new RangeError('`latitude` should be between -90 and 90');
  } else if (latitude == null) {
    throw new Error('`latitude` is required but not found');
  }

  const longitude = tryGetNumber(rawLongitude);

  if (longitude > 180 || longitude < -180) {
    throw new RangeError('`longitude` should be between -180 and 180');
  } else if (longitude == null) {
    throw new Error('`longitude` is required but not found');
  }

  const elevation = tryGetNumber(rawElevation);

  return { elevation, latitude, longitude };
}

export function standardizeGeolocation(
  point: UncleanGeolocationArray | UncleanGeolocationObject
): BKGeolocation {
  if (Array.isArray(point)) {
    // Only points with 2 or 3 elements are likely to be geolocations
    if (point.length !== 2 && point.length !== 3) {
      throw new Error('point array not correctly formatted');
    }

    return createPoint(point[0], point[1], point[2]);
  }

  const elevation =
    point.elevation ?? point.alt ?? point.altitude ?? point.elev;
  const latitude = point.latitude ?? point.lat;
  const longitude = point.longitude ?? point.lng ?? point.lon ?? point.long;

  return createPoint(latitude, longitude, elevation);
}

export default standardizeGeolocation;
