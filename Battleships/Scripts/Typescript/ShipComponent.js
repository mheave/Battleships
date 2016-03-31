var ShipComponents;
(function (ShipComponents) {
    var ShipComponent = (function () {
        function ShipComponent(coordinates) {
            this.coordinates = coordinates;
            this.hasBeenHit = false;
        }
        return ShipComponent;
    })();
    ShipComponents.ShipComponent = ShipComponent;
})(ShipComponents || (ShipComponents = {}));
