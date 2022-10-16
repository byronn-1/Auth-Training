import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

/* 

This is the route that the client sends request to in order to modify the users info
1. path with dynamic userId param
2. method is put (used for updates)
3. Handler 
    3a. get authorization header from the client ( this is from the JWT that the client sends down so we know its them)
    3b. destructure the userId from the URL parameter
    3c. get the updates from the body of the JWT (the changes that the user wants to make)
            3c-1. use object destructuring to get a subset of properties from the response body
            3c-2. use anonymous function to return an object using those properties
            3c-3. then call the anonymous function on the request body by using a IIFE syntax ()()
        NOTE: we do this to make sure that nothing else is added to the data
    3d. check that there is an authorization header
    3e. split the JWT token to get the body NOTE: the auth head looks like this: Bearer: lskdfsknfkds.an!n3kjbvsbud.alsidjaij
    3f. then verify that the token hasn't been tampered with
            3f-1. pass in the token, secret, function to process it
            3f-2. check if there was an error
            3f-3. destructure the id from the decoded data (the data is the users data that they sent back to the server)
            3f-4. check the id matches the id of the user that is sent in the params
            3f-5. if it does match update the data in mongo
                    NOTE: returnOriginal is set to false because by default findOneAndUpdate query returns the original data not the updated by default
            3f-6. destructure the relevant data from the updated user 
            3f-7. sign JWT and send it back to the client
*/

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const updates = (({
            favoriteFood,
            hairColor,
            bio,
        }) => ({
            favoriteFood,
            hairColor,
            bio,
            }))(req.body);
        
        if (!authorization) {
            return res.status(401).json({ message: 'No authorization header sent' });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unable to verify token' });
            }

            const { id } = decoded;

            if (id !== userId) {
                return res.status((403).json({ message: 'Not allowed to update that user\'s data'}))
            }

            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { info: updates } },
                { returnOriginal: false },
            );

            const { email, isVerified, info } = result.value;

            jwt.sign({ id, email, isVerified, info },
                process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err, token) => {
                if (err) {
                    return res.status(200).json(err);
                }
                    res.status(200).json({ token });
            })
        })
    }
}