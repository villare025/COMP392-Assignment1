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
        public changeHair : string;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotateSpeed: number, rotateChoice: boolean, changeOutfit : string, changeSkin: string, changeHair: string) {
			this.rotateSpeed = rotateSpeed;
			this.rotateX = rotateChoice;
            this.rotateY = rotateChoice;
            this.rotateZ = rotateChoice;
            this.changeOutfit = changeOutfit;
            this.changeSkin = changeSkin;
            this.changeHair = changeHair;
		}
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
    }
}
