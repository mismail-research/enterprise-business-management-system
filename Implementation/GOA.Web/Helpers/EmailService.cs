using GOA.Web.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mail;

namespace GOA.Web.Helpers
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            if (ConfigurationManager.AppSettings["EmailServer"] != "{EmailServer}" &&
                ConfigurationManager.AppSettings["EmailUser"] != "{EmailUser}" &&
                ConfigurationManager.AppSettings["EmailPassword"] != "{EmailPassword}")
            {
                System.Net.Mail.MailMessage mailMsg = new System.Net.Mail.MailMessage();

                // To
                mailMsg.To.Add(new MailAddress(message.Destination, ""));

                // From
                mailMsg.From = new MailAddress("donotreply@GOA.com", "GOA administrator");

                // Subject and multipart/alternative Body
                mailMsg.Subject = message.Subject;
                string html = message.Body;
                mailMsg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, null, MediaTypeNames.Text.Html));

                // Init SmtpClient and send
                SmtpClient smtpClient = new SmtpClient(ConfigurationManager.AppSettings["EmailServer"], Convert.ToInt32(587));
                System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["EmailUser"], ConfigurationManager.AppSettings["EmailPassword"]);
                smtpClient.Credentials = credentials;

                return Task.Factory.StartNew(() => smtpClient.SendAsync(mailMsg, "token"));
            }
            else
            {
                return Task.FromResult(0);
            }
        }

        public Task SendMessage(ContactMessage cm)
        {
            System.Net.Mail.MailMessage mailMsg = new System.Net.Mail.MailMessage();

            // To
            mailMsg.To.Add(new MailAddress(ConfigurationManager.AppSettings["AdminEmail"], ""));

            // From
            mailMsg.From = new MailAddress(cm.Email, cm.Name);
            if (string.IsNullOrEmpty(cm.Subject))
            {
               cm.Subject= "New Message";
            }
            
            
            // Subject and multipart/alternative Body
            mailMsg.Subject = cm.Subject;
            mailMsg.Body = cm.Message;


            // Init SmtpClient and send
            SmtpClient smtpClient = new SmtpClient(ConfigurationManager.AppSettings["EmailServer"], Convert.ToInt32(587));
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["EmailUser"], ConfigurationManager.AppSettings["EmailPassword"]);
            smtpClient.Credentials = credentials;
            try
            {
                smtpClient.Send(mailMsg);
                return Task.FromResult(1);
            }
            catch (Exception ex)
            {
                Logger.Error("Error Sending Message");
                Logger.Error(ex);
                return Task.FromResult(0);
            }


        }

    }
}