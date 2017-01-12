using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Todoapp.Controllers
{
    [Authorize]
    [Route("app")]
    public class AppController : Controller
    {
        [HttpGet]
        public IActionResult App() => View();
    }
}
