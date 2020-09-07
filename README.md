#

- - -

# rapid\_api\_integration

## Pre-requisites

1. Node(>=11.12.0) and npm(>=6.7.0) installed
2. mysql server and memcache server

## Guide to setup

1. Get the maxmind key [maxmind.com].
2. Run below command by replacing <YOUR\_LICENSE\_KEY> with your personal key :

```
cd node_modules/geoip-lite && npm run-script updatedb license_key=YOUR_LICENSE_KEY
```

3. Create database in mysql server by running below command :

```
create database news_analysis
```

4. Run `npm install`
5. Run below command to run migrations :

```
npm run migrations
```

6. Start memcache server :

```
memcached -p 11211 -d
```

7. Open the terminal and set the environment variables(On mac).

```
source environment.sh
```

8. Import apis present under postman folder in postman application.
9. Start the server by running below command :

```
node app.js
```

**Overview:**

1. For get-news api, **node-cache** is used to cache the response for 24-hours.
2. For get-news-analysis api, **memcache** is used to cache the response.
3. There is a background script which fetches the top symbol request in minutes(configured in environment variable **POPULAR_SYMBOL_VS_COUNTRY_COUNT)** and updates the cache.
4. For both the apis, worst case response time is 150ms and average is less than 100ms.