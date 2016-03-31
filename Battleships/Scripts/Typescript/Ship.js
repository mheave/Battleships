var Ships;
(function (Ships) {
    var Ship = (function () {
        function Ship(name, components) {
            this.name = name;
            this.components = components;
        }
        return Ship;
    })();
    Ships.Ship = Ship;
})(Ships || (Ships = {}));
