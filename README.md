# serverless-score-models - a reusuable serverless function for scoring with Viya

---
The serverless function can be used to score when the scoring code is:

1. A datastep code or ds2 code deployed as a codeTable on a cas server

2. An astore that is deployed on a cas server

3. Accessing model published to a Micro Analytic Service or CAS destination

---

## Repository

The code is available at <https://github.com/sassoftware/viya-apps-serverless-score>

## Configuration

1. Edit the serverless.yml and modify it for your needs.

## Securing your secrets

It is recommended that you create a AWS Secret with the following information:

```js
{
VIYA_SERVER,
USER,
PASSWORD,
CLIENTID,
CLIENTSECRET
}
```

## Serverless endpoint /score

Use this end point for scoring

The payload JSON has this schema

```json
{
"destination": "xxx" , /* this is only needed for published models where xxx is either MAS or CAS*/
"modelName": "some-published-model-name", /* used only for published models */
"model": {"caslib": "<model's caslib", "name": "model's name"},
"scenario": {
  "inputvar1": <value>,
  "inputvar2": <value>,
  ...
  }
}

## Notes

The secret key can be specified in the payload as "key" as follows:

```json
{
  "key": "somekey",
  "destination": "xxx" , /* this is only needed for published models where xxx is either MAS or CAS*/
  "modelName": "some-published-model-name", /* used only for published models */
  "model": {"caslib": "<model's caslib", "name": "model's name"},
  "scenario": {
    "inputvar1": <value>,
    "inputvar2": <value>,
    ...
    }
  }
```

## Configuring SAS Viya Quick Start on AWS for serverless functions

Please see this link for details <https://github.com/sassoftware/restaf/wiki/Configuring-SAS-Viya-AWS-Quick-Start-for-serverless-functions>
