import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';
import { RenderIde } from './render_ide';
import schema from './schema';
import { graphql } from 'graphql';

Picker.middleware(bodyParser.text({ type: 'application/graphql' }));
Picker.middleware(bodyParser.json());

Picker.route('/graphql', function(params, req, res, next) {
  if (req.method === "POST") {
    const response = Meteor.call(
      'graphql.transport', req.body
    );
    const json = JSON.stringify(response);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(json);
  } else {
    res.writeHead(500);
    res.end("only post");
  }
});


Picker.route('/graphql/ide', (params, req, res) => {
  if(req.method === 'GET') {
    const {query, variables} = params.query;
    const html = RenderIde({query, variables});
    res.end(html);
  } else {
    try {
      const {query, variables, operationName} = req.body;
      const variablesJson = (variables) ? JSON.parse(variables) : {};

      const response = Meteor.call(
        'graphql.transport', query, variablesJson, operationName
      );

      const json = JSON.stringify(response);
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(json);
    } catch(ex) {
      console.error(ex.stack);
      res.writeHead(500);
      res.end("Internal Error");
    }
  }
});
