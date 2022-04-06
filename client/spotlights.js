"use strict";
/// <reference path="typings/natives.d.ts"/>
import * as game from "natives";

export class HeliSpotlightHandler {
    static SPOTLIGHTS = {};

    static renderSpotlights() {
        for (let spotlight of Object.values(HeliSpotlightHandler.SPOTLIGHTS)) {
            const origin = spotlight?.player?.vehicle?.pos;

            if (!origin) {
                return;
            }

            game.drawSpotLightWithShadow(
                origin.x,
                origin.y,
                origin.z,
                0,
                0,
                -1,
                255,
                255,
                255,
                175,
                5,
                10,
                8,
                20,
                0
            );
        }
    }

    static addHeliSpotlight(data) {
        const playerId = data?.player?.id;

        if (playerId == null) {
            return;
        }

        HeliSpotlightHandler.SPOTLIGHTS[playerId] = data;
    }

    static removeHeliSpotlight(data) {
        const playerId = data?.player?.id;

        if (playerId == null) {
            return;
        }

        if (HeliSpotlightHandler.SPOTLIGHTS.hasOwnProperty(playerId)) {
            delete HeliSpotlightHandler.SPOTLIGHTS[playerId];
        }
    }
}