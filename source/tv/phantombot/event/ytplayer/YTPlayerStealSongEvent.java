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
package tv.phantombot.event.ytplayer;

import tv.phantombot.twitchwsirc.Channel;

public class YTPlayerStealSongEvent extends YTPlayerEvent {

    private final String youTubeID;
    private final String requester;

    public YTPlayerStealSongEvent() {
        this.youTubeID = "";
        this.requester = "";
    }

    public YTPlayerStealSongEvent(Channel channel) {
        super(channel);
        this.youTubeID = "";
        this.requester = "";
    }

    public YTPlayerStealSongEvent(String youTubeID, String requester) {
        this.youTubeID = youTubeID;
        this.requester = requester;
    }

    public YTPlayerStealSongEvent(String youTubeID, String requester, Channel channel) {
        super(channel);
        this.youTubeID = youTubeID;
        this.requester = requester;
    }

    public String getYouTubeID() {
        return youTubeID;
    }

    public String getRequester() {
        return requester;
    }
}
