using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Features.Marca
{
    public class MarcaController : Controller
    {

        readonly IMediator _mediator;

        public MarcaController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ResponseCache(NoStore = true)]
        public async Task<ActionResult<Listar.Dto>> Listar(Listar.Query request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpPost]
        public async Task<ActionResult<int>> Inserir([FromBody]InserirEditar.Command request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpGet]
        [ResponseCache(NoStore = true)]
        public async Task<ActionResult<InserirEditar.Command>> Editar(InserirEditar.Query request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpPut]
        public async Task<ActionResult<int>> Editar([FromBody]InserirEditar.Command request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpDelete]
        public async Task Excluir([FromBody]Excluir.Command request)
        {
            await _mediator.Send(request);
        }

        [HttpGet]
        [ResponseCache(NoStore = true)]
        public async Task<ActionResult<int>> GetNextId()
        {
            return Json(await _mediator.Send(new GetNextId.Query()));
        }
    }
}

