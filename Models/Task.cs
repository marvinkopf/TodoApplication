using System;

namespace Todoapp.Models
{
    public class TaskItem
    {
        public int TaskItemId { get; set; }

        public string UserId { get; set; }

        public string Title { get; set; }

        public bool IsDeleted { get; set; }
        
        public bool IsCompleted { get; set; }

        public int ProjectId { get; set; }

        public DateTimeOffset CreatedTime { get; set; }

        public DateTimeOffset CompletedTime { get; set; }

        public DateTimeOffset DeletedTime { get; set; }

        public string Text { get; set; }
    }
}
