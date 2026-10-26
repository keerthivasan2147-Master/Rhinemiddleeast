namespace Rhinemiddleeast.Models
{
    public class InitialGreetingModel
    {
        public bool ShouldGreet { get; set; } = true;
        public string GreetingEn { get; set; } = string.Empty;
        public string GreetingAr { get; set; } = string.Empty;
        public string GreetingText { get; set; } = string.Empty;
        public string GreetingId { get; set; } = string.Empty;
        public string Timestamp { get; set; } = string.Empty;
    }
}
