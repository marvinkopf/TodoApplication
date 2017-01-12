using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Todoapp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Todoapp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private Data.ApplicationDbContext _context;

        public UserController(Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public ApplicationUser UserInfo()
        {
            return (from u in _context.Users
                    where u.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value
                    select u).ToArray()[0];
        }
    }
}
