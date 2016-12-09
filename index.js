function getNumberOrUndefined (value) {
  const valueAsNumber = Number(value)
  return isNaN(valueAsNumber) ? undefined : valueAsNumber
}

function standardizeGeolocation (point) {
  if (Array.isArray(point)) {
    if (point.length !== 2 && point.length !== 3) {
      throw new Error('point array not correctly formatted')
    }

    return {
      latitude: getNumberOrUndefined(point[0]),
      longitude: getNumberOrUndefined(point[1]),
      elevation: getNumberOrUndefined(point[2])
    }
  }

  const latitude = point.latitude || point.lat
  const longitude = point.longitude || point.lng || point.lon || point.long
  const elevation = point.elevation || point.alt || point.altitude || point.elev

  if (latitude == null) {
    throw new Error('`latitude` is required but not found')
  } else if (longitude == null) {
    throw new Error('`longitude` is required but not found')
  }

  return {
    latitude: getNumberOrUndefined(latitude),
    longitude: getNumberOrUndefined(longitude),
    elevation: getNumberOrUndefined(elevation)
  }
}

module.exports = {
  standardizeGeolocation
}
