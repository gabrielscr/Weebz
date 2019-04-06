namespace Server.Infra.FileService
{
    using Microsoft.Extensions.Configuration;
    using Server.Infra;
    using System;
    using System.IO;
    using System.Threading.Tasks;

    public class LocalFileService : IFileService
    {
        private readonly IConfiguration _configuration;

        public LocalFileService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<Stream> Download(string filePath)
        {
            var folderPath = _configuration["PastaAnexos:Root"];

            var fullFilePath = Path.Combine(folderPath, filePath);

            var exists = File.Exists(fullFilePath);

            if (!exists)
                throw new FileNotFoundException();

            return Task.FromResult<Stream>(File.OpenRead(fullFilePath));
        }

        public async Task<string> Save(string file, string fileName)
        {
            var folderPath = _configuration["PastaAnexos:Root"];

            var base64 = Helpers.FormatToBase64(file);

            var bytes = Convert.FromBase64String(base64);

            var fullFileName = Helper.GenerateFileName(fileName);

            var physicalPath = Path.Combine(folderPath, fullFileName);

            var fullFolder = Path.GetDirectoryName(physicalPath);

            if (!Directory.Exists(fullFolder))
                Directory.CreateDirectory(fullFolder);

            await Save(bytes, physicalPath);

            return fullFileName;
        }

        private async Task Save(byte[] bytes, string fullFilePath)
        {
            using (var image = new FileStream(fullFilePath, FileMode.Create))
            {
                await image.WriteAsync(bytes, 0, bytes.Length);
                await image.FlushAsync();
            }
        }

        public Task Remove(string filePath)
        {
            var folderPath = _configuration["PastaAnexos:Root"];

            var pathFile = Path.Combine(folderPath, filePath);

            if (File.Exists(pathFile))
                File.Delete(pathFile);

            return Task.CompletedTask;
        }
    }
}