import { get } from 'BikeShare/data/api/request';

export default {
  fetch() {
    return get('bike-racks/list/');
  }
};
