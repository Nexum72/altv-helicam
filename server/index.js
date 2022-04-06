"use strict";
/// <reference path="typings/altv-server.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from "alt-server";

alt.onClient('addHeliSpotlight', player => {
    alt.emitClient(null, 'addHeliSpotlight', {player: player});
});

alt.onClient('removeHeliSpotlight', player => {
    alt.emitClient(null, 'removeHeliSpotlight', {player: player});
});