export interface StandardizedGeolocation {
  elevation?: number;
  latitude: number;
  longitude: number;
}

export type PointInput = string | number;

export interface GeoJSONPoint {
  geometry: {
    coordinates: PointInput[];
    type: string;
  };
}

export type WithElevation =
  | { alt: PointInput }
  | { altitude: PointInput }
  | { elev: PointInput }
  | { elevation: PointInput };

export type WithLatitude = { lat: PointInput } | { latitude: PointInput };

export type WithLongitude =
  | { lon: PointInput }
  | { lng: PointInput }
  | { long: PointInput }
  | { longitude: PointInput };

export type GeolocationInput =
  | readonly PointInput[]
  | (Partial<WithElevation> & WithLatitude & WithLongitude)
  | { location: GeolocationInput }
  | { position: GeolocationInput }
  | GeoJSONPoint;

export function createPoint(
  rawLatitude: PointInput,
  rawLongitude: PointInput,
  rawElevation?: PointInput
): StandardizedGeolocation {
  const latitude = maybeGetNumber(rawLatitude);

  if (latitude === undefined) {
    throw new TypeError('`latitude` is required but not found');
  }

  if (latitude > 90 || latitude < -90) {
    throw new RangeError('`latitude` should be between -90 and 90');
  }

  const longitude = maybeGetNumber(rawLongitude);

  if (longitude === undefined) {
    throw new TypeError('`longitude` is required but not found');
  }

  if (longitude > 180 || longitude < -180) {
    throw new RangeError('`longitude` should be between -180 and 180');
  }

  const elevation = maybeGetNumber(rawElevation);

  return { elevation, latitude, longitude };
}

export function getElevation(point: Partial<WithElevation>): PointInput {
  if ('elevation' in point) {
    return point.elevation;
  } else if ('alt' in point) {
    return point.alt;
  } else if ('altitude' in point) {
    return point.altitude;
  } else if ('elev' in point) {
    return point.elev;
  }
}

export function getLatitude(point: WithLatitude): PointInput {
  if ('latitude' in point) {
    return point.latitude;
  } else if ('lat' in point) {
    return point.lat;
  }
}

export function getLongitude(point: WithLongitude): PointInput {
  if ('longitude' in point) {
    return point.longitude;
  } else if ('lng' in point) {
    return point.lng;
  } else if ('lon' in point) {
    return point.lon;
  } else if ('long' in point) {
    return point.long;
  }
}

function isGeoJSONPoint(point: GeolocationInput): point is GeoJSONPoint {
  return (
    'geometry' in point &&
    'coordinates' in point.geometry &&
    point.geometry.type === 'Point'
  );
}

// HACK: This is a workaround for TypeScript not properly narrowing readonly arrays
function isArray(array: any): array is ReadonlyArray<any> {
  return Array.isArray(array);
}

function maybeGetNumber(value: any): number | undefined {
  const valueAsNumber = Number(value);
  return isNaN(valueAsNumber) ? undefined : valueAsNumber;
}

export function standardizeGeolocation(
  point: GeolocationInput
): StandardizedGeolocation {
  if (isArray(point)) {
    // Geolocation points must have 2 or 3 elements
    if (point.length !== 2 && point.length !== 3) {
      throw new TypeError(
        'point array must have exactly 2 or 3 numeric elements'
      );
    }

    return createPoint(point[0], point[1], point[2]);
  }

  if (isGeoJSONPoint(point)) {
    // GeoJSON points are in [longitude, latitude] order
    return createPoint(
      point.geometry.coordinates[1],
      point.geometry.coordinates[0]
    );
  }

  if ('location' in point) {
    return standardizeGeolocation(point.location);
  }

  if ('position' in point) {
    return standardizeGeolocation(point.position);
  }

  const elevation = getElevation(point);
  const latitude = getLatitude(point);
  const longitude = getLongitude(point);

  return createPoint(latitude, longitude, elevation);
}

export default standardizeGeolocation;
