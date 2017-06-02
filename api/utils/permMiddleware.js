// const UserModel = require('../db').users;
// const QuizStatModel = require('../db').quizStats;
// const QuizModel = require('../db').quizzes;
const db = require('../db');

const genError = (message, status = 401) => ({ status, message });

const permMiddleware = () => (req, res, next) => {
  req.permission = {};
  req.permission.shouldAuth = async (filter) => {
    if (!(req && req.session && req.session.user && req.session.user.id)) {
      throw genError('Not authorized');
    }

    const currentUser = await db.sequelize.query(`
      SELECT
      "users"."id",
      "users"."firstName",
      "users"."lastName",
      "users"."pictureURL",
      "users"."ghID",
      "users"."filledProfile",
      "users"."role",
       AVG("correctPercent") AS "quizStats.avg",
      "quizStats.quiz"."title" AS "quizStats.title"

      FROM "users" AS "users"
      LEFT JOIN "quizStats" AS "quizStats"
      ON "users"."id" = "quizStats"."userId"
      AND "quizStats"."finishTime"
      IS NOT NULL
      LEFT OUTER JOIN "quizzes" AS "quizStats.quiz" ON "quizStats"."quizId" = "quizStats.quiz"."id"
      WHERE "users"."id" = :userId
      GROUP BY "users"."id", "firstName", "lastName", "pictureURL", "ghID", "filledProfile", "role", "quizStats.quiz"."title";`,
      {
        replacements: { userId: parseInt(req.session.user.id, 10) },
        type: db.sequelize.QueryTypes.SELECT
      }
    ).then(results => {
      if (!results.length) throw genError('Not authorized');
      const user = {
        quizStats: []
      };
      ['id', 'firstName', 'lastName', 'pictureURL', 'ghID', 'filledProfile', 'role']
        .map(fieldName => user[fieldName] = results[0][fieldName]);

      user.quizStats = results.map(result => ({
        avg: result['quizStats.avg'],
        title: result['quizStats.title']
      }));

      return user;
    });

    // NOTE: doesn't allow exclude ids

    // const currentUser = await UserModel.findOne({
    //   attributes: ['id', 'firstName', 'lastName', 'pictureURL', 'ghID', 'filledProfile', 'role'],
    //   where: { id: req.session.user.id },
    //   include: [{
    //     attributes: [
    //       'quizId',
    //       [db.sequelize.fn('AVG', db.sequelize.col('correctPercent')), 'avg'],
    //       [db.sequelize.fn('COUNT', db.sequelize.col('correctPercent')), 'count']
    //     ],
    //     where: {
    //       finishTime: {
    //         $not: null
    //       }
    //     },
    //     model: QuizStatModel,
    //     as: 'quizStats',
    //     // include: [{
    //     //   model: QuizModel,
    //     //   as: 'quiz',
    //     //   attributes: ['title']
    //     // }]
    //   }],
    //   group: ['users.id', 'firstName', 'lastName', 'pictureURL', 'ghID', 'filledProfile', 'role', 'quizStats.quizId'] // 'quizStats.quiz.title']
    // }).then(item => item.toJSON());

    if (filter) {
      const { role } = filter;
      if (role !== undefined && currentUser.role !== role) throw genError('Unprivileged user');
    }

    req.currentUser = currentUser;

    return currentUser;
  };

  req.permission.onlyStaff = async () => await req.permission.shouldAuth({ role: 'staff' });

  next();
};

export default permMiddleware;
