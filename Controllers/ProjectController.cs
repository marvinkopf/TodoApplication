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
    public class ProjectController : Controller
    {
        private Data.ApplicationDbContext _context;

        public ProjectController(Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id:int}")]
        public Project GetProject(int id)
        {
            var project = _context.Projects.FirstOrDefault(t => 
                                        t.ProjectId == id);

            if(project == null /*|| project.ApplicationUser.Id != User.FindFirst(ClaimTypes.NameIdentifier).Value */)
            {
                project = new Project();
                project.Title = "NOT EXISTENT OR NO AUTHORIZATION";
            }

            return project;
        }

        [HttpPut("{id:int}")]
        public Project PutTProject(int id, [FromBody]Todoapp.Models.Project project)
        {
             _context.Entry(project).State = EntityState.Modified;
            _context.SaveChanges();
            return project;
        }

        [HttpPost]
        public Project PostProject([FromBody]Todoapp.Models.Project project)
        {
            project.ApplicationUser = (from u in _context.Users.Include(u => u.Projects)
                    where u.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value
                    select u).ToArray()[0];
            _context.Projects.Add(project);
            _context.SaveChanges();
            return project;
        }
    }
}
