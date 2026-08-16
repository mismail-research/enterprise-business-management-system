define(['services/logger'], function (logger) {
    var title = 'Dashboard 02';
    var vm = {
        activate: activate,
        compositionComplete: compositionComplete,
        title: title
    };

    return vm;

    //#region Internal Methods
    function activate() {
        $("#product-dashboard").removeClass('active');
        $("#dashboard-class").addClass('active');
        $(".content").css('min-height', screen.height - 280);

        return true;
    };
    function compositionComplete() {

        $(".content").css('min-height', screen.height - 280);
        'use strict';
        $(function () {

            /* ChartJS
             * -------
             * Here we will create a few charts using ChartJS
             */
            //-------------
            //- PIE CHART -
            //-------------
            // Get context with jQuery - using jQuery's .get() method.
            var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
            var pieChart = new Chart(pieChartCanvas);
            var PieData = [
              {
                  value: 700,
                  color: "#f56954",
                  highlight: "#f56954",

              },
              {
                  value: 500,
                  color: "#00a65a",
                  highlight: "#00a65a",

              },
              {
                  value: 400,
                  color: "#f39c12",
                  highlight: "#f39c12",

              },
              {
                  value: 600,
                  color: "#00c0ef",
                  highlight: "#00c0ef",

              },
              {
                  value: 300,
                  color: "#3c8dbc",
                  highlight: "#3c8dbc",

              },
              {
                  value: 100,
                  color: "#d2d6de",
                  highlight: "#d2d6de",

              }
            ];
            var pieOptions = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 1,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 50, // This is 0 for Pie charts
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false,
                //Boolean - whether to make the chart responsive to window resizing
                responsive: true,
                // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                maintainAspectRatio: false,
                //String - A legend template
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
                //String - A tooltip template
                tooltipTemplate: "<%=value %> <%=label%> users"
            };
            //Create pie or douhnut chart
            // You can switch between pie and douhnut using the method below.  
            pieChart.Doughnut(PieData, pieOptions);
            //-----------------
            //- END PIE CHART -
            //-----------------

            /* jVector Maps
             * ------------
             * Create a world map with markers
             */
            $('#world-map-markers').vectorMap({
                map: 'world_mill_en',
                normalizeFunction: 'polynomial',
                hoverOpacity: 0.7,
                hoverColor: false,
                backgroundColor: 'transparent',
                regionStyle: {
                    initial: {
                        fill: 'rgba(210, 214, 222, 1)',
                        "fill-opacity": 1,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 1
                    },
                    hover: {
                        "fill-opacity": 0.7,
                        cursor: 'pointer'
                    },
                    selected: {
                        fill: 'yellow'
                    },
                    selectedHover: {
                    }
                },
                markerStyle: {
                    initial: {
                        fill: '#00a65a',
                        stroke: '#111'
                    }
                },
                markers: [
                  { latLng: [41.90, 12.45], name: 'Vatican City' },
                  { latLng: [43.73, 7.41], name: 'Monaco' },
                  { latLng: [-0.52, 166.93], name: 'Nauru' },
                  { latLng: [-8.51, 179.21], name: 'Tuvalu' },
                  { latLng: [43.93, 12.46], name: 'San Marino' },
                  { latLng: [47.14, 9.52], name: 'Liechtenstein' },
                 

                ]
            });
            /* SPARKLINE CHARTS
                        * ----------------
                        * Create a inline charts with spark line
                        */

            //-----------------
            //- SPARKLINE BAR -
            //-----------------
            $('.sparkbar').each(function () {
                var $this = $(this);
                $this.sparkline('html', {
                    type: 'bar',
                    height: $this.data('height') ? $this.data('height') : '30',
                    barColor: $this.data('color')
                });
            });

            //-----------------
            //- SPARKLINE PIE -
            //-----------------
            $('.sparkpie').each(function () {
                var $this = $(this);
                $this.sparkline('html', {
                    type: 'pie',
                    height: $this.data('height') ? $this.data('height') : '90',
                    sliceColors: $this.data('color')
                });
            });

            //------------------
            //- SPARKLINE LINE -
            //------------------
            $('.sparkline').each(function () {
                var $this = $(this);
                $this.sparkline('html', {
                    type: 'line',
                    height: $this.data('height') ? $this.data('height') : '90',
                    width: '100%',
                    lineColor: $this.data('linecolor'),
                    fillColor: $this.data('fillcolor'),
                    spotColor: $this.data('spotcolor')
                });
            });
        });
        
    };

    //#endregion
});