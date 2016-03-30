using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleshipsConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Battleships - by Mark Heaver");
            Console.WriteLine("----------------------------");
            var battleships = new Battleships();
            var gameOver = false;
            while (!gameOver)
            {
                Console.WriteLine("Fire at location:");
                var enteredShot = Console.ReadLine();
                var shotResult = battleships.TakeShot(enteredShot);
                Console.WriteLine(shotResult);

                if (!battleships.AllShipsDestroyed) continue;
                Console.WriteLine("**********************************************************************************");
                Console.WriteLine("******** Well done! You have sunken all of the ships in {0} shots. *************", battleships.NoOfShotsTaken);
                Console.WriteLine("Thanks for playing Battleships!");
                gameOver = true;
            }
            Console.WriteLine("");
            Console.WriteLine("Press any key to quit.");
            Console.ReadLine();
        }
    }
}
