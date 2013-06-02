      var map;
      var districts = [];
      function initialize() {
				var commish_info = null;
				var commish_template = $("#commish-template").html();
        $.ajax({
					url: "https://communities.socrata.com/resource/acc-district-commissioners.json",
          success: function(data) {
						commish_info = data;
          },
          jsonp: "$jsonp",
          dataType: "jsonp",
        });

        var mapOptions = {
          zoom: 12,
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
          districts.push(district_polygon);
					
					google.maps.event.addListener(district_polygon, 'click', function(event) {
						if(_.isEmpty(commish_info)) {
							alert('info is still loading...');
							return;
						}
						var commish = _.filter(commish_info, function(record) {
							return record.district == district_polygon.objInfo.district;
						})[0];

						commish = _.defaults(commish, {
							education : false,
							civic_and_community_service : false,
							civic_and_community_service : false,
							government_experience : false,
							
						});
						commish.address = JSON.parse(commish.location_1.human_address).address;
						console.log(commish);
						$("#district-info").html(_.template(commish_template, commish));

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

        $('#geolocate').on('click', function() {
          geolocate();
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);


      function geolocate() {
        var address = $('#address').val();

        if (address == '')
          return;

        var url =  "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + encodeURIComponent(address);

        $.ajax({
					url: url,
          success: function(data) {
            if (data['status'] == "OK") {
              var lat = data['results'][0]['geometry']['location']['lat'];
              var lng = data['results'][0]['geometry']['location']['lng'];

              var your_district = _.find(districts, function(polygon) {
                return polygon.containsLatLng(lat,lng);
              });

              if (_.isUndefined(your_district)) {
                $('#district_results').text("It looks like you don't live in Athens Clarke County (or you found a gap in our data).");
                alert("do you live in ACC?")
              } else {
                var myLatlng = new google.maps.LatLng(lat,lng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: address
                })
                $('#district_results').text("You live in district: " + your_district.objInfo.district + ".");
                google.maps.event.trigger(your_district, 'click');
              }
            }
          }
        });
      }
