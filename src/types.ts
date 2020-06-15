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
