using System.ComponentModel.DataAnnotations;

namespace Rhinemiddleeast.Models
{
    public class ContactInquiryModel
    {
        [Required(ErrorMessage = "Full Name is required")]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Corporate Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid business email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Organization / Company name is required")]
        [StringLength(150)]
        public string Company { get; set; } = string.Empty;

        public string? Phone { get; set; }

        [Required(ErrorMessage = "Please select your industry")]
        public string Industry { get; set; } = string.Empty;

        public string? WorkforceSize { get; set; }

        [Required(ErrorMessage = "Please provide details regarding your inquiry")]
        [StringLength(2000)]
        public string Message { get; set; } = string.Empty;

        public string? ConsultationType { get; set; } = "Executive Consultation";
    }

    public class WorkforcePlanRequest
    {
        public string Industry { get; set; } = "Banking & Sovereign Wealth";
        public int CurrentHeadcount { get; set; } = 250;
        public string FocusArea { get; set; } = "Operational Efficiency & Compliance";
        public string DeploymentUrgency { get; set; } = "Q1-Q2 2026";
    }

    public class WorkforcePlanResponse
    {
        public string RecommendedSwarmArchitecture { get; set; } = string.Empty;
        public int EstimatedAIAgents { get; set; }
        public string ProjectedProductivityGain { get; set; } = string.Empty;
        public string GovernanceTier { get; set; } = string.Empty;
        public string EstimatedTimeline { get; set; } = string.Empty;
        public List<string> CoreCapabilities { get; set; } = new();
    }
}
