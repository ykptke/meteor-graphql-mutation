import { graphql } from 'graphql';
import Future from 'fibers/future';
import schema from './schema';

Meteor.methods({
  'graphql.transport'(query, vars, operationName) {
    const rootValue = {userId: "id"};
    const f = new Future();

    graphql(schema, query, rootValue, vars, operationName)
      .then(result => {
        if (result.errors) console.log(result);
        f.return(result);
      })
      .catch(error => {
        f.throw(error);
      });

    return f.wait();
  }
});
