#!/bin/bash

# PURPOSE:
#/////////////
# This script will run a specific test out of the test folder specified, for every page specified in 
# the nodelist file given to it. If the test is a comparison, it will read both urls on each line and compare the pages.
# If the test is a functional, it will ignore the second url on the line and only perform tests on the first one.


# ARGS:
#/////////////
# ./runSpecific [test_folder] [test_name] [nodelist]

# [test_folder] - Name of the folder the test is stored in (and the type of test it is). 
#				  Can be either 'functional' or 'comparison'.

# [test_name] - Name of the test script being run. Must exist in the test folder specified.
#				i.e. breadcrumb.js

# [nodelist] - Name of the nodelist either pulled by pullNodes.sh or a custom nodelist for testing purposes.
#			   i.e. business_aoda-news-nodelist.txt


# NOTES:
#/////////////

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
if [ ! -f nodelists/$3 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "File '" $3 "' not found! Make sure the name of the nodelist file is correct and the path to it is specified."
	exit
fi

# reads each line of the specified file and uses it as arguments for calling the nightwatch tests

while read line
do 
	node nightwatch --test tests/$1/$2 $line --reporter ./html-reporter.js
done < nodelists/$3 
node nightwatch --test tests/$1/$2 $line --reporter ./html-reporter.js # runs the command one extra time for the final line