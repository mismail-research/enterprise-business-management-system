using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace TheDrLinks.Web.Controllers
{
    public class FileUploadController : ApiController
    {
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage UploadFile()
        {
            var fileSavePath = "";
            var fileName = Guid.NewGuid().ToString() + ".png";
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {

                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
               


                if (httpPostedFile != null)
                {
                    // Validate the uploaded image(optional)

                    // Get the complete file path
                    fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedImage"), fileName);

                    // Save the uploaded file to "UploadedFiles" folder
                    httpPostedFile.SaveAs(fileSavePath);

                }

            }
            else if (HttpContext.Current.Request.Params.AllKeys.Any())
            {
                fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedImage"), fileName);
                var imageData = HttpContext.Current.Request.Params["ImageData"];
                string converted = imageData.Replace("data:image/png;base64,", "");
                Image img = Base64ToImage(converted);
                img.Save(fileSavePath);

            }
            var resp = new HttpResponseMessage(HttpStatusCode.OK);
            resp.Content = new StringContent(fileName, Encoding.UTF8, "text/plain");
            return resp;
        }

        public Image Base64ToImage(string base64String)
        {
            // Convert Base64 String to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                Image image = Image.FromStream(ms, true);
                return image;
            }
        }
    }

}
