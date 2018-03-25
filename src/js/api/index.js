import bikeRackApi from './clients/bikeRackApi';
import bikeApi from './clients/bikeApi';
import userApi from './clients/userApi';

export default {
  bikeRack: bikeRackApi,
  bike: bikeApi,
  user: userApi,
};
