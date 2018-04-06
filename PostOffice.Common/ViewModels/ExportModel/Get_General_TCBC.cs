﻿namespace PostOffice.Common.ViewModels.ExportModel
{
    public class Get_General_TCBC
    {
        public string ServiceName { get; set; }
        public int? Quantity { get; set; }
        public float? VAT { get; set; }
        public decimal? Fee { get; set; }
        public decimal? TotalColection { get; set; }
        public decimal? TotalPay { get; set; }
        public decimal? Sales { get; set; }
        public decimal? EarnMoney { get; set; }
    }
}