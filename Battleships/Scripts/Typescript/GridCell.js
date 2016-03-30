var Grid;
(function (Grid) {
    var GridCell = (function () {
        function GridCell(x, y) {
            this.GridStringValid = function (coordinates) {
                var regEx = new RegExp("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
                var valid = regEx.test(coordinates);
                return valid;
            };
            this.AreGridCellsEqual = function (cellOne, cellTwo) {
                if (cellOne === null || cellOne === undefined || cellTwo === null || cellTwo === undefined) {
                    return false;
                }
                return cellOne.Horizontal === cellTwo.Horizontal && cellOne.Vertical === cellTwo.Vertical;
            };
            this.Horizontal = x;
            this.Vertical = y;
        }
        return GridCell;
    })();
    Grid.GridCell = GridCell;
    function parse(cell) {
        var isValid = this.GridStringValid(cell);
        if (!isValid)
            return null;
        var x = cell.toUpperCase().charAt(0);
        var y = parseInt(cell.substr(1, cell.length - 1));
        return new GridCell(x, y);
    }
    Grid.parse = parse;
    function gridStringValid(coordinates) {
        var regEx = new RegExp("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
        var valid = regEx.test(coordinates);
        return valid;
    }
    Grid.gridStringValid = gridStringValid;
    function areGridCellsEqual(cellOne, cellTwo) {
        if (cellOne === null || cellOne === undefined || cellTwo === null || cellTwo === undefined) {
            return false;
        }
        return cellOne.Horizontal === cellTwo.Horizontal && cellOne.Vertical === cellTwo.Vertical;
    }
    Grid.areGridCellsEqual = areGridCellsEqual;
})(Grid || (Grid = {}));
