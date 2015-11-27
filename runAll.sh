#!/bin/bash

# PURPOSE:
#/////////////
# This script will run all unit tests in the Tests/ folder for every page
# in the nodelist it is given. For comparison tests, both urls are read and compared.
# For functional tests, only the first url on a line is used. 


# ARGS:
#/////////////
# ./runAll [nodelist]

# [nodelist] - Name of the nodelist either pulled by pullNodes.sh or a custom nodelist for testing purposes.
#			   i.e. business_aoda-news-nodelist.txt


# NOTES:
#/////////////

RED='\033[0:31m'
GREEN='\033[0;32m'

# Checks that the correct number of arguments are present
if [ $# -lt 1 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "Please specify the filename of the node list, i.e." 
	echo -e "\e[33m ./runAll.sh \e[95mnodelist.txt\e[0m "
	exit
fi
# Checks that the nodelist file specified exists
if [ ! -f nodelists/$1 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "File '" $1 "' not found! Make sure the name of the nodelist file is correct and the path to it is specified."
	exit
fi

# reads each line of the specified file and uses it as arguments for calling the nightwatch tests

while read line
do 
	./nightwatch foo bar $line --reporter ./html-reporter.js # adding 2 args 'foo' and 'bar' as filler so scripts can run the same for runAll and runSpecific
done < nodelists/$1
./nightwatch foo bar $line --reporter ./html-reporter.js # runs the command one extra time for the final line