import Profile from "../models/profile";

export const profile = async(req, res) => {
    const { name, email, about, image, banner, wallet } = req.body;
    if (!name.length && !email.length) {
        return res.json({
            error: "Name, Email and Wallet Address Required",
        });
    }
    try {
        const profile = new Profile({
            name,
            email,
            about,
            image,
            banner,
            wallet,
        });
        profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error Found");
    }
};

export const findUser = async(req, res) => {
    try {
        const profile = await Profile.findById(req.auth._id);
        //usefollowing list
        let following = profile.following;
        following.push(profile._id);
        const people = await Profile.find({ _id: { $nin: following } })
            .select("name wallet")
            .limit(10);
        res.json(people);
    } catch (err) {
        console.log(err);
    }
};

export const searchUser = async(req, res) => {
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