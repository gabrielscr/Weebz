using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Server.Infra.FileService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Features.Image
{
    public class ImagemController : Controller
    {

        readonly IFileService _fileService;
        readonly IMediator _mediator;

        public ImagemController(IFileService fileService, IMediator mediator)
        {
            _fileService = fileService;
            _mediator = mediator;
        }


        [HttpGet]
        [AllowAnonymous]
        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 31536000)]
        public async Task<IActionResult> Download(string file)
        {
            try
            {
                var stream = await _fileService.Download(file);

                var name = file?.Split('/', '\\')?.Last();

                new FileExtensionContentTypeProvider().TryGetContentType(file, out var mimeType);

                if (string.IsNullOrWhiteSpace(mimeType))
                    mimeType = "application/octet-stream";

                return File(stream, mimeType, name);
            }
            catch (FileNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
