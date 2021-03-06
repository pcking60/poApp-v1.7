﻿namespace PostOfiice.DAta.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Export_service_group_time_user : DbMigration
    {
        public override void Up()
        {
            CreateStoredProcedure(
                "Export_By_Service_Group_And_Time_User",
                p => new
                {
                    fromDate = p.String(),
                    toDate = p.String(),
                    mainGroup = p.Int(),
                    userId = p.String()
                },
                @"select st.Name as ServiceName, sum(sL.Money) as [Quantity], sum(st.Money) as [Money], convert(decimal(16,2), (st.Money/sl.VAT)) as Vat from 
	            (select s.Name, sum(td.Money) as Money, ps.Name as PName, s.VAT
	            from ServiceGroups sg
	            inner join Services s
	            on sg.ID = s.GroupID
	            inner join Transactions ts
	            on s.ID = ts.ServiceId
	            inner join TransactionDetails td
	            on ts.ID = td.TransactionId
	            inner join PropertyServices ps
	            on td.PropertyServiceId = ps.ID
                inner join ApplicationUsers u
	            on ts.UserId = u.Id	            
	            where ps.Name like N'Sản lượng%' and ts.Status=1 and sg.MainServiceGroupId=@mainGroup and CAST( ts.TransactionDate as date) between CAST(@fromDate as date) and CAST(@toDate as date) and u.Id=@userId
	            group by s.Name, ps.name, s.VAT
	            ) sl
	            join (select s.Name, sum(td.Money) as Money
	            from ServiceGroups sg
	            inner join Services s
	            on sg.ID = s.GroupID
	            inner join Transactions ts
	            on s.ID = ts.ServiceId
	            inner join TransactionDetails td
	            on ts.ID = td.TransactionId
	            inner join PropertyServices ps
	            on td.PropertyServiceId = ps.ID
	            where ps.Name like N'Số tiền%' or ps.Name like N'Phí%' and ts.Status=1
	            group by s.Name
	            ) st
	            on st.Name = sl.Name
	            group by st.Name, sl.Money, st.Money, sl.VAT");
        }
        
        public override void Down()
        {
            DropStoredProcedure("Export_By_Service_Group_And_Time_User");
        }
    }
}
