var $ = jQuery;
$(document).ready(function() {
    $('#login_form').submit(function(event) {
        event.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        
        if (!email || !password) {
            $('.error').html('Please fill in all fields.');
            return;
        }

        // Send an Ajax request to the PHP script
        $.ajax({
            url: './PHP/login.php',
            type: 'POST',
            data: { email: email, password: password },
            success: function(response) {
                if (response === "success") {
                    window.location.href = 'https://localhost/GUVI/profile.html';
                    $('#form')[0].reset(); 
                    $('.error').html(''); 
                    $('#message').text("Login successful!");
                } else {
                    console.log(response)
                    $('#message').text("Invalid email or password.");
                }
            },
            error: function() {
                $('#message').text("An error occurred while processing your request.");
            }
        });
    });
});

