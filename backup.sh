#!/bin/bash


DATETIME=`date +%Y%m%d-%H%M%S` # Grab the date
#LOGFILE=deploy.log
# create file with this name
FILE=yield-srv-$DATETIME.tar.bz2
# comress the file
tar -zcvf $FILE ./src/* 
mv $FILE _backup/
#tar -zc www/ | ssh martin@192.168.2.191 tar -zxC /var/www/yield
# put the file on the server
#scp $FILE martin@192.168.2.191:/var/www/yield/$FILE >> $LOGFILE
#ssh martin@192.168.2.191 "tar -zxvf /var/www/yield/$FILE"
#remove or move tar file
#mv $FILE old/
