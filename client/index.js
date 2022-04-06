"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from "alt-client";
import * as game from "natives";
import { HeliCam } from '../shared/helicam.js';
import { HeliSpotlightHandler } from './spotlights.js';

const TOGGLE_KEY = 90; // Z
const VEHICLE_MODEL = 353883353 // polmav
const LIMIT_TO_COPILOT = false;

const cam = new HeliCam();
cam.player = alt.Player.local;

function handleState(cam) {
    const state = cam.currentState;

    switch (state) {
        case HeliCam.STATE_NONE:
            game.setNightvision(false);
            game.setSeethrough(false);
            alt.emitServer('removeHeliSpotlight');
            break;

        case HeliCam.STATE_SPOTLIGHT:
            game.setNightvision(false);
            game.setSeethrough(false);
            alt.emitServer('addHeliSpotlight');
            break;

        case HeliCam.STATE_NIGHTVISION:
            game.setNightvision(true);
            game.setSeethrough(false);
            alt.emitServer('removeHeliSpotlight');
            break;

        case HeliCam.STATE_THERMALVISION:
            game.setNightvision(false);
            game.setSeethrough(true);
            alt.emitServer('removeHeliSpotlight');
            break;
    }
}

function handleKeyDown(key) {
    if (alt.Player.local.isChatOpen) {
        return;
    }

    if (alt.isMenuOpen()) {
        return;
    }

    if (key === TOGGLE_KEY && alt.Player.local.vehicle?.model === VEHICLE_MODEL) {
        if (LIMIT_TO_COPILOT && alt.Player.local.seat !== 2) {
            return;
        }

        cam.switchState();
        handleState(cam);
    }
}

function updateHeliCam() {
    if (cam.currentState === HeliCam.STATE_NONE) {
        return;
    }

    if (cam.player.vehicle?.model !== 353883353) {
        cam.currentState = HeliCam.STATE_NONE;
        handleState(cam);
    }
}

alt.on('keydown', handleKeyDown);
alt.onServer('addHeliSpotlight', HeliSpotlightHandler.addHeliSpotlight);
alt.onServer('removeHeliSpotlight', HeliSpotlightHandler.removeHeliSpotlight);

alt.everyTick(updateHeliCam);
alt.everyTick(HeliSpotlightHandler.renderSpotlights);