<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Sports</title>
        <script type='text/javascript' src='../../library/jquery/jquery.js'></script>
        <script type='text/javascript' src='../../library/handlebars/handlebars.js'></script>
        <script type='text/javascript' src='../../library/ember/ember.js'></script>
        <script type='text/javascript' src='ember.js'></script>

        
        <link rel="stylesheet" href="../../style.css" type="text/css">
    </head>
    <body>
        <script type="text/x-handlebars">
        <section>
            <header>
                <h1>Sporty</h1>
                <input type="text" placeholder="hledaný výraz" id="search" />
            </header>

            <table>
                <thead>
                    <tr>
                        <th id="sortById">ID</th>
                        <th id="sortByName">Name</th>
                        <th id="sortByDescription">Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {{outlet}}
            </table>
        </section>

        <h2>Add new:</h2>
        <form>
            <input id="addSportName" type="text" placeholder="Jméno sportu" />
            <textarea id="addSportDescription" placeholder="Krátký popis"></textarea>
            <input {{action "add"}} type="button" id="addSportButton" value="Add" />
        </form>
        </script>

        <script type="text/x-handlebars" id="index">
            <tbody>
            {{#each item in model}}
                <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td><input {{action "remove" item.id}} type="button" value="Delete" /></td>
                </tr>
            {{/each}}
            </tbody>
        </script>
    </body>
</html>
