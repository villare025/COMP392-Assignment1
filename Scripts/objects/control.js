/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotateSpeed, rotateChoice, changeOutfit, changeSkin) {
            this.rotateSpeed = rotateSpeed;
            this.rotateX = rotateChoice;
            this.rotateY = rotateChoice;
            this.rotateZ = rotateChoice;
            this.changeOutfit = changeOutfit;
            this.changeSkin = changeSkin;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map