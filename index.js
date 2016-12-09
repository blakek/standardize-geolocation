function standardizeGeolocation (point) {
  if (Array.isArray(point)) {
    if (point.length !== 2 && point.length !== 3) {
      throw new Error('point array not correctly formatted')
    }

    return {
      latitude: Number(point[0]),
      longitude: Number(point[1]),
      elevation: Number(point[2])
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
    latitude: Number(latitude),
    longitude: Number(longitude),
    elevation: Number(elevation)
  }
}

module.exports = {
  standardizeGeolocation
}
