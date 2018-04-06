namespace PostOffice.Common.ViewModels.ExportModel
{
    public class Export_Template_TCBC
    {
        public int? STT { get; set; }
        public string ServiceName { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalColection { get; set; }
        public decimal? TotalPay { get; set; }
        public float? Fee { get; set; }
        public decimal? Sales { get; set; }
        public decimal? Tax { get; set; }
        public decimal? EarnMoney { get; set; }
    }
}