import Category from "../models/category";
import Collection from "../models/collections";
import NFT from "../models/nft";
import Profile from "../models/profile";
import { regexOrSearch,jsonResponse } from "../helpers/utils";

export const searchAll = async (req, res) => {

    const { search } = req.query
    try {
        const categories = await Category.find()
        const collections = await Collection.find();
        const profiles = await Profile.find(regexOrSearch(["name",'wallet'],search)).limit(5);
        const NFTs = await NFT.find(regexOrSearch(["name","wallet"],search)).limit(5);
        
        return jsonResponse(res,200,{categories,collections,profiles,NFTs})

    }catch(err){
        return jsonResponse(res,400,{message:err.message})
    }
  };
  