using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todoapp.Models
{
    public class Project
    {
        public int ProjectId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public string Title { get; set; }
    }
}
