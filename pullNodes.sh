#!/bin/bash

RED='\033[0:31m'

if [ $# -lt 2 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "Usage: ./pullNodes [sitename] [migration table name]"
fi

drush @aoda.$1.dev sql-query "SELECT sourceid1,destid1 from "$1"."$2"" | sed -n '2,$p' > nodelists/$1-nodelist.txt # sed cuts out column headers and writes it to a file