namespace PostOfiice.DAta.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addpercentcolumn : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.InterestRates", "SavingTypeId", "dbo.SavingTypes");
            DropIndex("dbo.InterestRates", new[] { "SavingTypeId" });
            DropPrimaryKey("dbo.InterestRates");
            AddColumn("dbo.InterestRates", "Percent", c => c.Decimal(nullable: false, precision: 10, scale: 2));
            AlterColumn("dbo.InterestRates", "SavingTypeId", c => c.String(maxLength: 128));
            AddPrimaryKey("dbo.InterestRates", new[] { "PeriodId", "InterestTypeId", "Percent" });
            CreateIndex("dbo.InterestRates", "SavingTypeId");
            AddForeignKey("dbo.InterestRates", "SavingTypeId", "dbo.SavingTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.InterestRates", "SavingTypeId", "dbo.SavingTypes");
            DropIndex("dbo.InterestRates", new[] { "SavingTypeId" });
            DropPrimaryKey("dbo.InterestRates");
            AlterColumn("dbo.InterestRates", "SavingTypeId", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.InterestRates", "Percent");
            AddPrimaryKey("dbo.InterestRates", new[] { "PeriodId", "InterestTypeId", "SavingTypeId" });
            CreateIndex("dbo.InterestRates", "SavingTypeId");
            AddForeignKey("dbo.InterestRates", "SavingTypeId", "dbo.SavingTypes", "Id", cascadeDelete: true);
        }
    }
}
