/*
 * Copyright (C) 2016 www.phantombot.net
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* 
 * @author IllusionaryOne
 */

/*
 * customCommandsPanel.js
 * Drives the Custom Commands Panel
 */
(function() {
    var modeIcon = [],
        groupIcons = [],
        globalCooldown = "",
        modCooldown = "",
        perUserCooldown = "",
        globalCooldownTime = "",
        disabledCommands = [];

        modeIcon['false'] = "<i style=\"color: #6136b1\" class=\"fa fa-circle-o\" />";
        modeIcon['true'] = "<i style=\"color: #6136b1\" class=\"fa fa-circle\" />";

        groupIcons['0'] = "<i class=\"fa fa-television\" />";
        groupIcons['1'] = "<i class=\"fa fa-cog\" />";
        groupIcons['2'] = "<i class=\"fa fa-shield\" />";
        groupIcons['4'] = "<i class=\"fa fa-dollar\" />";
        groupIcons['3'] = "<i class=\"fa fa-credit-card\" />";
        groupIcons['6'] = "<i class=\"fa fa-clock-o\" />";
        groupIcons['7'] = "<i class=\"fa fa-user\" /></div>";

    /*
     * onMessage
     * This event is generated by the connection (WebSocket) object.
     * @param {String} message
     */
    function onMessage(message) {
        var msgObject;

        try {
            msgObject = JSON.parse(message.data);
        } catch (ex) {
            return;
        }

        // Check for dbkeysresult queries
        if (panelHasQuery(msgObject)) {
            var commandName = "",
                commandValue = "",
                html = "<table>",
                time = "",
                foundData = false;

            if (panelCheckQuery(msgObject, 'commands_cooldown')) {
                html = "<table>";
                for (idx in msgObject['results']) {
                    commandName = msgObject['results'][idx]['key'];
                    time = msgObject['results'][idx]['value'];

                    if (panelMatch(commandName, 'globalCooldown')) {
                        globalCooldown = msgObject['results'][idx]['value'];
                        continue;
                    }
                    if (panelMatch(commandName, 'globalCooldownTime')) {
                        globalCooldownTime = msgObject['results'][idx]['value'];
                        continue;
                    }
                    if (panelMatch(commandName, 'modCooldown')) {
                        modCooldown = msgObject['results'][idx]['value'];
                        continue;
                    }
                    if (panelMatch(commandName, 'perUserCooldown')) {
                        perUserCooldown  = msgObject['results'][idx]['value'];
                        continue;
                    }

                    foundData = true;
                    html += '<tr style="textList">' +
                    '    <td style="vertical-align: middle: width: 70%">!' + commandName + '</td>' +
                    '    <td style="vertical-align: middle">' +
                    '        <form onkeypress="return event.keyCode != 13">' +
                    '            <input style="width: 60%" type="text" id="editCommandCooldown_' + commandName + '"' +
                    '                   value="' + time + '" />' +
                    '              <button type="button" class="btn btn-default btn-xs" onclick="$.editCooldown(\'' + commandName + '\')"><i class="fa fa-pencil" /> </button> ' +
                    '              <button type="button" class="btn btn-default btn-xs" id="deleteCooldown_' + commandName + '" onclick="$.deleteCooldown(\'' + commandName + '\')"><i class="fa fa-trash" /> </button>' +
                    '             </form>' +
                    '        </form>' +
                    '    </td>' +
                    '</tr>';
                }
                html += "</table>";

                if (!foundData) {
                    html = "<i>No entries in cooldown table.</i>";
                }

                $("#cooldownList").html(html);
                $("#toggleGlobalCooldown").html(modeIcon[globalCooldown]);
                $("#togglePerUserCooldown").html(modeIcon[perUserCooldown]);
                $("#toggleModCooldown").html(modeIcon[modCooldown]);
                $('#globalCooldownTimeInput').attr('placeholder', globalCooldownTime).blur();
            }

            if (panelCheckQuery(msgObject, 'commands_commands')) {
                if (msgObject['results'].length === 0) {
                    $('#customCommandsList').html('<i>There are no custom commands defined.</i>');
                    return;
                }

                html = '<table>';
                for (var idx in msgObject['results']) {
                    commandName = msgObject['results'][idx]['key'];
                    commandValue = msgObject['results'][idx]['value'];
                    html += '<tr style="textList">' +
                            '    <td style="vertical-align: middle: width: 60%">!' + commandName + '</td>' +
                            '    <td style="vertical-align: middle">' +
                            '        <form onkeypress="return event.keyCode != 13">' +
                            '            <input style="width: 85%" type="text" id="editCommand_' + commandName + '"' +
                            '                   value="' + commandValue + '" />' +
                            '              <button type="button" class="btn btn-default btn-xs" onclick="$.editCustomCommand(\'' + commandName + '\')"><i class="fa fa-pencil" /> </button> ' +
                            '              <button type="button" class="btn btn-default btn-xs" id="deleteCommand_' + commandName + '" onclick="$.deleteCommand(\'' + commandName + '\')"><i class="fa fa-trash" /> </button>' +
                            '             </form>' +
                            '        </form>' +
                            '    </td>' +
                            '</tr>';
                }
                html += '</table>';
                $('#customCommandsList').html(html);
                handleInputFocus();
            }

            if (panelCheckQuery(msgObject, 'commands_aliases')) {
                if (msgObject['results'].length === 0) {
                    $('#aliasCommandsList').html('<i>There are no aliased commands defined.</i>');
                    return;
                }
                for (idx in msgObject['results']) {
                    commandName = msgObject['results'][idx]['key'];
                    commandValue = msgObject['results'][idx]['value'];
                    html += "<tr class=\"textList\">" +
                            "    <td padding=\"5px\">" +
                            "        <div id=\"deleteAlias_" + commandName + "\" type=\"button\" class=\"btn btn-default btn-xs\" " +
                            "             onclick=\"$.deleteAlias('" + commandName + "')\"><i class=\"fa fa-trash\" />" +
                            "        </div>" +
                            "    </td>" +
                            "    <td>!" + commandValue + "</td>" +
                            "    <td>!" + commandName + "</td>" +
                            "</tr>";


                }
                html += "</table>";
                $("#aliasCommandsList").html(html);
            }

            if (panelCheckQuery(msgObject, 'commands_pricecom')) {
                if (msgObject['results'].length === 0) {
                    $('#priceCommandsList').html('<i>There are no commands with prices defined.</i>');
                    return;
                }
                for (idx in msgObject['results']) {
                    commandName = msgObject['results'][idx]['key'];
                    commandValue = msgObject['results'][idx]['value'];
                    html += '<tr style="textList">' +
                    '    <td style="vertical-align: middle: width: 70%">!' + commandName + '</td>' +
                    '    <td style="vertical-align: middle">' +
                    '        <form onkeypress="return event.keyCode != 13">' +
                    '            <input style="width: 60%" type="text" id="editCommandPrice_' + commandName + '"' +
                    '                   value="' + commandValue + '" />' +
                    '              <button type="button" class="btn btn-default btn-xs" onclick="$.updateCommandPrice(\'' + commandName + '\')"><i class="fa fa-pencil" /> </button> ' +
                    '              <button type="button" class="btn btn-default btn-xs" id="deleteCommandPrice_' + commandName + '" onclick="$.deleteCommandPrice(\'' + commandName + '\')"><i class="fa fa-trash" /> </button>' +
                    '             </form>' +
                    '        </form>' +
                    '    </td>' +
                    '</tr>';
                }
                html += "</table>";
                $("#priceCommandsList").html(html);
                handleInputFocus();
            }

            if (panelCheckQuery(msgObject, 'commands_disabled')) {
                disabledCommands = [];
                for (idx in msgObject['results']) {
                    disabledCommands[msgObject['results'][idx]['key']] = true;
                }
                sendDBKeys("commands_permcom", "permcom");
            }

            if (panelCheckQuery(msgObject, 'commands_permcom')) {
                var commandTableData = msgObject['results'];
                commandTableData.sort(sortCommandTable);

                for (idx in commandTableData) {
                    commandName = commandTableData[idx]['key'];
                    commandValue = commandTableData[idx]['value'];
                    html += "<tr class=\"textList\">" +
                            "<td><strong>" + commandName + "</strong></td>";

                    if (commandName.indexOf(' ') === -1) {
                        if (disabledCommands[commandName] !== undefined) {
                            html +=  "<td><div id=\"commandEnabled_" + commandName + "\"" +
                                     "         data-toggle=\"tooltip\" title=\"Enable Command\" class=\"button\" onclick=\"$.commandEnable('" + commandName + "', 'enable');\">" +
                                     "    <i style=\"color: #6136b1\" class=\"fa fa-toggle-off\" /></div></td>";
                        } else {
                            html +=  "<td><div id=\"commandEnabled_" + commandName + "\"" +
                                     "         data-toggle=\"tooltip\" title=\"Disable Command\" class=\"button\" onclick=\"$.commandEnable('" + commandName + "', 'disable');\">" +
                                     "    <i style=\"color: #6136b1\" class=\"fa fa-toggle-on\" /></div></td>";
                        }
                    } else {
                        html += "<td />";
                    }

                    html += "<td /><td><div id=\"commandsList_" + commandName + "\"><strong><font style=\"color: #6136b1\">" + groupIcons[commandValue] + 
                            "    </font></strong></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Caster\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 0);\">" +
                            "    <i class=\"fa fa-television\" /></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Admin\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 1);\">" +
                            "    <i class=\"fa fa-cog\" /></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Mod\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 2);\">" +
                            "    <i class=\"fa fa-shield\" /></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Donator\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 4);\">" +
                            "    <i class=\"fa fa-dollar\" /></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Sub\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 3);\">" +
                            "    <i class=\"fa fa-credit-card\" /></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Regular\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 6);\">" +
                            "    <i class=\"fa fa-clock-o\" /></div></td>" +

                            "<td><div data-toggle=\"tooltip\" title=\"Set Viewer\" class=\"button\" onclick=\"$.commandPermission('" + commandName + "', 7);\">" +
                            "    <i class=\"fa fa-user\" /></div></td>" +

                            "</tr>";
                }
                html += "</table>";
                $("#permCommandsList").html(html);
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
    }

    /**
     * @function doQuery
     */
    function doQuery() {
        sendDBKeys("commands_commands", "command");
        sendDBKeys("commands_aliases", "aliases");
        sendDBKeys("commands_pricecom", "pricecom");
        sendDBKeys("commands_cooldown", "cooldown");
        sendDBKeys("commands_disabled", "disabledCommands");
    };

    /**
     * @function sortCommandTable
     * @param {Object} a
     * @param {Object} b
     */
    function sortCommandTable(a, b) {
        return panelStrcmp(a.key, b.key);
    };

    /** 
     * @function deleteCommand
     * @param {String} command
     */
    function deleteCommand(command) {
        $("#deleteCommand_" + command).html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        sendDBDelete("commands_delcom_" + command, "command", command);
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { sendCommand("reloadcommand") }, TIMEOUT_WAIT_TIME);
    };

    /** 
     * @function deleteCommandPrice
     * @param {String} command
     */
    function deleteCommandPrice(command) {
        $("#deleteCommandPrice_" + command).html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        sendDBDelete("commands_delcomprice_" + command, "pricecom", command);
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { sendCommand("reloadcommand") }, TIMEOUT_WAIT_TIME);
    };

    /**
     * @function addCustomCommand
     */
    function addCustomCommand() {
    var name = $('#addCommandCommand').val();
    var commandtext = $('#addCommandText').val();

        if (name.length == 0) {
            $("#addCommandCommand").val("Please enter a value");
            setTimeout(function() { $("#addCommandCommand").val(""); }, TIMEOUT_WAIT_TIME * 2);
            return;
        } else if (commandtext.length == 0) {
            $("#addCommandText").val("Please enter a value");
            setTimeout(function() { $("#addCommandText").val(""); }, TIMEOUT_WAIT_TIME * 2);
            return;
        }

        if (name.startsWith('!')) {
            name = name.replace('!', '');
        }

        sendDBUpdate("addCustomCommand", "command", name.toLowerCase(), commandtext);
        setTimeout(function() { $('#addCommandText').val(""); $('#addCommandCommand').val(""); sendCommand("reloadcommand"); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
    };

    /**
     * @function editCustomCommand
     * @param {String} command
     */
    function editCustomCommand(command) {
    var value = $('#editCommand_' + command).val();
        if (value.length > 0) {
            sendDBUpdate("addCustomCommand", "command", command.toLowerCase(), value);
            setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
            setTimeout(function() { sendCommand("reloadcommand"); }, TIMEOUT_WAIT_TIME);
        }
    };

    /**
     * @function editCooldown
     * @param {String} command
     */
    function editCooldown(command) {
        var value = $('#editCommandCooldown_' + command).val();
        if (value.length > 0) {
            sendDBUpdate("commands_cooldown_edit", "cooldown", command.toLowerCase(), value);
            setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME * 2);
        }
    };

    /** 
     * @function aliasCommand
     */
    function aliasCommand() {
        var main = $('#aliasCommandInput').val();
        var alias = $('#aliasCommandInputAlias').val();

        if (main.match(/;/) || main.match(/-/) || main.match(/ /)) {
            $("#aliasCommandInputAlias").val("Error: alias name can not contain special symbols, or spaces.");
            $("#aliasCommandInput").val("");
            setTimeout(function() { $('#aliasCommandInputAlias').val(""); }, TIMEOUT_WAIT_TIME * 10);
            return;
        } else if (alias.length == 0) {
            $("#aliasCommandInputAlias").val("Please enter a value.");
            setTimeout(function() { $("#aliasCommandInputAlias").val(""); }, TIMEOUT_WAIT_TIME * 2);
            return;
        } else if (main.length == 0) {
            $("#aliasCommandInput").val("Please enter a value.");
            setTimeout(function() { $("#aliasCommandInput").val(""); }, TIMEOUT_WAIT_TIME * 2);
            return;
        }

        if (main.startsWith('!')) {
            main = main.replace('!', '');
        } else if (alias.startsWith('!')) {
            alias = alias.replace('!', '');
        }

        sendDBUpdate("addCommandAlias", "aliases", main.toLowerCase(), alias.toLowerCase());
        setTimeout(function() { $('#aliasCommandInput').val(""); $('#aliasCommandInputAlias').val(""); sendCommand("reloadcommand"); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
    };

    /**
     * @function deleteAlias
     * @param {String} command
     */
    function deleteAlias(command) {
        $("#deleteAlias_" + command).html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        if (command.length != 0) {
            sendDBDelete("commands_delalias_" + command, "aliases", command);
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { sendCommand("reloadcommand"); }, TIMEOUT_WAIT_TIME);
    };

    /**
     * @function commandPermission
     */
    function commandPermission(command, group) {
        $("#commandsList_" + command).html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        if (command.length != 0 && group.length != 0) {
            sendDBUpdate("commands_permcom", "permcom", command.toLowerCase(), String(group));
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { sendCommand("reloadcommand"); }, TIMEOUT_WAIT_TIME);
    };

    /**
     * @function setCommandPrice
     */
    function setCommandPrice() {
        var price = $("#setCommandPriceInput").val();
        var com = $("#setCommandPriceInputCommand").val();

        if (com.startsWith('!')) {
            com = com.replace('!', '');
        }

        if (price.length != 0 && com.length != 0) {
            sendDBUpdate("commandPrice", "pricecom", com.toLowerCase(), price);
            $("#setCommandPriceInput").val("");
            $("#setCommandPriceInputCommand").val("");
            setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
        }
    };

    /**
     * @function updateCommandPrice
     */
    function updateCommandPrice(command) {
        var val = $('#editCommandPrice_' + command).val();
        $('#editCommandPrice_' + command).html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        if (val.length > 0) {
            sendDBUpdate("commands_editprice_" + command, "pricecom", command.toLowerCase(), val);
            setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
            setTimeout(function() { sendCommand("reloadcommand"); }, TIMEOUT_WAIT_TIME);
        }
    };

    /**
     * @function toggleGlobalCooldown
     */
    function toggleGlobalCooldown() {
        $("#toggleGlobalCooldown").html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        if (globalCooldown == "true") {
            sendDBUpdate("commands_cooldown_toggle", "cooldown", "globalCooldown", "false");
        } else if (globalCooldown == "false") {
            sendDBUpdate("commands_cooldown_toggle", "cooldown", "globalCooldown", "true");
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME * 2);
        setTimeout(function() { sendCommand("reloadcooldown"); }, TIMEOUT_WAIT_TIME * 2);
    };

    /**
     * @function toggleModCooldown
     */
    function toggleModCooldown() {
        $("#toggleModCooldown").html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        if (modCooldown == "true") {
            sendDBUpdate("commands_cooldown_toggle", "cooldown", "modCooldown", "false");
        } else if (modCooldown == "false") {
            sendDBUpdate("commands_cooldown_toggle", "cooldown", "modCooldown", "true");
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME * 2);
        setTimeout(function() { sendCommand("reloadcooldown"); }, TIMEOUT_WAIT_TIME * 2);
    };

    /**
     * @function togglePerUserCooldown
     */
    function togglePerUserCooldown() {
        $("#togglePerUserCooldown").html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        if (perUserCooldown == "true") {
            sendDBUpdate("commands_cooldown_toggle", "cooldown", "perUserCooldown", "false");
        } else if (perUserCooldown == "false") {
            sendDBUpdate("commands_cooldown_toggle", "cooldown", "perUserCooldown", "true");
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME * 2);
        setTimeout(function() { sendCommand("reloadcooldown"); }, TIMEOUT_WAIT_TIME * 2);
    }


    /**
     * @function setGlobalCooldownTime
     */
    function setGlobalCooldownTime() {
        var newValue = $("#globalCooldownTimeInput").val();
        if (newValue.length > 0) {
            sendDBUpdate("commands_cooldown_time", "cooldown", "globalCooldownTime", String(newValue));
            $("#globalCooldownTimeInput").val('');
            $("#globalCooldownTimeInput").attr('placeholder', newValue).blur();
            setTimeout(function() { sendCommand("reloadcooldown"); }, TIMEOUT_WAIT_TIME * 2);
            setTimeout(function() { 
                doQuery();  
                $("#globalCooldownTimeInput").attr('placeholder', newValue).blur();
                $("#globalCooldownTimeInput").val('');
            }, TIMEOUT_WAIT_TIME * 2);
        }
    }

    /**
     * @function deleteCooldown
     * @param {String} command
     */
    function deleteCooldown(command) {
        $("#deleteCooldown_" + command).html("<i style=\"color: #6136b1\" class=\"fa fa-spinner fa-spin\" />");
        sendDBDelete("commands_cooldown_delete", "cooldown", command);
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
    }

    /**
     * @function addCooldown
     */
    function addCooldown() {
        var input = $("#cooldownCmdInput").val();
        var command = $("#cooldownCmdInputCommand").val();

        if (command.startsWith('!')) {
            command = command.replace('!', '');
        }
        
        if (input.length > 0 && command.length != 0) {
            sendDBUpdate("commands_cooldown_add", "cooldown", String(command), String(input));
            $("#cooldownCmdInput").val("Submitted");
            $("#cooldownCmdInputCommand").val("Submitted");
            setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
            setTimeout(function() { $("#cooldownCmdInputCommand").val(""); $("#cooldownCmdInput").val(""); }, TIMEOUT_WAIT_TIME);
        }
    }

    /**
     * @function commandEnable
     * @param {String} commandName
     * @param {String} action
     */
    function commandEnable(commandName, action) {
        if (panelMatch(action, 'enable')) {
            $('#commandEnabled_' + commandName).html('<i style="color: #333333" class="fa fa-toggle-on" />');
            sendDBDelete('commands_enablecom', 'disabledCommands', commandName);
        } else {
            $('#commandEnabled_' + commandName).html('<i style="color: #333333" class="fa fa-toggle-off" />');
            sendDBUpdate('commands_enablecom', 'disabledCommands', commandName, 'true');
        }
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
    }

    // Import the HTML file for this panel.
    $("#commandsPanel").load("/panel/commands.html");

    // Load the DB items for this panel, wait to ensure that we are connected.
    var interval = setInterval(function() {
        if (isConnected && TABS_INITIALIZED) {
            var active = $("#tabs").tabs("option", "active");
            if (active == 1) {
                doQuery();
                clearInterval(interval);
            }
        }
    }, INITIAL_WAIT_TIME);

    // Query the DB every 30 seconds for updates.
    setInterval(function() {
        var active = $("#tabs").tabs("option", "active");
        if (active == 1 && isConnected && !isInputFocus()) {
            newPanelAlert('Refreshing Commands Data', 'success', 1000);
            doQuery();
        }
    }, 3e4);

    // Export functions - Needed when calling from HTML.
    $.commandsOnMessage = onMessage;
    $.commandsDoQuery = doQuery;
    $.deleteCommand = deleteCommand;
    $.addCustomCommand = addCustomCommand;
    $.editCustomCommand = editCustomCommand;
    $.aliasCommand = aliasCommand;
    $.deleteAlias = deleteAlias;
    $.commandPermission = commandPermission;
    $.setCommandPrice = setCommandPrice;
    $.updateCommandPrice = updateCommandPrice;
    $.addCooldown = addCooldown;
    $.deleteCooldown = deleteCooldown;
    $.toggleGlobalCooldown = toggleGlobalCooldown;
    $.toggleModCooldown = toggleModCooldown;
    $.togglePerUserCooldown = togglePerUserCooldown;
    $.setGlobalCooldownTime = setGlobalCooldownTime;
    $.commandEnable = commandEnable;
    $.deleteCommandPrice = deleteCommandPrice;
    $.editCooldown = editCooldown;
})();
