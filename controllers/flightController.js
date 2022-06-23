const fs = require("fs");
const Flight = require("../models/Flight");

exports.getAllFlight = (req, res) => {
	try {
		return res.status(200).send(Flight);
	} catch (err) {
		return res.status(500).json({
			status: "fail",
			error: err
		});
	}
};

exports.getFlight = (req, res) => {
	try {
		const id = req.params.id * 1;
		const flight = Flight.find((flight) => flight.id === id);

		if (!flight) throw new Error("Flight Not Found!!");

		return res.status(200).send(flight);
	} catch (err) {
		return res.status(404).json({
			status: "fail",
			msg: err.message,
		});
	}
};

exports.createFlight = (req, res) => {
	try {
		const flight = Flight.find((flight) => flight.id === req.body.id);

		if (flight) throw new Error("Flight already exist!!!");

		// if flight does not exist, create new flight
		Flight.push(req.body);

		let newFlight = JSON.stringify(Flight, null, 2);
        
		// add new flight to the flight file
		fs.writeFileSync(`${__dirname}/../models/flight.json`, newFlight);

		return res.status(200).json({
			status: "success",
			msg: "Flight created successfully...",
		});
	} catch (err) {
		return res.status(500).json({
			status: "fail",
			msg: err.message,
		});
	}
};

exports.updateFlight = (req, res) => {
	try {
		const id = req.params.id * 1;
		const body = { ...req.body };

		let flight = Flight.find((flight) => flight.id === id);

		if (!flight) throw new Error("Flight Not Found!!");

		for (let key in body) {
			flight[key] = body[key];
		}

		let updateFlight = JSON.stringify(Flight, null, 2);
		// add new flight to the flight file
		fs.writeFileSync(`${__dirname}/../models/flight.json`, updateFlight);

		return res.status(200).json({
			status: "success",
			msg: "Flight updated successfully...",
		});
	} catch (err) {
		return res.status(500).json({
			status: "fail",
			msg: err.message,
		});
	}
};

exports.deleteFlight = (req, res) => {
	try {
		const id = req.params.id * 1;
		const flight = Flight.find((flight) => flight.id === id);

		if (!flight) throw new Error("Flight Not Found!!");

		const index = Flight.findIndex((object) => {
			return object.id === id;
		});

		Flight.splice(index, 1);

		let deleteFlight = JSON.stringify(Flight, null, 2);

		fs.writeFileSync(`${__dirname}/../models/flight.json`, deleteFlight);

		return res.status(200).json({
			status: "success",
			msg: "Flight deleted successfully...",
		});
	} catch (err) {
		return res.status(500).json({
			status: "fail",
			msg: err.message,
		});
	}
};
