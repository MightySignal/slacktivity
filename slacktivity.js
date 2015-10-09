(function() {
	var config = {
		webhook_url: 'https://hooks.slack.com/services/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', // enter your channel's webhook
		username: "Slacktivity", // or delete if you want to use webhook's default
		fallback: "New Customer Event", // default notification banner text
		icon_url: "https://slack.com/img/icons/app-57.png",
		color: "#0393DD" // default event color
	};


	var Slacktivity = {};
	Slacktivity.send = function(data) {

		var payload = {
			attachments: [{
				title: "New Slacktivity Event!",
				fields: []
			}]
		};

		// set some defaults
		var fields = {
			Timestamp: new Date().toLocaleString(),
			"Referring URL": window.location.href,
			"User Agent": window.navigator.userAgent
		};

		// move stuff from configs to post metadata
		["username", "icon_emoji", "icon_url"].forEach(function(key) {
			if (config[key] !== undefined) {
				payload[key] = config[key];
			}
		});

		// move stuff from configs to attachments metadata
		["fallback", "color"].forEach(function(key) {
			if (config[key] !== undefined) {
				payload.attachments[0][key] = config[key];
			}
		});

		// extract attachments-level meta data from custom data
		var specific_keys = [
			"title",
			"text",
			"fallback",
			"color"
		];
		specific_keys.forEach(function(key) {
			if (data[key] !== undefined) {
				payload.attachments[0][key] = data[key];
				delete data[key]; // delete it so it doesn't show up in form
			}
		});

		// extract post-level metadata from custom data
		specific_keys = [
			"icon_url",
			"channel"
		];
		specific_keys.forEach(function(key) {
			if (data[key] !== undefined) {
				payload[key] = data[key];
				delete data[key]; // delete it so it doesn't show up in form
			}
		});

		Object.keys(data).forEach(function(key) {
			fields[key] = data[key];
		});

		payload.attachments[0].fields = Object.keys(fields).map(function(key) {
			return {
				title: key,
				value: fields[key],
				short: true
			};
		});

		var request = new XMLHttpRequest();
		request.open('POST', config.webhook_url, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		request.send(JSON.stringify(payload));
	};

	window.Slacktivity = Slacktivity;

	// Example usage
	// window.Slacktivity.send({
	// 	"My Field": "Some Value"
	// });
})();
