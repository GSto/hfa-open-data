#!/usr/bin/env ruby

# Purpose:
#   Filter voting_districts_ga_2008.shp file and returns precincts as json for a specified county.
#   The voting_districts_ga_2008.shp was downloaded from https://data.georgiaspatial.org/login.asp
#
# Dependencies:
#   'geos' needs to be installed: http://trac.osgeo.org/geos/
#
# How To:
#   This can be executed from the command line, for example:
#
#     ruby parse_shp.shp /path/to/shapefile.shp /save/output/to/somewhere.json clarke
#    
#   The first argument is the path to the shapfile (ends with .shp), for example:
#
#     '/Users/travisdouce/test/extras/hack_for_athens/jonathan_project/voting_districts_ga_2008/VTD08.shp'
#
#   The second argument is the path to where you want to save the output json, for example:
#
#     '/Users/travisdouce/test/extras/hack_for_athens/jonathan_project/clarke_precints.json'
#
#   The third argument is the GA county (filter for this county), for example:
#
#     clarke
#

require 'rgeo'
require 'rgeo/shapefile'
require 'pry'
require 'json'

shp    = ARGV[0] 
output = ARGV[1]
county = ARGV[2]

def parse_shp(shp, county)

  precincts_for_county = []

  RGeo::Shapefile::Reader.open(shp) do |file|

    # does not have .map method
    file.each do |record|
      if record.attributes["COUNTY_NAM"] == county.upcase 
        precincts_for_county << { precinct:   record.attributes["PRECINCT_N"],
                                  attributes: record.attributes, 
                                  coords:     geometry_to_coords(record) } 

      end
    end 
  end
  precincts_for_county
end

# This is a hack, but I couldn't find a method to output the coordinates for a record
def geometry_to_coords(record)
  coords_as_string = record.geometry.as_text.match(/\(\(\((.*)\)\)\)/)
  coords_as_string[1].split(',').map {|c| c.split(' ').map {|s| s.to_f }}
end

File.open(output, 'w') {|f| f.write(parse_shp(shp, county).to_json) }

puts "Done!"

