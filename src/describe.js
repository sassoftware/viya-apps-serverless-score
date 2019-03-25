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
let restaf          = require('restaf');
let descMain        = require('./descMain');
let getLogonPayload = require('../lib/getLogonPayload');
let setPayload      = require('../lib/setPayload');
let setError        = require('../lib/setError');
let parseEvent      = require('../lib/parseEvent');

module.exports = async function describe (event, context) {
    
      let store   = restaf.initStore();
      let payload = getLogonPayload();
      let inParms = parseEvent(event);
      
      return store.logon(payload)
            .then (()    => descMain (store, inParms))
            .then(result => setPayload(result))
            .catch(err   => setError(err))
}