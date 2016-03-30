using System.Text.RegularExpressions;

namespace BattleshipsConsole
{
    public class GridCell
    {
        public char Horizontal { get;}
        public int Vertical { get; }

        public GridCell(char x, int y)
        {
            Horizontal = x;
            Vertical = y;
        }

        public static bool TryParse(string enteredCell, out GridCell gridCell)
        {
            var regex = new Regex("^[A-Ja-j]10$|^[A-Ja-j][0-9]$");
            if (!regex.IsMatch(enteredCell))
            {
                gridCell = new GridCell(' ', 0);
                return false;
            }

            var x = enteredCell.ToUpper().ToCharArray()[0];
            var y = int.Parse(enteredCell.Substring(1,enteredCell.Length-1));
            gridCell = new GridCell(x, y);
            return true;
        }

        public override string ToString()
        {
            return $"{Horizontal}{Vertical}";
        }
    }
}