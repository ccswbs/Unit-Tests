#!/bin/bash

RED='\033[0:31m'

if [ $# -lt 4 ]; then
	echo -e "\e[31mERROR\e[0m"
<<<<<<< HEAD
	echo "Usage: ./pullNodes [db_name] [migration_table_name] [base_url]"
=======
	echo "Usage: ./pullNodes [db_name] [migration_table_name] [new_base_url] [old_base_url]"
>>>>>>> 05b61e5e742dd3783b7ef12e351f790cea22d219
	exit
fi

# This one's a doosy:         SQL query to the server to select nodes    pipes to sed to add 1st URL       pipes to sed to add second url     strips first line (column names) then redirects to text file
drush @aoda.$1.dev sql-query "SELECT sourceid1,destid1 from "$1"."$2"" | sed -e 's_^[0-9]*_'$3'/node/&_' | sed -e 's_[0-9]*$_ '$4'/node/&_' | sed -n '2,$p' > nodelists/$1-nodelist.txt