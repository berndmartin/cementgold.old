#!/bin/bash
gulp build
sleep 1
#open http://localhost/yieldestate/www/index.html
#sed -i.bak -e '20d;21d' ./www/index.html
rm -rf ./www/main.html
#cp ./www/index.html ./www/main.html
#sed -i.bak -e '20d;21d' ./www/main.html
#sed -i.bak -e '21d;22d;23d;24d' ./www/main.html
open -a /Applications/Google\ Chrome\ Canary.app/ http://cementgold.local
#open -a /Applications/Google\ Chrome\ Canary.app/ http://cementgold.local/#/estate/new
#scp -pr www/* martin@192.168.2.191:/var/www/yield;
#rm cementgold.zip
#zip cementgold.zip www/*
#zip cementgold.zip config.xml

phonegap build ios
phonegap run ios

phonegap build android
#phonegap run android
# create var 
#DATETIME=`date +%Y%m%d-%H%M%S` # Grab the date
#LOGFILE=deploy.log
# create file with this name
#FILE=yield-$DATETIME.tar.bz2
# comress the file
#tar -zcvf $FILE ./www/ >> $LOGFILE
#tar -zc www/ | ssh martin@192.168.2.191 tar -zxC /var/www/yield
# put the file on the server
#scp $FILE martin@192.168.2.191:/var/www/yield/$FILE >> $LOGFILE
#ssh martin@192.168.2.191 "tar -zxvf /var/www/yield/$FILE"
#remove or move tar file
#mv $FILE old/

#android

