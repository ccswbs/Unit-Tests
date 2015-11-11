#!/bin/bash

if [$# < 3]; then
	echo 'Please specify the test folder followed by the script name'
fi

while read line
do 
	node nightwatch --test tests/$1/$2 $line
done < nodelist.txt