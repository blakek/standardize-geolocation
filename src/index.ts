interface BKGeolocation {
  elevation: number | undefined;
  latitude: number;
  longitude: number;
}

type UncleanPoint = string | number;

type UncleanGeolocationArray = UncleanPoint[];

type UncleanGeolocationObject = {
  alt?: UncleanPoint;
  altitude?: UncleanPoint;
  elev?: UncleanPoint;
  elevation?: UncleanPoint;
  lat?: UncleanPoint;
  latitude?: UncleanPoint;
  lng?: UncleanPoint;
  lon?: UncleanPoint;
  long?: UncleanPoint;
  longitude?: UncleanPoint;
};

function getNumberOrUndefined(value: any): number | undefined {
  const valueAsNumber = Number(value);
  return isNaN(valueAsNumber) ? undefined : valueAsNumber;
}

export function standardizeGeolocation(
  point: UncleanGeolocationArray | UncleanGeolocationObject
): BKGeolocation {
  if (Array.isArray(point)) {
    if (point.length !== 2 && point.length !== 3) {
      throw new Error('point array not correctly formatted');
    }

    return {
      elevation: getNumberOrUndefined(point[2]),
      latitude: getNumberOrUndefined(point[0]),
      longitude: getNumberOrUndefined(point[1])
    };
  }

  const latitude = point.latitude ?? point.lat;
  const longitude = point.longitude ?? point.lng ?? point.lon ?? point.long;
  const elevation =
    point.elevation ?? point.alt ?? point.altitude ?? point.elev;

  if (latitude == null) {
    throw new Error('`latitude` is required but not found');
  } else if (longitude == null) {
    throw new Error('`longitude` is required but not found');
  }

  return {
    elevation: getNumberOrUndefined(elevation),
    latitude: getNumberOrUndefined(latitude),
    longitude: getNumberOrUndefined(longitude)
  };
}

export default standardizeGeolocation;
