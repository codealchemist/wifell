#!/bin/bash
interface="wlan0"

clear
echo "REMEMBER to install dependencies:"
echo "sudo apt-get install libpcap-dev"
echo "----------------------------------------"

echo 
echo ENABLING WIRELESS MONITOR MODE...
sudo ifconfig $interface down
sudo iwconfig $interface mode monitor
sudo ifconfig $interface up 

echo STARTING PACKET CAPTURE...
sudo node index.js

echo
echo DISABLING WIRELESS MONITOR MODE...
sudo ifconfig $interface down
sudo iwconfig $interface mode managed
sudo ifconfig $interface up 
echo DONE.
echo
