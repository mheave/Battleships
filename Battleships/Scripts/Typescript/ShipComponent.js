var ShipComponents;
(function (ShipComponents) {
    var ShipComponent = (function () {
        function ShipComponent(coordinates) {
            this.Coordinates = coordinates;
            this.HasBeenHit = false;
        }
        return ShipComponent;
    })();
    ShipComponents.ShipComponent = ShipComponent;
})(ShipComponents || (ShipComponents = {}));
