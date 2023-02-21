import { food } from '/data';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    if (req.method === 'GET'){
        
        // Run the cors middleware
        // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        
        // Rest of the API logic
        
        return res.status(200).json(food);
    }
}