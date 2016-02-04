/// <reference path="../../typings/tsd.d.ts"/>
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