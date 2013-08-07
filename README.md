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
 - Contact ACC or CivicPlus to see about what APIs they provide.
   
### Contributors

Alexandria Drake, Amanda Newell, Glenn Stovall, Jennifer Johnston, Jonathan Wallace


### Getting Started
ruby version is ```1.9.3```

```cd``` to the root of the application

Install gems
```bundle install```

Start server
```rackup config.ru```

In your browser, go to ```http://0.0.0.0:9292/```
