/// <reference path="../../typings/tsd.d.ts"/>
/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025)
Last Modified Date:    Thursday, February 4th, 2016
Program Description:   Control files contain the classes that will allow GUI Controls (as per user/overseer's inputs) to:
                         >> change the rotation speed of  Cube Being.
                         >> rotate the Cube Being in any direction (x,y,z).
                         >> change the colour properties of Cube Being.
Revision History:      https://github.com/villare025/COMP392-Assignment1/commits/master
Last Modification:     Added Program Header Details
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotateSpeed, rotateChoice, changeOutfit, changeSkin, changeHair) {
            this.rotateSpeed = rotateSpeed;
            this.rotateX = rotateChoice;
            this.rotateY = rotateChoice;
            this.rotateZ = rotateChoice;
            this.changeOutfit = changeOutfit;
            this.changeSkin = changeSkin;
            this.changeHair = changeHair;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map