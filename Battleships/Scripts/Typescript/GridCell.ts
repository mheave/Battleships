module Grid {

    export class GridCell {
        Horizontal: string;
        Vertical: number;

        constructor(x: string, y: number) {
            this.Horizontal = x;
            this.Vertical = y;
        }

        Try

        GridStringValid = (coordinates: string) => {
            var regEx = new RegExp("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
            var valid = regEx.test(coordinates);
            return valid;
        }

        AreGridCellsEqual = (cellOne: GridCell, cellTwo: GridCell) => {
            if (cellOne === null || cellOne === undefined || cellTwo === null || cellTwo ===  undefined) {
                return false;
            }

            return cellOne.Horizontal === cellTwo.Horizontal && cellOne.Vertical === cellTwo.Vertical;
        }

    }

    export function parse(cell: string) {
        var isValid = this.GridStringValid(cell);
        if (!isValid)
            return null;

        var x = cell.toUpperCase().charAt(0);
        var y = parseInt(cell.substr(1, cell.length - 1));
        return new GridCell(x, y);
    }
    
    export function gridStringValid(coordinates: string) {
        var regEx = new RegExp("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
        var valid = regEx.test(coordinates);
        return valid;
    }

    export function areGridCellsEqual(cellOne: GridCell, cellTwo: GridCell){
        if (cellOne === null || cellOne === undefined || cellTwo === null || cellTwo === undefined) {
            return false;
        }

        return cellOne.Horizontal === cellTwo.Horizontal && cellOne.Vertical === cellTwo.Vertical;
    }     

}