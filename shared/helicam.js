export class HeliCam {
    static STATE_NONE = 0x0;
    static STATE_SPOTLIGHT = 0x1;
    static STATE_NIGHTVISION = 0x2;
    static STATE_THERMALVISION = 0x3;

    currentState = HeliCam.STATE_NONE;

    player = null;

    switchState() {
        switch (this.currentState) {
            default:
            case HeliCam.STATE_NONE:
                this.currentState = HeliCam.STATE_SPOTLIGHT;
                break;

            case HeliCam.STATE_SPOTLIGHT:
                this.currentState = HeliCam.STATE_NIGHTVISION;
                break;

            case HeliCam.STATE_NIGHTVISION:
                this.currentState = HeliCam.STATE_THERMALVISION;
                break;

            case HeliCam.STATE_THERMALVISION:
                this.currentState = HeliCam.STATE_NONE;
                break;
        }
    }
}