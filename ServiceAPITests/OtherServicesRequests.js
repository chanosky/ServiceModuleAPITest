const axios = require('axios');
const tags = require('mocha-tags');
const {expect} = require('chai');
const td = require('../ServiceAPITests/ServiceAPITestData/testdata.js')

describe('POST/DELETE/PATCH API Requests for Service Module', async () =>  {
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
        tags('smoke', 'TC 10').it('TC 10 - Verify POST/services api creates a new service object using a valid payload and should have response 201', async() => {
            let TC10res = await axios.post(td.baseurl+'/services', td.addservicepayload);
                var TC10newserviceid = (TC10res.data.id); 
                expect(TC10res.status).equal(201);               
                expect(TC10res.data.id).to.exist;
                expect(TC10res.data.name).equal(td.servicename);
                expect(TC10res.data.createdAt).to.include(td.date.toISOString().slice(0, -5));
                expect(TC10res.data.updatedAt).to.include(td.date.toISOString().slice(0, -5));
            let TC10verifyres = await axios.get(td.baseurl+'/services'+'/'+TC10newserviceid);
                expect(TC10verifyres.data.id).equal(TC10newserviceid);
                expect(typeof TC10verifyres.data.id).equal('number');
                expect(TC10verifyres.data.name).equal(TC10res.data.name);
                expect(typeof TC10verifyres.data.name).equal('string');
                expect(TC10verifyres.data.createdAt).equal(TC10res.data.createdAt);
                expect(typeof TC10verifyres.data.createdAt).equal('string');
                expect(TC10verifyres.data.updatedAt).equal(TC10res.data.updatedAt);
                expect(typeof TC10verifyres.data.updatedAt).equal('string');
            after(('Delete added service to reduce garbage data'), async () => {
                await axios.delete(td.baseurl+'/services'+'/'+TC10newserviceid);                                                      
            });                             
    });
        tags('smoke', 'TC 11').it('TC 11 - Verify POST/services api returns an error object upon using an invalid payload and should have response 400', async() => {
            try {
                await axios.post(td.baseurl+'/services', td.invalidservicepayload);               
            }
            catch (error) {
                expect(error.response.data.name).equal("BadRequest");
                expect(error.response.data.message).equal("Invalid Parameters");
                expect(error.response.data.code).equal(400);
                expect(error.response.data.className).equal("bad-request");
                expect(error.response.data.data).to.be.empty;
                expect(error.response.data.errors[0]).equal(td.errorsobject[0]); 
                expect(error.response.data.errors[1]).equal(td.errorsobject[1]);
                expect(error.response.data.errors[2]).equal(td.errorsobject[2]);
                expect(error.response.data.errors[3]).equal(td.errorsobject[3]);                    
                expect(error.response.status).equal(400);               
            }                                                                              
    });
        tags('smoke', 'TC 12').it('TC 12 - Verify DELETE/services api deletes a service object using a valid id and should have response 200', async() => {
            let TC12res = await axios.post(td.baseurl+'/services', td.addservicepayload);
            let TC12newserviceid = (TC12res.data.id);
            let TC12servicename = (TC12res.data.name); 
            let TC12createdAt = (TC12res.data.createdAt); 
            let TC12updatedAt = (TC12res.data.updatedAt);                 
            let deletedservice = await axios.delete(td.baseurl+'/services'+'/'+TC12newserviceid);
                expect(deletedservice.data.id).equal(TC12newserviceid)
                expect(deletedservice.data.name).equal(TC12servicename);
                expect(deletedservice.data.createdAt).equal(TC12createdAt);
                expect(deletedservice.data.updatedAt).equal(TC12updatedAt);
                expect(deletedservice.status).equal(200);                            
    });
        tags('smoke', 'TC 13').it('TC 13 - Verify DELETE/services api should return an error using a non existing id and should have response 404', async() => {
            try {
                await await axios.delete(td.baseurl+'/services'+'/'+td.letters);               
            }
            catch (error) {
                expect(error.response.data.name).equal("NotFound");
                expect(error.response.data.message).equal("No record found for id"+' '+"'"+td.letters+"'");
                expect(error.response.data.code).equal(404);
                expect(error.response.data.className).equal("not-found");
                expect(error.response.data.errors).to.be.empty;                 
                expect(error.response.status).equal(404);               
            }                                                                              
    });
        tags('smoke', 'TC 14').it('TC 14 - Verify PATCH/services api updates a service object using a valid id and should have response 200', async() => {
            let TC14res = await axios.get(td.baseurl+'/services'+'/'+td.patchserviceid);
            let TC14newserviceid = (TC14res.data.id);
            let TC14servicename = (TC14res.data.name); 
            let TC14createdAt = (TC14res.data.createdAt); 
            let patchedservice = await axios.patch(td.baseurl+'/services'+'/'+td.patchserviceid, {});
                expect(patchedservice.data.id).equal(TC14newserviceid)
                expect(patchedservice.data.name).equal(TC14servicename);
                expect(patchedservice.data.createdAt).equal(TC14createdAt);
                expect(patchedservice.status).equal(200);
            let TC14updatedAtnew = (patchedservice.data.updatedAt);
            let TC14verify = await axios.get(td.baseurl+'/services'+'/'+td.patchserviceid);
                expect(TC14verify.data.id).equal(td.patchserviceid);
                expect(TC14verify.data.name).equal(TC14servicename);
                expect(TC14verify.data.createdAt).equal(TC14createdAt);
                expect(TC14verify.data.updatedAt).equal(TC14updatedAtnew);                        
    });
        tags('smoke', 'TC 15').it('TC 15 - Verify PATCH/services api should return an error using a non existing id and should have response 404', async() => {
            try {
                await axios.patch(td.baseurl+'/services'+'/'+td.letters, {});               
            }
            catch (error) {
                expect(error.response.data.name).equal("NotFound");
                expect(error.response.data.message).equal("No record found for id"+' '+"'"+td.letters+"'");
                expect(error.response.data.code).equal(404);
                expect(error.response.data.className).equal("not-found");
                expect(error.response.data.errors).to.be.empty;                 
                expect(error.response.status).equal(404);               
            }                                                                              
    });
        tags('smoke', 'TC 16').it('TC 16 - Verify PATCH/services api should return an error using an invalid payload and should have response 500', async() => {
            try {
                await await axios.patch(td.baseurl+'/services'+'/'+td.patchserviceid, td.letters);               
            }
            catch (error) {
                expect(error.response.data.name).equal("GeneralError");
                expect(error.response.data.message).equal("Unexpected token a in JSON at position 0");
                expect(error.response.data.code).equal(500);
                expect(error.response.data.className).equal("general-error");
                expect(error.response.data.data).to.be.empty;
                expect(error.response.data.errors).to.be.empty;                 
                expect(error.response.status).equal(500);               
            }                                                                              
    });
});