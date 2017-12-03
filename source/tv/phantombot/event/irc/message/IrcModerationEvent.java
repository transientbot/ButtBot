/*
 * Copyright (C) 2016-2017 phantombot.tv
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
package tv.phantombot.event.irc.message;

import java.util.Map;
import tv.phantombot.twitchwsirc.Channel;
import tv.phantombot.twitchwsirc.Session;

public class IrcModerationEvent extends IrcMessageEvent {

    public IrcModerationEvent(Session session, String sender, String message, Channel channel) {
        super(session, sender, message, null, channel);
    }

    public IrcModerationEvent(Session session, String sender, String message, Channel channel, Map<String, String> tags) {
        super(session, sender, message, tags, channel);
    }
}
