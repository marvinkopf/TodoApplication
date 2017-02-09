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
    [Route("api/[controller]/{projectId}")]
    public class TasksController : Controller
    {
        private Data.ApplicationDbContext _context;
        IQueryable<TaskItem> _tasks;

        public TasksController(Data.ApplicationDbContext context)
        {
            _context = context;
            _tasks = from t in _context.Tasks
                        where t.UserId == User.FindFirst(ClaimTypes.NameIdentifier).Value
                        select t;
        }

        public IEnumerable<Todoapp.Models.TaskItem> 
            Default(string projectId)
        {
            var tasks = _tasks
                            .Where(t => t.IsDeleted == false && t.IsCompleted == false)
                            .OrderByDescending(t => t.CreatedTime);
            return TasksByProject(projectId, tasks);
        }

        IEnumerable<TaskItem> TasksByProject(string projectId, IQueryable<TaskItem> tasks)
        {
            if(projectId.ToLower() == "all")
            {
                return tasks;
            }
            else
            {
                int projectIdAsInt;
                if(!Int32.TryParse(projectId, out projectIdAsInt))
                    // Invalid request
                    return null;

                return tasks.Where(t => t.ProjectId == projectIdAsInt);
            }
        }

        [HttpGet("date/{date}")]
        public IEnumerable<Todoapp.Models.TaskItem> 
            FromDate(string projectId, DateTime date)
        {
            var tasks = _tasks
                            .Where(t => t.IsDeleted == false && t.IsCompleted == false &&
                                    t.FinishBy.Date == date.Date)
                            .OrderByDescending(t => t.CreatedTime);
            return TasksByProject(projectId, tasks);
        }
        
        [HttpGet("[action]")]
        public IEnumerable<Todoapp.Models.TaskItem> Deleted(string projectId)
        {
            var tasks = _tasks
                            .Where(t => t.IsDeleted)
                            .OrderByDescending( t => t.DeletedTime);
            
            return TasksByProject(projectId, tasks);
        }

        [HttpGet("[action]")]
        public IEnumerable<Todoapp.Models.TaskItem> Completed(string projectId)
        {
            var tasks = _tasks
                            .Where(t => t.IsCompleted && t.IsDeleted == false)
                            .OrderByDescending( t => t.CompletedTime);
            
            return TasksByProject(projectId, tasks);
        }
    }
}
