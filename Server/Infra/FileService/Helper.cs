using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infra.FileService
{
    public class Helper
    {
        public static string GenerateFileName(string fileName)
        {
            var pathFolder = Path.Combine(Path.GetDirectoryName(fileName), DateTime.Now.ToString("yyyy-MM-dd"));

            var dateTime = DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss");

            var file = dateTime + " - " + Path.GetFileName(Path.GetFileName(fileName));

            var pathToFile = Path.Combine(pathFolder, file);

            return pathToFile;
        }
    }
}
