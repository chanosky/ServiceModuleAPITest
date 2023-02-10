# API Automation Test for Best Buy API Playground

*This API Automation script uses the Mocha Framework, Chai.js and Axios to automate the testing of Best Buy API Playground, this test only covers the Services API* 

**The script will test the Services API by using a variety of test cases including:**

	 TC 1 - Verify GET/services should display correct and default values and should display status 200
	 TC 2 - Verify GET/services api limit filter should be working as expected and should have response 200
	 TC 3 - Verify GET/services api limit parameter should not accept letters and should yield error 500
	 TC 4 - Verify GET/services api limit parameter should not accept symbols and should yield error 500
	 TC 5 - Verify GET/services api skip functionality should be working as expected and should have response 200
	 TC 6 - Verify GET/services api skip parameter should not accept letters and should yield error 500
	 TC 7 - Verify GET/services api skip parameter should not accept symbols and should yield error 500
	 TC 8 - Verify GET/services api skip and limit functionality should be working as expected and should have response 200 if both parameters are added
	 TC 9 - Verify GET/services{id} api should return values specific to given id and should have response 200
	 TC 10 - Verify POST/services api creates a new service object using a valid payload and should have response 201
	 TC 11 - Verify POST/services api returns an error object upon using an invalid payload and should have response 400
	 TC 12 - Verify DELETE/services api deletes a service object using a valid id and should have response 200
	 TC 13 - Verify DELETE/services api should return an error using a non existing id and should have response 404
	 TC 14 - Verify PATCH/services api updates a service object using a valid id and should have response 200
	 TC 15 - Verify PATCH/services api should return an error using a non existing id and should have response 404
	 TC 16 - Verify PATCH/services api should return an error using an invalid payload and should have response 500


# Prerequisites

Here are the prerequisites in order to run the script:

 - [ ] git 2.33.0.windows.2 or latest should be installed for windows in order to take advantage of git commands in the command line
 - [ ] nodejs v17.6.0 or latest, should be built in with the latest "npm"
 - [ ] Mocha.js v10.2.0 or latest (will automatically be installed using the package.json file)
 - [ ] Axios v1.3.2 or latest (will automatically be installed using the package.json file)
 - [ ] Chai.js v4.3.7 or latest (will automatically be installed using the package.json file)
 - [ ] Mocha Tags v1.0.1 or latest (will automatically be installed using the package.json file)
 - [ ] Mochawesome v7.1.3 or latest (will automatically be installed using the package.json file)

Another important prerequisite in order for us to run the script is to have the Best Buy API Playground app running in the background. This can be achieved by the following steps.

 1. Install NodeJS on your system. You can download the latest version from the official website: https://nodejs.org/en/download/.
 2. Open the installer and follow the prompts to install the Node.js. By default, the installer uses the Node.js distribution in C:\Program Files\nodejs. The installer should set the C:\Program Files\nodejs\bin directory in Window's PATH environment variable. Restart any open command prompts for the change to take effect.
 3. Verify installation is successful by running `node -v` in command line, verify npm is also available by running `npm -v`in the command line as well. Both should show their respective versions.
 4. Navigate to your desired folder in which you will place the app and enter the terminal (CMD for windows)
 5. Visit https://github.com/BestBuy/api-playground and clone the application. Use the command  `git clone`  followed by the repository url to fetch the script from GitHub, for example:  `git clone https://github.com/BestBuy/api-playground.git` . User can also just dowload the repository and manually extract it on the desired folder 
 6. Once the download is complete, navigate to `/api-playground folder`. Do not install it yet. I ran into issues when installing the app and cannot run the application. These are the troubleshooting steps that I've done to run it.

    

		Troubleshooting steps:
		1. Change the version of "sqlite3" from 4.0.3 to 5.1.4.
		2. Change one line of code in bestbuy-api-playground\src\db\index.js line 36 <FROM> var  model  =  sequelize['import'](path.join(__dirname,  file)); <TO> var  model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		3. Run npm install and ignore all errors and warnings.
		4. Run npm start.

 8. Now open [http://localhost:3030](http://localhost:3030/) in your browser to begin exploring the API
 9. Remember to start the app so that you won't encounter any issues when running the script.
		 


## How to run the API Automation Test

Please see below the step-by-step procedure for fetching the API Automation Test for Best Buy API Playground script from GitHub, installing the necessary requirements, and running the script using the command line:

1. Open a command prompt or terminal window and navigate to the directory where you want to store the script.
2. Use the command `git clone` followed by the repository url to fetch the script from GitHub, for example: `https://github.com/chanosky/ServiceModuleAPITest.git` or just download the repository to your desired location.
3. Navigate into the cloned repository by using the command `cd yourrepository` (make sure you are in the `/ServiceModuleAPITest` folder.)
4. Install the necessary requirements by running the command `npm install`
5. The test has multiple ways to run the automation tests, see commands below:

			

		 - npm run gettests
			 - used to run GET/services requests
		 - npm run othertests
			 - used to run POST, DELETE and PATCH /services requests
		 - npm run smoke
			 - used to run tests tagged as smoke
		 - npm run alltests
			 - used to run all tests

 6. There will be an html file and a json file which will be generated in the directory for the user to check the result of the test.

	
		

## Limitations

This script has the following limitations:

1. The script has only been tested on a Windows 10 operating system. There may be compatibility issues when running the script on other operating systems such as MacOS, Linux, etc.
       
2. CI/CD for this script was not yet set up.
    
It is important to keep these limitations in mind when using this script and to thoroughly test the script on different operating systems before using it.

> Do not change anything inside the folders, check the commented variables inside `ServiceAPITests\ServiceAPITestData\testdata.js`, you can play around with this test data file but changing any variables might incur errors when running.

## Bugs and issues found

1. The max value of the limit parameter is only 25. Putting any number higher than 25 will not work.

2. The limit and skip parameter does not have any validations for testing number of characters, it will accept any number of characters.

3. The limit and skip parameter accepts leading spaces only. This should have validations.
	
4. Since the max value of the limit parameter is only 25, it cannot show services more than 25.