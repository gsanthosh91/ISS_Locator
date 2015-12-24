var app = angular.module('cpApp', []);
        
        app.controller('issMapsController', function($scope, $location, $window, $http) {
            //var weather=this;
            var issFlightPath = [];
            $scope.moveISS=function(){
                $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
                    var lat = data['iss_position']['latitude'];
	 				          var lon = data['iss_position']['longitude'];
                    myLatLng = new google.maps.LatLng(lat, lon);
                    map.panTo(myLatLng, animate = true);
                    issFlightPath.push({'lat':lat, 'lng':lon});
                    var flightPath = new google.maps.Polyline({
                        path: issFlightPath,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 3
                    });

                    flightPath.setMap(map);
                    
                    setTimeout($scope.moveISS, 2000);
                });
            };
            
             var map;
             function initializeMap() {
                    var mapOptions = {
                            zoom: 6,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    $scope.moveISS();
             }
             google.maps.event.addDomListener(window, 'load', initializeMap);
            
        });
