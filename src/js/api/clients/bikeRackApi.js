import { get } from '../request';

export default {
  fetch() {
    return get('bike-racks/');
  },
};
