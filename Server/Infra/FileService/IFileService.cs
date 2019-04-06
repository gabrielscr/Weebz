namespace Server.Infra.FileService
{
    using System.IO;
    using System.Threading.Tasks;

    public interface IFileService
    {
        Task<string> Save(string file, string fileName);

        Task<Stream> Download(string file);

        Task Remove(string file);
    }
}