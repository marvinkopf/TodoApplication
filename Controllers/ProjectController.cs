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
    [Route("api/tasks")]
    public class ProjectController : Controller
    {
        private Data.ApplicationDbContext _context;
        IQueryable<TaskItem> _tasks;
           
        public ProjectController(Data.ApplicationDbContext context)
        {
            _context = context;
            _tasks = from t in _context.Tasks
                        where t.UserId == User.FindFirst(ClaimTypes.NameIdentifier).Value
                        select t;
        }

        [HttpGet("{id:int}/tasks")]
        [HttpGet("")]
        public IEnumerable<TaskItem> GetTasks(int? id = null, DateTime? date = null, bool deleted = false, bool completed = false)
        {
            var tasks = _tasks
                            .Where(t => t.IsDeleted == deleted && t.IsCompleted == completed);

            if(id != null)
                tasks = tasks.Where(t => t.ProjectId == id);

            if(date != null)
                tasks = tasks.Where(t => t.FinishBy.Date == date.Value.Date);

            return tasks;
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
        public Project PutProject(int id, [FromBody]Todoapp.Models.Project project)
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

        [HttpDelete("{id:int}")]
        public IActionResult DeleteProject(int id)
        {
            var proj = _context.Projects.Include(p => p.ApplicationUser).FirstOrDefault(p => 
                                        p.ProjectId == id);

            if(proj == null || proj.ApplicationUser != (from u in _context.Users.Include(u => u.Projects)
                    where u.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value
                    select u).ToArray()[0])
            {
                return Unauthorized();
            }

            _context.Projects.Remove(proj);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
