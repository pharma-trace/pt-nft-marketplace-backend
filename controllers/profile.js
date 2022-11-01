import Profile from "../models/profile";
var multiparty = require("multiparty");

export const profile = async (req, res) => {
  var response = {};
  const {
    name,
    email,
    about,
    isColour,
    image,
    banner,
    customURL,
    websiteURL,
    facebookURL,
    twitterURL,
    instagramURL,
    tiktokURL,
    youtubeURL,
    wallet,
  } = req.body;
  //   if (!name.length && !email.length) {
  //     return res.json({
  //       error: "Name, Email and Wallet Address Required",
  //     });
  //   }
  try {
    const profile = new Profile({
      name,
      email,
      about,
      isColour,
      image,
      banner,
      customURL,
      websiteURL,
      facebookURL,
      twitterURL,
      instagramURL,
      tiktokURL,
      youtubeURL,
      wallet,
    });
    profile.save();
    response.status = 200;
    response.data = profile;
    response.message = "";

    res.json(profile);
  } catch (err) {
    console.log(err);
    response.status = 400;
    response.data = profile;
    response.message = err;
    // return res.status(400).send("Error Found");
    return res.json(response);
  }
};
export const updateProfile = async (req, res) => {
  var response = {};
  const {
    name,
    email,
    about,
    isColour,
    image,
    banner,
    customURL,
    websiteURL,
    facebookURL,
    twitterURL,
    instagramURL,
    tiktokURL,
    youtubeURL,
    wallet,
  } = req.body;
  try {
    // const tokenCountRes = await tokenCount.findAndModify(
    //   { name: "pharmatraceToken" },
    //   { $inc: { tokenId: 1 } }
    // );
    var response = {};

    const profileUpdateRes = await Profile.findByIdAndUpdate(
      { wallet: req.body.wallet },
      {
        name: name,
        email: email,
        about: about,
        isColour: isColour,
        image: image,
        banner: banner,
        customURL: customURL,
        websiteURL: websiteURL,
        facebookURL: facebookURL,
        twitterURL: twitterURL,
        instagramURL: instagramURL,
        tiktokURL: tiktokURL,
        youtubeURL: youtubeURL,
      },
      { new: true }
    );
    response.status = 200;
    response.data = profileUpdateRes.tokenId;
    res.json(response);
  } catch (err) {
    var response = {};
    response.status = 400;
    res.json(tokenCountRes);

    console.log(err);
  }
};

export const findUser = async (req, res) => {
  var response = {};

  try {
    // console.log("req.query.address", req);
    const profileRes = await Profile.find({ wallet: req.query.address }, {});
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    response.status = 200;
    response.row = profileRes;
    response.message = "";
    res.json(response);
  } catch (err) {
    // profileRes.status = 400;
    response.status = 400;
    response.data = [];
    response.message = err;
    res.json(response);

    console.log(err);
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  //regex is a special method for mongodb
  // The i modifier is used to perform case-insensitive matching
  try {
    const profile = await Profile.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    }).select("_id name");
    res.json(profile);
  } catch (err) {
    console.log(err);
  }
};

function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    let form = new multiparty.Form({ uploadDir: process.env.IMAGE_UPLOAD_URL });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      var data = {};
      const keys = Object.keys(fields);
      keys.forEach((k) => {
        data[k] = fields[k][0];
      });
      if (files.image) {
        const imagePath = files.image[0].path;
        const imageFileName = imagePath.slice(imagePath.lastIndexOf("/"));
        const imageURL = process.env.IMAGE_URL + imageFileName;
        data["image"] = imageURL;
      }
      resolve(data);
    });
  });
}
export const createUpdateProfile = async (req, res) => {
  var response = {};
  try {
    const data = await parseMultipartForm(req);
    try {
      var profileObj = await Profile.find({ wallet: req.query.address }, {});
      const inputs = {
        name: data.name,
        email: data.email,
        about: data.about,
        isColour: data.isColour,
        image: data.image,
        banner: data.banner,
        customURL: data.customURL,
        websiteURL: data.websiteURL,
        facebookURL: data.facebookURL,
        twitterURL: data.twitterURL,
        instagramURL: data.instagramURL,
        tiktokURL: data.tiktokURL,
        youtubeURL: data.youtubeURL,
        wallet: data.wallet,
      };
      console.log(profileObj, "profileObj");
      console.log(profileObj.length, "profileObj.length");
      if (!profileObj || profileObj.length == 0) {
        const profile = new Profile(inputs);
        profile.save();
        response.data = profile;
        response.message = "created successfully";
      } else {
        const profile = await Profile.findOneAndUpdate(
          { wallet: inputs.wallet },
          {
            ...inputs,
          },
          { new: true }
        );
        response.data = profile;
        response.message = "update successfully";
      }
      response.status = 200;
      res.json(response);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
