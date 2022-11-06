using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Beem.Server.Migrations
{
    public partial class ArtistBannerImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgHeader",
                table: "Artists",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgHeader",
                table: "Artists");
        }
    }
}
