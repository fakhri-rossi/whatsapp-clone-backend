const userTransformer = (user) => {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    profileImage: user.profileImage,
  };
};

module.exports = userTransformer;
