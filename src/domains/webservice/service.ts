import axios from "axios";

async function listContinentsByCode() {
  const {data} = await axios.get('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByCode/JSON')
  return data;
}

async function listContrysByCode() {
  const {data} = await axios.get('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByCode/JSON')
  return data;
}


export default {
  listContinentsByCode,
  listContrysByCode,
};
