function getData() {
	var deferredData = new jQuery.Deferred();

	$.ajax({
		type: "GET", 
		url: "http://128.119.235.8/dormbell",
		success: function(data) {
			deferredData.resolve(data);
		},

		complete: function(textStatus) {
			if(textStatus === "error") {
				console.log("error");
			}
		}

	});

	return deferredData;
}

function analyzeData() {
	var data = getData();
	var alertCode = "alert('Someone is outside!')";


	$.when(data).done(function(d) {
		var jsonData = JSON.stringify(d);
		console.log(jsonData);
		if(jsonData <= 40) {
			chrome.tabs.executeScript({code: alertCode}, function() {
          		if(chrome.runtime.lastError) return;
        	});
		}
	});
}

var timer = setInterval(function() {
	analyzeData();
}, 3000);