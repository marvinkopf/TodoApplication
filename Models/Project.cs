using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todoapp.Models
{
    public class Project
    {
        [Key, Column(Order=0)]
        public int ProjectId { get; set; }

        [Key, Column(Order=1), ForeignKey("ApplicationUser")]
        public int UserId { get; set; }

        public string Title { get; set; }
    }
}
