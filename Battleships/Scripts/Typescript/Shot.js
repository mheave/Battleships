var Shots;
(function (Shots) {
    var Shot = (function () {
        function Shot(cell, hit) {
            this.coordinatesOfShot = cell;
            this.didHit = hit;
        }
        return Shot;
    })();
    Shots.Shot = Shot;
})(Shots || (Shots = {}));
