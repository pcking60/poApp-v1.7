namespace PostOfiice.DAta.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class Export_TKBD_Detail_By_Time_User : DbMigration
    {
        public override void Up()
        {
            CreateStoredProcedure(
                "Export_TKBD_Detail_By_Time_User",
                p => new
                {
                    month = p.Int(),
                    year = p.Int(),
                    currentUserId = p.String()
                },
                @"select
                    t.Month,
                    t.Account,
                    convert(decimal(16,2),t.Amount) as Amount,
                    convert(decimal(16,2),t.TotalMoney) as TotalMoney,
                    t.CreatedBy
                from
                    TKBDAmounts t
                    inner join ApplicationUsers u
	                on t.CreatedBy = u.UserName
	                inner join PostOffices p
	                on u.POID = p.ID
	                inner join Districts d
	                on p.DistrictID = d.ID
                where t.Status=1 and u.Id=@currentUserId and t.Month=@month and t.Year=@year
                ");
        }

        public override void Down()
        {
            DropStoredProcedure("Export_TKBD_Detail_By_Time_User");
        }
    }
}