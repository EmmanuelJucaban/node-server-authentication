const User = require('./models/user');
const _ = require('lodash');

module.exports = (app) => {
  app.post('/signup',  async (req, res, next) => {
    const body = _.pick(req.body, ['email', 'password']);
    console.log(body);
    try {
      const existingUser = await User.findOne({email: body.email});
      if (existingUser) {
        return res.status(422).send({error: 'User already exists'});
      }
      const user = new User(body);
      await user.save();
      res.json(user);
    } catch (e) {
      res.status(422).send(e);
    }
  });
};
