# rapid_api_integration

## Pre-requisites
1. Node(>=11.12.0) and npm(>=6.7.0) installed
2. mysql server and memcache server

## Guide to setup
1. Get the maxmind key [maxmind.com].
2. Run below command by replacing <YOUR_LICENSE_KEY> with your personal key : 
```
cd node_modules/geoip-lite && npm run-script updatedb license_key=YOUR_LICENSE_KEY
```
3. Create database in mysql server by running below command : 
```
create database news_analysis
```
4. Run below command to run migrations :
```
    npm run migrations
```
5. Start memcache server :
```
memcached -p 11211 -d
```
6. Import apis present under postman folder in postman application.