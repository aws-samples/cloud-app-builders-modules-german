/*jshint esversion: 8 */
//const aws = require('aws-sdk');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand,DeleteCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient();
const doc = DynamoDBDocumentClient.from(client);

const userId = 'user';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return r.toString(16);
    });
}

function done(status, body) {
    return {
        statusCode: status,
        body: JSON.stringify(body)
    };
}

function parseTodoBody(event) {
    // Get the string form of the body data
    var todoString = event.body;
    if (event.isBase64Encoded) {
        todoString = Buffer.from(event.body, 'base64').toString();
    }
    return JSON.parse(todoString);
}

export const handler = async (event) => {
    console.log("Event");
    console.log(event);
    const method = event.requestContext.httpMethod;

    if (method === 'GET') {
        try {
            return await getTodos(userId);
        } catch (err) {
            console.error(err);
            return done(500, { "message": "Error retrieving TODOs" });
        }
    } else if (method === 'POST') {
        // Parse it and save, or indicate bad input
        try {
            const todo = parseTodoBody(event);
            // Add the extra context we need
            todo.id = uuidv4();
            todo.user_id = userId;

            // Save it
            return await saveTodo(todo);
        } catch (err) {
            console.error(err);
            return done(400, { "message": "Invalid JSON body" });
        }
    } else if (method == 'DELETE') {
        const id = event.pathParameters.todo;
        return await deleteTodo(id);

    } else if (method == 'PUT') {
        const id = event.pathParameters.todo;
        const todo = parseTodoBody(event);
        if (!("user_id" in todo)) {
            todo.user_id = userId;
        }
        return await patchTodo(id, todo);
    }
    else {
        return done(400, { "message": "Invalid HTTP Method" });
    }
};

const patchTodo = async function (id, todo) {
    const params = {
        TableName: process.env.TABLE,
        Key: {
            "user_id": userId,
            "id": id
        },
        Item: todo,
    };
    const command = new PutCommand(params);
    const result = await doc.send(command);
    console.log(result);
    return done(200, { "message": "Item with id " + id + " updated" });
};

const deleteTodo = async function (id) {
    const params = {
        TableName: process.env.TABLE,
        Key: {
            "user_id": userId,
            "id": id
        }
    };
    const command = new DeleteCommand(params);
    await doc.send(command);
    return done(200, { "message": "Item with id " + id + " removed" });
};

const getTodos = async function (id) {
    const params = {
        TableName: process.env.TABLE,
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": id,
        },

    };
    
    const command = new QueryCommand(params);
    const data = await doc.send(command);
    console.log("query results");
    console.log(data);
    return done(200, data.Items);

};

const saveTodo = async function (todo) {
    console.log("Saving TODO");
    console.log(todo);
    const params = {
        TableName: process.env.TABLE,
        Item: todo
    };

    const command = new PutCommand(params);
    const result = await doc.send(command);
    console.log(result);
    return done(200, todo);
};