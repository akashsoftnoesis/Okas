const axios = require('axios');
const { propertyClassLabel } = require('../../helpers/constants');

const fetchPropertyClass = async (req, res) => {
    try {
        let response = await JSON.parse(await cache.getAsync(propertyClassLabel)) 
        if (!response) {
            const headers = {
                Authorization: `Bearer ${process.env.DERRIMUT_API_TOKEN}`,
                'X-Api-Key': process.env.DERRIMUT_API_KEY,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                mode: 'no-cors',
            };
            response = await axios.get(
                'https://ap-southeast-2.api.vaultre.com.au/api/v1.3/types/propertyClass',
                { headers, params: { ...req.query } },
            );
            response = response.data
        }
        return res.status(200).json({
            data: response,
        });
    } catch (error) {
        return res.status(400).json({
            error,
        });
    }
}

module.exports = {
    fetchPropertyClass
}