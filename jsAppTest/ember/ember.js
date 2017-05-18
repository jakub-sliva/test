App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    var data = [{
        'id'         : 1,
        'name'       : "Tenis",
        'description': "Nejaka hra"
    },
    {
        'id'         : 2,
        'name'       : "Pinpong",
        'description': "To nevim co je"
    },
    {
        'id'         : 3,
        'name'       : "Hokej",
        'description': "Golf trochu jinak"
    }];

    return data;
  },
  
  actions: {
    remove: function (id) {
        console.log('Item with id "' + id + '" was REMOVED.');
    },

    add: function (id) {
        console.log('Item was ADD');
    }
  }
});
