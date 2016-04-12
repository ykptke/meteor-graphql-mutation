# meteor-graphql-mutation
Meteor graphql mutation example

Setting Up

make sure you have Meteor installed
clone this repo

    npm install
    meteor
    
Your app should be running [http://localhost:3000/graphql/ide](http://localhost:3000/graphql/ide)

mutation example;

    mutation {
      newPost(name: "new post text") {
        name
      }
    }
