module Battleships {

    export class BattleshipsGame {
        Ships: Array<Ship.Ship>;
        Shots: Array<Shot.Shot>;    

        constructor() {
            var shipGenerator = new Ship.ShipGenerator();
            this.Ships = shipGenerator.Ships;
            this.Shots = new Array<Shot.Shot>();
        }

        TakeShot = (shotCoordinates: string) => {
            if (!Grid.gridStringValid(shotCoordinates)) {
                return "invalid coordinates";
            }

            var gridCell = Grid.parse(shotCoordinates);
            if (gridCell === null) {
                return "cant generate cell";
            }


        }

    }

}