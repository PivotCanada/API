module.exports = async (req) => {
  let data = {};

  await Object.keys(req.body).forEach((key) => {
    data[key] = req.body[key];
  });

  return data;
};
