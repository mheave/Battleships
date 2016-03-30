module Ship {
    export class Ship {
        Name: string;
        Components: Array<ShipComponents.ShipComponent>;

        constructor(name: string, components: Array<ShipComponents.ShipComponent>) {
            this.Name = name;
            this.Components = components;
        }
    } 
    
    export class ShipGenerator {
        public Ships: Array<Ship>;

        constructor() {
            this.Ships = new Array<Ship>();
            this.GenerateShips();
        }
        
        GenerateShips = () => {
            var battleshipComponents = new Array<ShipComponents.ShipComponent>();
            battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 1)));
            battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 2)));
            battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 3)));
            battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 4)));
            battleshipComponents.push(new ShipComponents.ShipComponent(new Grid.GridCell('A', 5)));
            this.Ships.push(new Ship("Battleship", battleshipComponents));
        }    

    }   
}