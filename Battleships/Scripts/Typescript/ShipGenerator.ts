module ShipGenerators {
    export class ShipGenerator {
        ships: Array<Ships.Ship>;
        columns: Array<string>;

        constructor() {
            this.columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
            this.generateShips();            
        }
        
        generateShips = () => {
            this.ships = new Array<Ships.Ship>();
            this.addRandomShip("Battleship", 5);
            this.addRandomShip("Destroyer One", 4);
            this.addRandomShip("Destroyer Two", 4);
        }    

        addRandomShip = (name: string, size: number) => {
            var columnToPlaceShip = this.columns[Math.round(Math.random() * 9)];
            while (this.columnInUse(columnToPlaceShip)) {
                columnToPlaceShip = this.columns[Math.round(Math.random() * 9)];  
            }
            var startingVerticalPosition = Math.round(Math.random() * (10 - size));
            var shipCompoents = new Array<ShipComponents.ShipComponent>(); 
            for (var component = size; component > 0; component--) {
                var sc = new ShipComponents.ShipComponent(new Grid.GridCell(columnToPlaceShip, startingVerticalPosition + component));
                shipCompoents.push(sc);
            }
            this.ships.push(new Ships.Ship(name, shipCompoents));
        }

        columnInUse = (column: string) => {
            var shipsUsingColumn = this.ships.filter((s) => { return s.components.filter((c) => { return c.coordinates.horizontal === column }).length > 0 });
            return shipsUsingColumn.length > 0;
        }
    }
}