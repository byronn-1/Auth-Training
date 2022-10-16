import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

/*
1. path login
2. method is post 
3. get email and password from the user
4. compare the password with the password wwe have in the data base
5. if the password does match then we put all that into a JWT and send it back to them
        Other wise reply with a 401 error code

*/
export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db')
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.sendStatus(401);
        }

        const { _id: id, isVerified, passwordHash, info } = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if (isCorrect) {
            jwt.sign(
                { id, isVerified, email, info },
                process.env.JTW_SECRET,
                { expiresIn: '2d' },
                (err, token) => {

                    if (err) {
                        res.status(500).json(err);
                    }

                    res.status(200).json({ token });
                });
        } else {
            res.sendStatus(401);
        }
    }
}