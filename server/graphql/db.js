import { Posts } from '/lib/collections';
import Fiber from 'fibers';

export const DB = {
  Posts: {
    get: function({name}) {
      return Posts.findOne({name: name});
    },
    create: function({name}) {

      Fiber(function() {
        Posts.insert({name: name});
      }).run();

      return {name};
    }
  }
};
