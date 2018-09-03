import React, {Component} from "react";
import nba from 'nba';
import {SearchBar} from "./SearchBar";
import {Profile} from "./Profile";
import {DataViewContainer} from "./DataViewContainer";
import {DEFAULT_PLAYER_INTO} from "../constants";


export class Main extends Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INTO,
    }

    componentDidMount() {
           this.loadPlayerInfo(this.state.playerInfo.playerName);
    }

    loadPlayerInfo = (playerName) => {
        const playerId = nba.findPlayer(playerName).playerId;
        nba.stats.playerInfo({ PlayerID: playerId }).then((info) => {
               const playerInfo = Object.assign(
                   {}, info.commonPlayerInfo[0], info.playerHeadlineStats[0]
               );
               console.log(playerInfo);
               this.setState({
                   playerInfo: playerInfo,
               });
        });
    }

    render() {
        return (
            <div className="Main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}