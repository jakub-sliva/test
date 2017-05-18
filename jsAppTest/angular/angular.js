/**
 * This is main controller for angular test.
 */
var sportsApp = angular.module('sportsApp', []);

sportsApp.controller('SportsController', function ($scope) {
    $scope.orderProp = 'id';
    $scope.reverse   = false;
    
    $scope.sports = [{
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

    /**
     * Save new record
     */
    $scope.addSport = function() {
        $scope.data.id = $scope.sports.length + 1;
        $scope.sports.push($scope.data);
        $scope.data = {};
    };

    /**
     * Delete record
     */
    $scope.deleteSport = function(sport) {
        $scope.sports.splice(sport.id - 1, 1);
    };

    /**
     * Save to local store
     */
    $scope.$watch('sports', function(newList, oldList) {
        localStorage.setItem('sports', JSON.stringify(newList));
    }, true);
});
