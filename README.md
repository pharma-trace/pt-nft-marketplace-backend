# nft-backend

NFT Backend deployment

This Node JS back which connected to mongDB to store some important details like user information, collection name , categaries and Lazy minted details

We have different API to connect different collection on mongoDB.

## following are the list of different API

```
1. "/create-nft" = This API is used to create record for lazzy NFT
2. "/collection-name/:collectionName" = get list of all the collection in NFT markplace which NFT are linked with Us.
3. "/user-nft/:\_id" =  Get user recored like email,linkdin..
4. "/users-nft" = return list of all users
5. "/find-user" = Seaarch user
6. "/search-user/:query" =
7. "/like-nft" =  someone like NFT for future
8. "/unlike-nft" =  someone dislike the NFT
9. "/get-categories" =  Return all the categories like ART,Music ...
10. "/get-tokenid" =   return NFT TokenID current
11. "/update-tokenid" =  Increase and return tokenID
12. "/create-collection" =  create new collection
13. "/get-collection" = get collection information
14. "/get-all-collection" =  get all collection
15. "/user-profile" = this is user to create user account in mongdb


```
