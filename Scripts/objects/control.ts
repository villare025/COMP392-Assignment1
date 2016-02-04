/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotateSpeed: number;
		public rotateX: boolean;
        public rotateY: boolean;
        public rotateZ: boolean;
        
        public changeOutfit : string;
        public changeSkin : string;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotateSpeed: number, rotateChoice: boolean, changeOutfit : string, changeSkin: string) {
			this.rotateSpeed = rotateSpeed;
			this.rotateX = rotateChoice;
            this.rotateY = rotateChoice;
            this.rotateZ = rotateChoice;
            this.changeOutfit = changeOutfit;
            this.changeSkin = changeSkin;
		}
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
    }
}
