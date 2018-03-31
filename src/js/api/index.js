import bikeRackApi from './clients/bikeRackApi';
import bikeApi from './clients/bikeApi';
import userApi from './clients/userApi';
import RequestManager from './RequestManager';

export default (getToken, setToken) => {
  const requestManager = new RequestManager(getToken, setToken);
  return {
    bikeRack: bikeRackApi(requestManager),
    bike: bikeApi(requestManager),
    user: userApi(requestManager),
  };
};
