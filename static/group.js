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

function flashInputsError(group, inputs) {
	var elems = [];
	inputs.map(function (input) {
		switch (input) {
		case "id":
			if (group.find('[name="id"]').val().length == 0) {
				elems.push($("#id_section"));
			}
			break;
		case "name":
			if (group.find('[name="name"]').val().length == 0) {
				elems.push($("#name_section"));
			}
			break;
		case "members":
			if (group.find('[name="members"]').val().length == 0) {
				elems.push($("#members_section"));
			}
			break;
		case "message":
			if (group.find('[name="message"]').val().length == 0) {
				elems.push($("#message_section"));
			}
			break;
		default:
			break;
		}
	});
	if (elems.length > 0) {
		flashError(elems);
	}
}

function groupCreate() {
	var group = $("#group");
	flashInputsError(group, ["members"]);
	var name = group.find('[name="name"]').val()
	var members = group.find('[name="members"]').val();
	var data = {name: name, members: members};
	groupRequest("group/create", data, group);
}

function groupAdd() {
	var group = $("#group");
	flashInputsError(group, ["id", "members"]);
	var members = group.find('[name="members"]').val();
	var data = {members: members};
	groupRequest("group/join", data, group);
}

function groupRemove() {
	var group = $("#group");
	flashInputsError(group, ["id", "members"]);
	var members = group.find('[name="members"]').val();
	var data = {members: members};
	groupRequest("group/remove", data, group);
}

function groupChangeName() {
	var group = $("#group");
	flashInputsError(group, ["id", "name"]);
	var name = group.find('[name="name"]').val();
	var data = {name: name};
	groupRequest("group/name", data, group);
}

function groupExit() {
	flashInputsError($("#group"), ["id"]);
	groupRequest("group/exit", {}, $("#group"));
}

function groupMessage() {
	var group = $("#group");
	flashInputsError(group, ["id", "message"]);
	var message = group.find('[name="message"]').val();
	var data = {message: message};
	groupRequest("group/message", data, group, function () {
		group.find('[name="message"]').setSelection(0, message.length);
	});
}

function groupDeleteMessage() {
	flashInputsError($("#group"), ["id"]);
	groupRequest("group/delete_message", {}, $("#group"));
}

function groupPush() {
	var group = $("#group");
	flashInputsError(group, ["id"]);
	var push = group.find('[name="onoff"]:checked').val();
	var data = {push: push};
	groupRequest("group/push", data, group);
}

function groupSave() {
	var group = $("#group");
	flashInputsError(group, ["id"]);
	var save = group.find('[name="onoff"]:checked').val();
	var data = {save: save};
	groupRequest("group/save", data, group);
}

function groupProfile() {
	flashInputsError($("#group"), ["id"]);
	groupRequest("group/profile", {}, $("#group"));
}

function groupSettings() {
	flashInputsError($("#group"), ["id"]);
	groupRequest("group/settings", {}, $("#group"));
}

function groupMembers() {
	flashInputsError($("#group"), ["id"]);
	groupRequest("group/members", {}, $("#group"));
}

function groupMessages() {
	flashInputsError($("#group"), ["id"]);
	groupRequest("group/messages", {}, $("#group"));
}

function groupJoined() {
	groupRequest("group/joined", {}, $("#group"));
}
