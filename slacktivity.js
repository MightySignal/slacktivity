(function(w) {
	var config = {
		webhook_url: 'https://hooks.slack.com/services/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',
		username: "Custom",
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
			URL: "www.google.com",
			userAgent: w.navigator.userAgent
		};

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

	// Example usage
	// window.Slacktivity.send({
	// 	"My Field": "Some Value"
	// });
})(window)