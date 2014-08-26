if (Meteor.isClient) {
  var C = new Meteor.Collection('col');

  Deps.autorun(function() {
    if (C.findOne('record'))
      console.log('autorun: record is', C.findOne('record').value);
  });

  Deps.autorun(function() {
    if (Session.get('a'))
      Meteor.subscribe('a', function() {
        console.log('a is ready, record is', C.findOne('record').value);
      });
    else
      Meteor.subscribe('b', function() {
        console.log('b is ready, record is', C.findOne('record').value);
      });
  });
  
  Template.hello.events({
    'click': function() {
      Session.set('a', ! Session.get('a'))
    }
  })
}

if (Meteor.isServer) {
  Meteor.publish('a', function() {
    this.added('col', 'record', {value: 'a'});
    this.ready();
  });
  Meteor.publish('b', function() {
    this.added('col', 'record', {value: 'b'});
    this.ready();
  });
}
