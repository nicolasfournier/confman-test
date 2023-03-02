/*
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(event, null, 2),
    };
}
*/


import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';

//setup AWS SDK and client to access DynamoDB
import { AWSError } from 'aws-sdk';
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

//the object providing access to our DB
const docClient = new AWS.DynamoDB.DocumentClient();


//create a new note based on the received event, and add it to the DynamoDB
//no special checks done.  Assumes that only well formed requests come in.  => shorter code.  Just an example
const handleCreateNoteRequest = async (event: APIGatewayProxyEvent) => {

    //checking some formatting
    let requestBodyJson = '';
    {
        if (event.isBase64Encoded) {
            requestBodyJson = (Buffer.from(event.body ?? '', 'base64')).toString('utf8');
        } else {
            requestBodyJson = event.body ?? '';
        }
    }

    //get the "content" and the "id" from the received event json
    const requestBodyObject = JSON.parse(requestBodyJson) as { id: string, content: string };


    //insert the data into the DB (the "put" function); possibly catch and output any error 
    await new Promise((resolve, reject) => {
        docClient.put(
            {
                TableName: 'notes',
                Item: {
                    id: requestBodyObject.id,
                    content: requestBodyObject.content
                }
            },
            (err: AWSError) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(null);
                }
            });
    });

    return {
        statusCode: 201,
        headers: {
            'content-type': 'text/plain'
        },
        body: 'Created.',
    };
};


const handleGetNotesRequest = async () => {
    const queryResult: ScanOutput = await new Promise((resolve, reject) => {
        docClient.scan(
            { TableName: 'notes', Limit: 100 },
            (err: AWSError, data: ScanOutput) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });

    return {
        statusCode: 200,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(queryResult.Items),
    };
};

export const handler: APIGatewayProxyHandler = async (event) => {
    const routeKey = `${event.httpMethod} ${event.pathParameters?.proxy}`;

    if (routeKey === 'GET notes/') {
        return handleGetNotesRequest();
    }

    if (routeKey === 'POST notes/') {
        return handleCreateNoteRequest(event);
    }

    return {
        statusCode: 404,
        body: `No handler for routeKey ${routeKey}.`,
    };
};

