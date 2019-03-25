# Serverless Function and SAS Viya - A Good Match

An AWS serverless function for scoring with astore. 

## Installation

1. Clone this repository
2. Do an 'npm install'
2. Edit and/or replace the serverless.yml to be appropriate for your environment
   - Pay attention to the environment section. This is where you will define how to logon to Viya and the astore to use.
3. Deploy the function

### A note on securing your password

In this example we are storing the userid and password in the environment variables. This is to the keep the focus on the internals of serverless functions for SAS Viya. Locally you can use "serverless variables" to secure the information during development. However for production deployment recommend that you refer to your provider's recommendations and the user community for best practices. Usually there are multiple ways to do it.

## Tools

Recommend [serverless cli](https://github.com/serverless/serverless). But use what ever makes you comfortable

## Serverless functions in this repository

1. app - Invoke this from your browser. In the app you can enter some information for a loan application.

2. score - This serverless function accesses Viya to score the loan.


## Relevant blog
<TBD: after Joe gets the blog link to me>


    




