module Ships {
    export class Ship {
        name: string;
        components: Array<ShipComponents.ShipComponent>;

        constructor(name: string, components: Array<ShipComponents.ShipComponent>) {
            this.name = name;
            this.components = components;
        }
    }
}