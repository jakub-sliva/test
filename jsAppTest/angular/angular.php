<!DOCTYPE html>
<html ng-app='sportsApp'>
    <head>
        <meta charset="UTF-8" />
        <title>Sports</title>
        <script type='text/javascript' src='../lib/angular/angular.js'></script>
        <script type='text/javascript' src='angular.js'></script>

        <link rel="stylesheet" href="../../style.css" type="text/css">
    </head>
    <body ng-controller='SportsController'>
        <section>
            <header>
                <h1>Sporty</h1>
                <input type="text" placeholder="hledaný výraz" id="search" ng-model="searchQuery" />
            </header>

            <table>
                <thead>
                    <tr>
                        <th id="sortById" ng-click="orderProp = 'id'; reverse = !reverse;">ID</th>
                        <th id="sortByName" ng-click="orderProp = 'name'; reverse = !reverse;">Name</th>
                        <th id="sortByDescription" ng-click="orderProp = 'description'; reverse = !reverse;">Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="sport in sports | filter:searchQuery | orderBy:orderProp:reverse">
                        <td>{{sport.id}}</td>
                        <td>{{sport.name}}</td>
                        <td>{{sport.description}}</td>
                        <td><input type="button" value="Delete" name="{{sport.id}}" ng-click="deleteSport(sport)" /></td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        <h2>Add new:</h2>
        <form ng-submit="addSport()">
            <input id="addSportName" type="text" ng-model="data.name" placeholder="Jméno sportu" />
            <textarea id="addSportDescription" placeholder="Krátký popis" ng-model="data.description"></textarea>
            <input id="addSportButton" type="submit" value="Add" />
        </form>
    </body>
</html>
