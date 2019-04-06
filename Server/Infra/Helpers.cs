namespace Server.Infra
{
    public static class Helpers
    {
        public static string FormatToBase64(this string file)
        {
            return file.Replace('-', '+').Replace('_', '/');
        }
    }
}