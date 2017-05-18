// Models
window.SportModel = Backbone.Model.extend();
 
window.SportsCollection = Backbone.Collection.extend({
    model: SportModel,
    url  : 'http://web.lc/api/sports/sports',
    
    initialize: function () {
        this.on('sort', this.refreshList, this);
        this.on('refresh', this.refreshList, this);
    },
 
    refreshList: function () {
        if (!_.isUndefined(window.sportsList)) {
            $('#content').replaceWith(window.sportsList.render().el);
        }
    }
});
 
// Views
window.SearchView = Backbone.View.extend({
    tagName : 'span',
    template: _.template(
        '<input type="text" placeholder="hledaný výraz" id="search" />'
    ),

    events: {
        'change #search': "search"
    },

    search: function() {
        this.collection.trigger('refresh');
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});

window.HeadlineView = Backbone.View.extend({
    tagName : 'thead',
    template: _.template(
        '<tr><th id="sortById">ID</th><th id="sortByName">Name</th><th id="sortByDescription">Description</th><th>Delete</th></tr>'
    ),
    
    _asc: true,

    events: {
        'click #sortById'         : "sortById",
        'click #sortByName'       : "sortByName",
        'click #sortByDescription': "sortByDescription"
    },

    sortById: function() {
        var self = this;

        this.collection.comparator = function(sport) {
            return (self._asc ? +1 : -1) * parseInt(sport.get('id'), 10);
        };

        this._asc = !this._asc;
        this.collection.sort();
    },

    sortByName: function() {
        var self = this;

        this.collection.comparator = function(a, b) {
            return self._asc ? a.get('name') > b.get('name') : a.get('name') < b.get('name');
        };

        this._asc = !this._asc;
        this.collection.sort();
    },

    sortByDescription: function() {
        var self = this;

        this.collection.comparator = function(a, b) {
            return self._asc ? a.get('description') > b.get('description') : a.get('description') < b.get('description');
        };

        this._asc = !this._asc;
        this.collection.sort();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});

window.SportsListView = Backbone.View.extend({
    tagName : 'tbody',
    
    render:function () {
        $(this.el).html('');

        var self   = this,
            sports = this.collection.models,
            filter = $('#search').val();
        
        if (filter != '') {
            sports = this.collection.where({name: filter});
        }
 
        _.each(sports, function (sport) {
            $(this.el).append(new SportListItemView({
                model     : sport,
                collection: self.collection
            }).render().el);
        }, this);
        return this;
    }
});
 
window.SportListItemView = Backbone.View.extend({
    tagName : 'tr',
    template: _.template('<td><%= id %></td><td><%= name %></td><td><%= description %></td><td><input type="button" value="Delete" name="<%= id %>" id="deleteSportButton" /></td>'),
 
    events: {
        'click #deleteSportButton': "deleteSport"
    },

    deleteSport: function(object) {
        this.collection.remove(this.collection.get(object.currentTarget.name));
        this.collection.trigger('refresh');
    },
 
    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});

window.AddFormView = Backbone.View.extend({
    tagName : 'form',
    template: _.template(
        '<input type="text" id="addSportName" placeholder="Jméno sportu" /><textarea id="addSportDescription" placeholder="Krátký popis"></textarea><input type="button" value="Add" id="addSportButton" />'
    ),

    events: {
        'click #addSportButton': "addSport"
    },

    addSport: function() {
        var model = new SportModel({
            id  : this.collection.length + 1,
            name: $('#addSportName').val(),
            description: $('#addSportDescription').val()
        });
        
        this.collection.add(model);
        this.collection.trigger('refresh');

        $('#addSportName').val('');
        $('#addSportDescription').val('');
    },
 
    render:function () {
        $(this.el).html(this.template());
        return this;
    }
 
});
 
// Router
var AppRouter = Backbone.Router.extend({
 
    routes:{
        '': 'list'
    },
 
    list:function () {
        this.sportsList     = new SportsCollection();
        
        this.searchView     = new SearchView({collection: this.sportsList});
        this.headlineView   = new HeadlineView({collection: this.sportsList});
        this.sportsListView = new SportsListView({collection:this.sportsList});
        this.addFormView    = new AddFormView({collection:this.sportsList});
        
        window.sportsList = this.sportsListView;
        
        this.sportsList.on('sync', function () {
            $('#search').replaceWith(this.searchView.render().el);
            $('#headline').replaceWith(this.headlineView.render().el);
            $('#content').replaceWith(this.sportsListView.render().el);
            $('#addForm').replaceWith(this.addFormView.render().el);
        }, this);
        
        this.sportsList.fetch();
    }
});
 
var app = new AppRouter();
Backbone.history.start();