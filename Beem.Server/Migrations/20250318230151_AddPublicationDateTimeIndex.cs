using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Beem.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddPublicationDateTimeIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImgHeader",
                table: "News",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Img",
                table: "News",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "News",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_News_PublicationDateTime",
                table: "News",
                column: "PublicationDateTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_News_PublicationDateTime",
                table: "News");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "News");

            migrationBuilder.AlterColumn<string>(
                name: "ImgHeader",
                table: "News",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Img",
                table: "News",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
