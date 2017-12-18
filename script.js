$(function() {
    /*******      GET/READ     */
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/persons',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.persons.forEach(function(person) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">' + person.id + '</td>\
                        <td><input type="text" class="name" value="' + person.name + '"></td>\
                        <td>\
                            <button class="update-button">UPDATE/PUT</button>\
                            <button class="delete-button">DELETE</button>\
                        </td>\
                    </tr>\
                ');
                })
            }
        });
    });

    /*********           POST/CREATE  */
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/persons',
            method: 'POST',
            contentType: 'application/json',
            data : JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        })
    });

    /**********       PUT/UPDATE      */
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/persons/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({newName : newName}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    /**********         DELETE  */
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/persons/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

});    