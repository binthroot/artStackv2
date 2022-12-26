const Request = require("../models/Request");
const dayjs = require('dayjs');
dayjs().format();

module.exports = {

    getRequest: async (req, res) => {

		try {
			const request = await Request.findById(req.params.id);
			res.json(request);

		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to find request.',
					msgError: true,
					err,
				},
			});
		}
	},
    
    createRequest: async (req, res) => {
        try {
            await Request.create({
                requestName: req.body.requestName,
                price: req.body.price,
                dueDate: req.body.dueDate,
                sku: req.body.sku,
                descriptionText: req.body.descriptionText,
                // user: req.user._id,
                // userName: req.user.userName,
                status: req.body.status,
				artist: req.body.artist,
            });
			
            console.log('Request has been added!');
			res.json({
				message: {
					msgBody: 'Request added!',
					msgError: false,
				},
			});
        } catch(err) {
            console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to create a new request.',
					msgError: true,
					err,
				},
			});
        }
    }

}