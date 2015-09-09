#Just_Lol_Stuff
Repo for CS4096 Group Project

#To get started:

1. Clone the repo then 'cd' to the working directory
2. Install Node >= 0.10.0
3. Install dependencies

	> $ npm install gulp && npm install

4. Begin serving files

	> $ gulp

At this point gulp will do some temporary compilation and serve the files for accessing.  Watchers are configured such that when files change browsers will automativcally be roloaded.  This applies for all devices connected to the files gulp is serving.

#Deployment
Before deploying
	> $ gulp build

This will create a 'dist' directory with all JS/HTML/CSS minified and images optimized for distrobution