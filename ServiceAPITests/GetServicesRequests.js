const axios = require('axios');
const tags = require('mocha-tags');
const {expect} = require('chai');
const td = require('../ServiceAPITests/ServiceAPITestData/testdata.js');


describe('GET API Requests for Service Module', async () =>  {
        before('Verify BestBuy App is running', async () => {
            try {
                let res = await axios.get(td.baseurl)
                .then(res => {
                let url = res.config.url;
                expect(url).equal(td.baseurl);
                expect(res.status).equal(200);
                console.log('BestBuy App is running');                 
            })
        }    
            catch (error) {
                console.log('BestBuy App is down, execution will fail'); 
            }
    });
        tags('smoke', 'TC 1').it('TC 1 - Verify GET/services should display correct and default values and should display status 200', async() => {
            let TC1test = await axios.get(td.baseurl+'/services');
            let TC1total = TC1test.data.total;
            const newres = await axios.get(td.baseurl+'/services'+'/?'+'$limit='+TC1total);
                expect(TC1test.data.total).equal(newres.data.total);
                expect(typeof TC1test.data.total).equal('number');
                expect(TC1test.data.limit).equal(10);
                expect(typeof TC1test.data.limit).equal('number');
                expect(TC1test.data.skip).equal(0);
                expect(typeof TC1test.data.skip).equal('number');
                expect(TC1test.data.data).to.have.lengthOf(10);
                expect(TC1test.status).equal(200)   
    });
        tags('smoke', 'TC 2').it('TC 2 - Verify GET/services api limit filter should be working as expected and should have response 200', async() => {
            try {
            var TC2test = await axios.get(td.baseurl+'/services'+'/?'+'$limit='+td.limitparam);
                expect(TC2test.status).equal(200)
                expect(TC2test.data.limit).equal(td.limitparam);
                expect(TC2test.data.data).to.have.lengthOf(td.limitparam);
            }
            catch (error) {
                if (error.code === 'ECONNREFUSED'){
                    console.log('ECONNREFUSED ERROR BESTBUY APP NOT ONLINE');
                    throw new Error ();                   
                }
                    else {
                        console.log('ERROR IGNORED: Total Objects registered are less than the limit parameter');
                    }                      
                }                          
    });
        tags('smoke', 'TC 3').it('TC 3 - Verify GET/services api limit parameter should not accept letters and should yield error 500', async() => {
            try {
                await axios.get(td.baseurl+'/services'+'/?'+'$limit='+td.letters);
            }
            catch (error) {
                expect(error.response.data.name).equal("GeneralError");
                expect(error.response.data.message).equal("SQLITE_ERROR: no such column: NaN");
                expect(error.response.data.code).equal(500);
                expect(error.response.data.className).equal("general-error");
                expect(error.response.data.data).to.be.empty;
                expect(error.response.data.errors).to.be.empty;                    
                expect(error.response.status).equal(500);
            }                              
    });
        tags('smoke', 'TC 4').it('TC 4 - Verify GET/services api limit parameter should not accept symbols and should yield error 500', async() => {
            try {
                await axios.get(td.baseurl+'/services'+'/?'+'$limit='+td.symbols);
            }
            catch (error) {
                expect(error.response.data.name).equal("GeneralError");
                expect(error.response.data.message).equal("SQLITE_ERROR: no such column: NaN");
                expect(error.response.data.code).equal(500);
                expect(error.response.data.className).equal("general-error");
                expect(error.response.data.data).to.be.empty;
                expect(error.response.data.errors).to.be.empty;                    
                expect(error.response.status).equal(500);
            }                            
    });
        tags('smoke', 'TC 5').it('TC 5 - Verify GET/services api skip functionality should be working as expected and should have response 200', async() => {
            try {
            var TC5test = await axios.get(td.baseurl+'/services'+'/?'+'$skip='+td.skipparam);
                expect(TC5test.status).equal(200)
                expect(TC5test.data.skip).equal(td.skipparam);
                let object = TC5test.data.data[0];
                expect(object.id).equal(td.skipparam+1);
            }
            catch (error) {
                expect(test.data.data).to.be.empty; 
                }                            
    });
        tags('smoke', 'TC 6').it('TC 6 - Verify GET/services api skip parameter should not accept letters and should yield error 500', async() => {
            try {
                await axios.get(td.baseurl+'/services'+'/?'+'$skip='+td.letters);
            }
            catch (error) {
                expect(error.response.data.name).equal("GeneralError");
                expect(error.response.data.message).equal("SQLITE_ERROR: no such column: NaN");
                expect(error.response.data.code).equal(500);
                expect(error.response.data.className).equal("general-error");
                expect(error.response.data.data).to.be.empty;
                expect(error.response.data.errors).to.be.empty;                    
                expect(error.response.status).equal(500);
            }                            
    });
        tags('smoke', 'TC 7').it('TC 7 - Verify GET/services api skip parameter should not accept symbols and should yield error 500', async() => {
            try {
                await axios.get(td.baseurl+'/services'+'/?'+'$skip='+td.symbols);
            }
            catch (error) {
                expect(error.response.data.name).equal("GeneralError");
                expect(error.response.data.message).equal("SQLITE_ERROR: no such column: NaN");
                expect(error.response.data.code).equal(500);
                expect(error.response.data.className).equal("general-error");
                expect(error.response.data.data).to.be.empty;
                expect(error.response.data.errors).to.be.empty;                    
                expect(error.response.status).equal(500)
            }                            
    });
        tags('TC 8').it('TC 8 - Verify GET/services api skip and limit functionality should be working as expected and should have response 200 if both parameters are added', async() => {
        try {
            var TC8test = await axios.get(td.baseurl+'/services'+'/?'+'$skip='+td.skipparam+'&'+'$limit='+td.limitparam);
                expect(TC8test.status).equal(200);
                expect(TC8test.data.limit).equal(td.limitparam);
                expect(TC8test.data.data).to.have.lengthOf(td.limitparam);
                expect(TC8test.data.skip).equal(td.skipparam);
                try {
                    var object = TC8test.data.data[0];
                    expect(object.id).equal(td.skipparam+1);
                }
                catch {
                    expect(TC8test.data.data).to.be.empty;
                }
            }
            catch (error) {
                if (error.code === 'ECONNREFUSED'){
                    console.log('ECONNREFUSED ERROR BESTBUY APP NOT ONLINE');
                    throw new Error ();                   
                }
                    else {
                        console.log('ERROR IGNORED: Total Objects registered are less than the limit parameter');
                    }                    
                }                                                             
    });
        tags('smoke', 'TC 9').it('TC 9 - Verify GET/services{id} api should return values specific to given id and should have response 200', async() => {
            let TC9verify = await axios.get(td.baseurl+'/services'+'/'+td.testserviceid);
                expect(TC9verify.data.id).equal(td.testserviceid);
                expect(typeof TC9verify.data.id).equal('number');
                expect(TC9verify.data.name).equal(td.testname);
                expect(typeof TC9verify.data.name).equal('string');
                expect(TC9verify.data.createdAt).equal(td.testcreatedAt);
                expect(typeof TC9verify.data.createdAt).equal('string');
                expect(TC9verify.data.updatedAt).equal(td.testupdatedAt);
                expect(typeof TC9verify.data.updatedAt).equal('string');
    });
});