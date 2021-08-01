module.exports = ({ env }) => ({
    responses: {
      privateAttributes: ['_v', 'id', 'created_at'],
    },
    rest: {
      defaultLimit: 200,
      maxLimit: 250,
    },
  });