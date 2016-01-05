export function newPlanet(planet) {
  return {
    meta: { remote: true },
    type: 'NEW_PLANET',
    planet
  };
}