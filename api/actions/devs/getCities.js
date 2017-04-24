const resp = require('../../utils/serverResp');
const CityModel = require('../../db').cities;

const getCitiesRequest = async ({ stateCode }) => {
  return await CityModel
    .sequelize
    .query(`
      select distinct on (cities.name) cities.*
      from cities
      where cities."stateCode" = '${stateCode}'
      order by cities.name;`,
      { model: CityModel }
    )
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const getCities = ({ body }) => getCitiesRequest(body);

export default getCities;
