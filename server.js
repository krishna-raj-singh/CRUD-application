var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var persons = [
{    id:1,
     name: 'Kal El'
},
{
    id:2,
    name: 'Jor El'

}
];

var currentId = 2;

var PORT = process.env.PORT || 1000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/persons', function(req, res) {
    res.send({persons: persons});
});

app.post('/persons', function(req, res) {
    var personName = req.body.name;
    currentId++;

    persons.push({
        id: currentId,
        name: personName
    });
    res.send('Successfully created person!');
});

app.put('/persons/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;
    var found = false;

    persons.forEach(function(person, index) {
        if(!found && person.id === Number(id)) {
            person.name = newName;
        }
    });

    res.send('Succesfully updated person!');
})

app.delete('/persons/:id', function(req, res) {
    var id = req.params.id;
    var found = false;
    persons.forEach(function(person, index) {
        if(!found && person.id === Number(id)) {
            persons.splice(index, 1);  
        }
    });
    res.send("Successfully deleted entry")
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
})