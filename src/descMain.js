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

module.exports = async function descMain (store, inParms) {

    let {rstore} = inParms;
    
    let caslStatements = `
        loadactionset "astore";

        action table.loadTable /
            caslib = "${rstore.caslib}" 
            path   = "${rstore.name}.sashdat"
            casout  = { caslib = "${rstore.caslib}"   name = "${rstore.name}" replace=TRUE};

        action astore.describe r=result /
            rstore = { caslib= "${rstore.caslib}" name = '${rstore.name}' };

        send_response(result);

        `;

    let {session} = await casSetup(store, [ 'sccasl' ]);
    let payload = {
        action: 'sccasl.runcasl',
        data  : { code: caslStatements}
    }

    let result    = await store.runAction(session, payload);
    return {columns: scoreAsJson(result, 'InputVariables')};
}

