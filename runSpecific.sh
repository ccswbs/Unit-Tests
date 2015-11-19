#!/bin/bash

RED='\033[0:31m'
GREEN='\033[0;32m'

# Checks that the correct number of arguments are present
if [ $# -lt 3 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "Missing argument. Please specify the test folder followed by the script name, followed by the filename of the node list, i.e." 
	echo -e "\e[33m ./runSpecific.sh \e[93mcomparison \e[36mbreadcrumb.js \e[95mnodelist.txt\e[0m "
	exit
fi
# Checks that the nodelist file specified exists
if [ ! -f $3 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "File '" $3 "' not found! Make sure the name of the nodelist file is correct and the path to it is specified."
	exit
fi

# reads each line of the specified file and uses it as arguments for calling the nightwatch tests

while read line
do 
	node nightwatch --test tests/$1/$2 $line
done < nodelists/$3 
node nightwatch --test tests/$1/$2 $line