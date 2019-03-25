/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';
let casSetup    = require('../lib/casSetup');
let scoreAsJson = require('../lib/scoreAsJson');

 module.exports = async function scoreMain (store, inParms) {

    let {rstore, input} = inParms;
    if (input === null) {
        throw {Error: 'Missing input' }
    }
  
    // initialize
    let {session} = await casSetup(store, [ 'sccasl' ]);
   
    // upload data into a cas table
    let csv = makecsv(input);
    let JSON_Parameters = {
        casout: {
            caslib : 'casuser', /* a valid caslib */
            name   : 'INPUTDATA', /* name of output file on cas server */
            replace: true
        },

        importOptions: {
            fileType: 'csv' /* type of the file being uploaded */
        }
    };

    let payload = {
        headers: { 'JSON-Parameters': JSON_Parameters },
        data   : csv,
        action : 'table.upload'
    };

    let result = await store.runAction(session, payload);
 
    //
    // create casl statements for scoring
    //

    let caslStatements = `
        loadactionset "astore";

        action table.loadTable /
           caslib = "${rstore.caslib}" 
           path   = "${rstore.name}.sashdat"
           casout  = { caslib = "${rstore.caslib}"   name = "${rstore.name}" replace=TRUE};
   
        action astore.score /
          table  = { caslib= 'casuser' name = 'INPUTDATA' } 
          rstore = { caslib= "${rstore.caslib}" name = '${rstore.name}' }
          out    = { caslib = 'casuser' name = 'OUTPUTDATA' replace= TRUE};

        action table.fetch r = result/
            format = TRUE
            table = { caslib = 'casuser' name = 'OUTPUTDATA' } ;

        send_response(result);

        `;

    // execute cas actions
    payload = {
        action: 'sccasl.runcasl',
        data  : { code: caslStatements}
    }
    result = await store.runAction(session, payload);

    // fetch results and convert them to json
    let score = scoreAsJson(result, 'Fetch');
    return {score: score[0]};
   
}


function makecsv (data) {
    let row1 = null;
    let row2 = null; 
    for (let k in data) {
        if (row2 === null) {
            row2 = data[k];
            row1 = k;
        } else {
            row2 = row2 + ',' + data[k];
            row1 = row1 + ',' + k;
        }
    }

   return row1 + '\n' + row2 + '\n';

}
