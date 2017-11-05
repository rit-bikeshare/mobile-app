import { Record } from 'immutable';

const find = /(\_\w)/g;

const convert = matches => {
  return matches[1].toUpperCase();
};

export default class BikeRack extends Record({
  id: null,
  bikeCount: 0,
  lat: null,
  lon: null,
  name: null,
  description: null,
  checkInArea: null
}) {
  static from(data) {
    const fixedCasing = {};
    Object.keys(data).forEach(key => {
      const fixedKey = key.replace(find, convert);
      fixedCasing[fixedKey] = data[key];
    });

    return new BikeRack(fixedCasing);
  }
}
