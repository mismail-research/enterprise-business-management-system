// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IoC.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using System.Web;
using System.Threading;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;

using StructureMap;

using GOA.Data;
using GOA.Data.UnitOfWork;
using GOA.Domain.Model;
using GOA.Domain.UnitOfWork;
using GOA.Web.SEO;
using GOA.Web.Helpers;
using System.Security.Principal;
using GOA.Domain.Validators;

namespace GOA.Web.DependencyResolution {
    public static class IoC {
        public static IContainer Initialize() {
            ObjectFactory.Initialize(x =>
                        {
                            x.Scan(scan =>
                                    {
                                        scan.TheCallingAssembly();
                                        scan.WithDefaultConventions();
                                    });                            

                            x.For<IUnitOfWork>().HttpContextScoped().Use(
                                () => new UnitOfWork(new BreezeValidator
                                                        (new ApplicationUserManager
                                                            (new UserStore<UserProfile>
                                                                (new GOADbContext()))))
                            );

                            x.For<ISnapshot>().HttpContextScoped().Use<Snapshot>();

                            x.For<ISitemapGenerator>().HttpContextScoped().Use<SitemapGenerator>();

                            x.For<ISitemapItem>().HttpContextScoped().Use<SitemapItem>();

                            x.For<ISecureDataFormat<AuthenticationTicket>>().HttpContextScoped().Use(() => Startup.OAuthOptions.AccessTokenFormat);
                            
                        });

            return ObjectFactory.Container;
        }
    }
}