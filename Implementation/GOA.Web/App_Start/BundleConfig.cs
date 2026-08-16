using System;
using System.Web.Optimization;

namespace GOA.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            // js Vendor
            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/knockout-{version}.js")
                .Include("~/Scripts/knockout.validation.js")
                .Include("~/Scripts/bootstrap.js")
                .Include("~/Scripts/jquery.hammer.min.js")
                .Include("~/Scripts/Stashy.js")
                .Include("~/Scripts/Q.js")
                .Include("~/Scripts/breeze.min.js")
                .Include("~/Scripts/moment.js")
                .Include("~/Scripts/jquery.tagsinput.js")
                .Include("~/Scripts/marked.js")
                .Include("~/Scripts/zen-form.js")
                .Include("~/Scripts/formSelect.js")
                .Include("~/Scripts/highlight.pack.js")
                .Include("~/Scripts/jquery.tagsinput.js")
                .Include("~/Scripts/bootstrap-datepicker.js")
                .Include("~/scripts/bootstrap-datetimepicker.min.js")
                .Include("~/Scripts/jquery-date-min.js")
                .Include("~/scripts/bootstrap-datetimepicker.fr.js")
                .Include("~/Scripts/Plugin/ImageUpload/picedit.min.js")
                .Include("~/Scripts/jquery.collapse.js")
                .Include("~/Scripts/jspdf.js")
                .Include("~/Scripts/FileSaver.js")
                .Include("~/Scripts/raphael-min.js")
                .Include("~/plugins/flot/excanvas.js")
                .Include("~/plugins/slimScroll/jquery.slimscroll.min.js")
                .Include("~/plugins/sparkline/jquery.sparkline.min.js")
                .Include("~/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js")
                .Include("~/plugins/jvectormap/jquery-jvectormap-world-mill-en.js")
                .Include("~/plugins/chartjs/Chart.min.js")
                .Include("~/plugins/flot/jquery.flot.min.js")
                .Include("~/plugins/flot/jquery.flot.resize.min.js")
                .Include("~/plugins/flot/jquery.flot.pie.min.js")
                .Include("~/plugins/flot/jquery.flot.categories.min.js")
                .Include("~/plugins/morris/morris.min.js")
                .Include("~/plugins/fastclick/fastclick.min.js")
                .Include("~/plugins/knob/jquery.knob.js")
                .Include("~/plugins/ionslider/ion.rangeSlider.min.js")
                .Include("~/plugins/bootstrap-slider/bootstrap-slider.js")
                .Include("~/plugins/input-mask/jquery.inputmask.js")
                .Include("~/plugins/input-mask/jquery.inputmask.date.extensions.js")
                .Include("~/plugins/input-mask/jquery.inputmask.extensions.js")
                .Include("~/plugins/daterangepicker/daterangepicker.js")
                .Include("~/plugins/colorpicker/bootstrap-colorpicker.min.js")
                .Include("~/plugins/timepicker/bootstrap-timepicker.min.js")
                .Include("~/plugins/bootstrap-wysihtml5/ckeditor.js")
                .Include("~/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js")
                .Include("~/plugins/datatables/jquery.dataTables.min.js")
                .Include("~/plugins/datatables/dataTables.bootstrap.min.js")
                .Include("~/plugins/iCheck/icheck.min.js")
                .Include("~/dist/js/demo.js")
                
                
                

              );

            // css vendor
            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css")
                .Include("~/bootstrap/css/bootstrap.min.css")
                .Include("~/fonts/font-awesome.min.css")
                .Include("~/bootstrap/css/ionicons.min.css")
                .Include("~/plugins/ionslider/ion.rangeSlider.css")
                .Include("~/plugins/ionslider/ion.rangeSlider.skinNice.css")
                .Include("~/plugins/bootstrap-slider/slider.css")
                .Include("~/dist/css/AdminLTE.min.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/Stashy.css")
                .Include("~/Content/jquery.tagsinput.css")
                .Include("~/Content/zen-form.css")
                .Include("~/Content/vs.css")
                .Include("~/Content/datepicker.css")
                .Include("~/plugins/colorpicker/bootstrap-colorpicker.min.css")
                .Include("~/plugins/timepicker/bootstrap-timepicker.min.css")
                .Include("~/Content/bootstrap-datetimepicker.min.css")
                .Include("~/Scripts/Plugin/ImageUpload/Image-Upload-Styles.min.css")
                .Include("~/dist/css/skins/_all-skins.min.css")
                .Include("~/plugins/iCheck/flat/blue.css")
                .Include("~/plugins/morris/morris.css")
                .Include("~/plugins/jvectormap/jquery-jvectormap-1.2.2.css")
                .Include("~/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css")
                .Include("~/plugins/datatables/dataTables.bootstrap.css")
                .Include("~/plugins/iCheck/square/blue.css")
                .Include("~/Content/formSelect.css")
                 .Include("~/Content/myStyle.css")
                
               
                );

            // css custom
            bundles.Add(
              new StyleBundle("~/Content/custom")
                .Include("~/Content/app.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
        }
    }
}