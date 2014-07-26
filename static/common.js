/**
 * All rights reserved.
 */

function showMessage(content, error) {
	var s = $(document.createElement("span"));
	s.attr("class", error?"error":"").text(content);
	var e = $("#error_message");
	e.empty().append(s);
	e.attr("style", "visibility:visible");
}

function hideMessage() {
	$("#error_message").attr("style", "visibility:hidden");
}

function showResult(content) {
	$("#result").text(content);
	$("#result_wrapper").attr("style", "visibility:visible");
}

function showResultJSON(object) {
	showResult(JSON.stringify(object, null, 4))
}

$(document).ready(function () {
	$.ajaxSetup({
		timeout: 10000
	});
});
