#!/bin/bash

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
	./nightwatch foo bar $line # adding 2 args 'foo', 'bar' and 'buzz' as filler so scripts can run the same for runAll and runSpecific
done < nodelists/$1
./nightwatch foo bar $line # runs the command one extra time for the final line