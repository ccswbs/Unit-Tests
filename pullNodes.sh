#!/bin/bash

# PURPOSE:
#/////////////
# This script will perform a mySQL query to server ws-securehst13, 
# Fetching drupal site migration tables containing the node numbers of
# new and old pages. The nodes numbers will be appended to appropriate url's, 
# and saved in a newline delimited text file.

# This text file will then effectively contain a url to every node on a site, 
# which will be used to provide site-wide nightwatch automated testing.


# ARGS:
#/////////////
# This script takes the following arguments:
#./pullNodes [db_name] [migration_table_name] [new_base_url] [old_base_url]

# [db_name] - name of the site database on the server which the nodes will be pulled from
#		      i.e. business_aoda
# [migration_table_name] - name of the table containing the nodes for a specific content type.
#						   Most sites will have more than one table, since most sites have multiple
#						   content types. Notation for table will be migrate_map_ug[contentType][6|7]
#						   where content type is content type (page, event, etc.) and the number following
#					       is the version of Drupal automated migration that was performed (either 6 or 7, maybe 8 in the future). 
#						   i.e. migrate_map_ugnews7
# [new_base_url] - The base url for the new staging site. Will most likely be in format:
#				   https://aoda.web.uoguelph.ca/[sitename] 
#				   where sitename is the subdomain of the newly installed and migrated Drupal site.
#				   i.e. https://aoda.web.uoguelph.ca/business
# [old_base_url] - The base url for the old production site. Will most likely be in format:
#				   https://www.uoguelph.ca/[sitename] 
#				   where sitename is the subdomain of the old production site.
#				   i.e. https://www.uoguelph.ca/business


# NOTES:
#/////////////
# - the [sitename] subdomain for the old and new site urls will not always be the same. For instance, https://.../csd (prod)
#   became https://.../sas (new dev) during the migration process
# - Full database and table names can be viewed on the mysql database on ws-securehst13.
RED='\033[0:31m'

if [ $# -lt 4 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo -e "Usage: \e[33m./pullNodes \e[93mdb_name \e[36mmigration_table_name \e[95mnew_base_url \e[32mold_base_url\e[0m "
	exit
fi

# This one's a doosy:            
#1) DRUSH command to select the correct database and table from SQL server
#2) pipes to sed to add 1st URL
#3) pipes to sed to add second URL
#4) strips first line (SQL column names)
#5) then redirects to text file
drush @aoda.$1.dev sql-query "SELECT destid1,sourceid1 from "$1"."$2"" \
| sed -e 's_^[0-9]*_'$3'/node/&_' \
| sed -e 's_[0-9]*$_ '$4'/node/&_' \
| sed -n '2,$p' \
> nodelists/$1-nodelist.txt






# Here's some ASCII elephants:

#                                         / )
#                                    .--.; |    _...,-"""-,
#                     .-""-.-""""-. /   _`'-._.'   /`      \
#                    /'     \      \|  (/'-._/     )        ;
#            .-""""-;       (       '--' /-'    _           |
#          .'       |        ;    e     /       a  ,       ;
#         /          \       |      __.'`-.__,    ;       /
#        /            `._     ;    .-'     `--.,__.\    /`
#       //|              \     \,-'                /\_.'
#      // |               `;.___>              /,-'.
#    /`|  /                |`\      _..---\    |    \
#    |/  /     _,.-----\   |  \   /`|      |   |\    \
#       /    .;   |    |   |   \ /  |      |   | \    )
#      |    / |   \    /   |\..' \   \     |   \  \..'
#   jgs \../  \.../    \.../ \.../---'     \.../
