#!/bin/bash

RED='\033[0:31m'

if [ $# -lt 1 ]; then
	echo -e "\e[31mERROR\e[0m"
	echo "Usage: ./pullNodes [sitename]"
fi

drush @aoda.$1.dev sql-query "SELECT COUNT(node.nid) AS node_count, node_type.type FROM "$1".node INNER JOIN node_type ON node.type = node_type.type GROUP BY node_type.type;" | sed -n '2,$p' > $1-nodelist.txt