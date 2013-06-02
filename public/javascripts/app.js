      var map;
      function initialize() {
				var commish_info = null;
        $.ajax({
					url: "https://communities.socrata.com/resource/acc-district-commissioners.json",
          success: function(data) {
						commish_info = data;
          },
          jsonp: "$jsonp",
          dataType: "jsonp",
        });

        var mapOptions = {
          zoom: 11,
					center: new google.maps.LatLng(33.92393925658786, -83.34083366016467),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				_.each(hack_districts, function(district) {
					if(_.isEmpty(district.border)) {
						return;
					}
					  var district_coords = _.map(district.border, function(points) {
							return new google.maps.LatLng(points[1],points[0]);
						});
          var district_polygon = new google.maps.Polygon({
            paths: district_coords,
            strokeColor: district.strokeColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: district.fillColor,
            fillOpacity: 0.35
          });
					district_polygon.objInfo = {
						'district' : district.district
					};
					
					google.maps.event.addListener(district_polygon, 'click', function(event) {
						if(_.isEmpty(commish_info)) {
							alert('info is still loading...');
							return;
						}
						var commish = _.filter(commish_info, function(record) {
							return record.district == district_polygon.objInfo.district;
						})[0];
						//render_commish(commish);
					});
					

          district_polygon.setMap(map);
				});
					/*
        $.ajax({
          url: "https://communities.socrata.com/resource/athens-clark-county-georgia-districts.json",
          success: function(data) {

            // TODO: This can all be made into seperate functions
            var districts = _.groupBy(data, "district");

              _.each(districts, function(district) {
                var district_coords = _.map(district, function(vertex) { 
                  return new google.maps.LatLng(vertex['location']["longitude"], vertex['location']["latitude"]);
                });

                // This is where sort the coords with .group_by based on some
                // coord order

                 // Construct the polygon
                 district_polygon = new google.maps.Polygon({
                   paths: district_coords,
                   strokeColor: '#FF0000',
                   strokeOpacity: 0.8,
                   strokeWeight: 2,
                   fillColor: '#FF0000',
                   fillOpacity: 0.35
                 });
                
                district_polygon.setMap(map);

              });
          },
          jsonp: "$jsonp",
          dataType: "jsonp"
        });
				*/
      }

      google.maps.event.addDomListener(window, 'load', initialize);
