/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        rotateSpeed: number;
		rotateX: boolean;
        rotateY: boolean;
        rotateZ: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotateSpeed: number, rotateChoice: boolean) {
			this.rotateSpeed = rotateSpeed;
			this.rotateX = rotateChoice;
            this.rotateY = rotateChoice;
            this.rotateZ = rotateChoice;
		}
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
    }
}
