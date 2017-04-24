const resp = require('../../utils/serverResp');
const MarkerModel = require('../../db').markers;

const getDevsRequest = async ({ slug }) => {
  return await MarkerModel
    .sequelize
    .query(`
      select *, ST_Distance(markers.geog, poi.geog)/1000 as distance
      from markers,
      (select c.geog from cities c where c.slug = '${slug}' limit 1) as poi
      ORDER BY markers.geog <-> poi.geog
      LIMIT 10;`,
      { model: MarkerModel }
    )
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const getDevs = ({ body }) => getDevsRequest(body);

export default getDevs;
