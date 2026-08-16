using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(GOA.Web.Startup))]
namespace GOA.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
