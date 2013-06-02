Web frontend to demonstrate Open APIs built during the Hack for Athens Project,
http://hackforathens.org.

Live Demo available at

http://hfa-data-portal.herokuapp.com/

### APIs

 - Athens-Clarke County District Boundaries: https://communities.socrata.com/developers/docs/athens-clark-county-districts
 - Athens-Clarke County District Commisioners: https://communities.socrata.com/developers/docs/acc-district-commissioners
 
### TODO

 - The current lat/lng pairs were extracted from a hand drawn KML file (using
   Google Earth). Ideally, someone would determine the lat/lng coordinates from
   the Georgia bill used to define the districts, http://www.legis.ga.gov/legislation/en-US/display/20112012/SB/494.
 - Currently, the polygons for the districts are static information in
   hackydata.js. Using the
   https://communities.socrata.com/developers/docs/athens-clark-county-districts
   API would be nice to demonstrate to others how to use the API.
 - Add address autocomplete, coffee script example: https://gist.github.com/GSto/c219aa6ab0043a3cad9d
   
### Contributors

Alexandria Drake, Amanda Newell, Glenn Stovall, Jennifer Johnston, Jonathan Wallace
