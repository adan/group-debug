/**
 * All rights reserved.
 */

function groupRequest(url, data, group, success) {
	hideMessage();
	var tid = setTimeout(function () {showMessage("Loading...")}, 500);
	var fullData = data;
	var gid = group.find('[name="id"]').val();
	if (gid.length > 0) {
		fullData['id'] = gid;
	}
	var gdid = group.find('[name="gdid"]').val();
	var gsid = group.find('[name="gsid"]').val();
	var token = group.find('[name="token"]').val();
	if (gdid.length && gsid.length && token.length) {
		fullData['gdid'] = gdid;
		fullData['gsid'] = gsid;
		fullData['token'] = token;
	}
	$.ajax({
		url: url,
		data: fullData,
		type: "GET",
		dataType: "json",
		success: function(response) {
			clearTimeout(tid);
			hideMessage();
			showResultJSON(response)
			if (success !== "undefined") {
				success();
			}
		},
		error: function(xhr, status, error) {
			clearTimeout(tid);
			showMessage("Error: " + error, true);
		}
	});
}

function groupCreate() {
	var group = $("#group");
	var name = group.find('[name="name"]').val()
	var members = group.find('[name="members"]').val();
	var data = {name: name, members: members};
	groupRequest("group/create", data, group);
}

function groupAdd() {
	var group = $("#group");
	var members = group.find('[name="members"]').val();
	var data = {members: members};
	groupRequest("group/join", data, group);
}

function groupRemove() {
	var group = $("#group");
	var members = group.find('[name="members"]').val();
	var data = {members: members};
	groupRequest("group/remove", data, group);
}

function groupChangeName() {
	var group = $("#group");
	var name = group.find('[name="name"]').val();
	var data = {name: name};
	groupRequest("group/name", data, group);
}

function groupExit() {
	groupRequest("group/exit", {}, $("#group"));
}

function groupMessage() {
	var group = $("#group");
	var message = group.find('[name="message"]').val();
	var data = {message: message};
	groupRequest("group/message", data, group, function () {
		group.find('[name="message"]').setSelection(0, message.length);
	});
}

function groupDeleteMessage() {
	groupRequest("group/delete_message", {}, $("#group"));
}

function groupPush() {
	var group = $("#group");
	var push = group.find('[name="onoff"]:checked').val();
	var data = {push: push};
	groupRequest("group/push", data, group);
}

function groupSave() {
	var group = $("#group");
	var save = group.find('[name="onoff"]:checked').val();
	var data = {save: save};
	groupRequest("group/save", data, group);
}

function groupProfile() {
	groupRequest("group/profile", {}, $("#group"));
}

function groupSettings() {
	groupRequest("group/settings", {}, $("#group"));
}

function groupMembers() {
	groupRequest("group/members", {}, $("#group"));
}

function groupMessages() {
	groupRequest("group/messages", {}, $("#group"));
}

function groupJoined() {
	groupRequest("group/joined", {}, $("#group"));
}
