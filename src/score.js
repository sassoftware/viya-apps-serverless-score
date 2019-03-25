'use strict';
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
let restaf           = require('restaf');
let scoreMain        = require('./scoreMain');
let getLogonPayload  = require('../lib/getLogonPayload');
let setPayload       = require('../lib/setPayload');
let setError         = require('../lib/setError');
let parseEvent       = require('../lib/parseEvent');


//
// Get Viya logon info from environment variables and logon to Viya Server 
// Follow that by handling the call
//  Note how an error is returned as "normal" result but with statusCode set to some http error condition(ex: 400)
// There are better ways to handle error conditions in AWS but for pass 1 this is good enough
//
module.exports.score  = async function (event, context) {

   let store   = restaf.initStore(); /* initialize restaf         */
   let inParms = parseEvent(event);  /* (1) validate input        */
   let payload = getLogonPayload();  /* (2) get logon information */

   return store.logon(payload)  /* (3) logon to Viya */
        .then (()    => scoreMain (store, inParms)) /* score */
        .then(result => setPayload(result))         /* return results    */
        .catch(err   => setError(err))              /* else return error */
}
