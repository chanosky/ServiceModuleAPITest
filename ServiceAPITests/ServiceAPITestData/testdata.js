module.exports = {
  //Global Test data
  baseurl: 'http://localhost:3030',
  letters: 'letters',
  symbols: '!!!',

  //GET Requests Test Data
  limitparam : 20,
  skipparam : 3,
  testserviceid : 12, //Changing this value will result in an error
  testname : 'Car & GPS Installation Services', //Changing this value will result in an error
  testcreatedAt : '2016-11-17T17:56:35.881Z', //Changing this value will result in an error
  testupdatedAt : '2016-11-17T17:56:35.881Z', //Changing this value will result in an error

  //OTHER Requests Test Data
  addservicepayload : {"name":"sample"}, //Changing this value should affect servicename value
  invalidservicepayload : {    "namedasd": "string",    "notincluded": "notincludedvalue",    "invalidfield": "invalidfield"  }, //Changing this value should affect errorsobject values
  errorsobject : [
      "should NOT have additional properties: 'namedasd'",
      "should NOT have additional properties: 'notincluded'",
      "should NOT have additional properties: 'invalidfield'",
      "should have required property 'name'"
    ],
  servicename : 'sample',  
  date : new Date(), //Changing this value will result in an error
  patchserviceid : 1
};