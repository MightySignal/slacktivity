(function() {
	var config = {
		webhook_url: 'https://hooks.slack.com/services/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',
		title: "Custom",
		icon_url: "https://slack.com/img/icons/app-57.png"
	};


	var Slacktivity = {};
	Slacktivity.send = function(data) {

		var payload = {
			attachments: [{
				"fallback": "New Customer Event",
				"text": "New Event!"
			}]
		};

		// set some defaults
		var fields = {
			Timestamp: new Date(),
			URL: window.location.href,
			userAgent: window.navigator.userAgent
		};

		// extract specific keys to upper level
		var specific_keys = [
			"title",
			"text"
		];
		specific_keys.forEach(function(key) {
			if (data[key] !== undefined) {
				payload.attachments[0][key] = data[key];
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
			}
		});

		var request = new XMLHttpRequest();
	    request.open('POST', config["webhook_url"], true);
	    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	    request.send(JSON.stringify(payload));
	}

	window.Slacktivity = Slacktivity;
	// Example usage
	// window.Slacktivity.send({
	// 	"My Field": "Some Value"
	// });
})()