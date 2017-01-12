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
    public class TaskController : Controller
    {
        private Data.ApplicationDbContext _context;

        public TaskController(Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id:int}")]
        public TaskItem GetTask(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => 
                                        t.TaskItemId == id);

            if(task == null || task.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                task = new TaskItem();
                task.Title = "NOT EXISTENT OR NO AUTHORIZATION";
            }

            return task;
        }

        [HttpPut("{id:int}")]
        public TaskItem PutTask(int id, [FromBody]Todoapp.Models.TaskItem task)
        {
             _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
            return task;
        }

        [HttpPost]
        public TaskItem PostTask([FromBody]Todoapp.Models.TaskItem task)
        {
            task.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            task.CreatedTime = DateTimeOffset.Now;
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return task;
        }

        [HttpGet("{id:int}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => 
                                        t.TaskItemId == id);

            if(task == null || task.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return Unauthorized();
            }

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
