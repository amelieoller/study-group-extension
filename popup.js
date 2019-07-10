let sgObject = document.getElementById('sg-objects');
sgObject.focus();

chrome.storage.sync.get('sg', function(data) {
	sgObject.value = data.sg ? data.sg : '';
});

sgObject.addEventListener(
	'input',
	function(element) {
		let newSgObject = element.target.value;
		debugger;
		chrome.storage.sync.set({ sg: newSgObject });
	},
	false
);

let submitButton = document.getElementById('submit-button');

submitButton.onclick = function() {
	var sgData = sgObject.value;

	chrome.tabs.executeScript(
		null,
		{ code: 'var sgData = ' + sgData },
		function() {
			chrome.tabs.executeScript(null, { file: 'inject.js' }, function() {});
		}
	);
};
