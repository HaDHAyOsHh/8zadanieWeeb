function saveLocalStorage() {
    localStorage.setItem("name", $("#name").val());
    localStorage.setItem("email", $("#email").val());
    localStorage.setItem("message", $("#message").val());
    localStorage.setItem("policy", $("#policy").prop("checked"));
}

function loadLocalStorage() {
    if (localStorage.getItem("name") !== null)
        $("#name").val(localStorage.getItem("name"));
    if (localStorage.getItem("email") !== null)
        $("#email").val(localStorage.getItem("email"));
    if (localStorage.getItem("message") !== null)
        $("#message").val(localStorage.getItem("message"));
    if (localStorage.getItem("policy") !== null) {
        $("#policy").prop("checked", localStorage.getItem("policy") === "true");
        if ($("#policy").prop("checked"))
            $("#sendButton").removeAttr("disabled");
    }
}
function clear() {
    localStorage.clear()
    $("#name").val("");
    $("#email").val("");
    $("#message").val("");
    $("#policy").val(false);
}

$(document).ready(function() {
    loadLocalStorage();
    $("#openButton").click(function() {
        $(".fixed-overlay").css("display", "flex");
        history.pushState(true, "", "./form");
    });
    $("#closeButton").click(function() {
        $(".fixed-overlay").css("display", "none");
        history.pushState(false, "", ".");
    });
    $("#form").submit(function(e) {
        e.preventDefault();
        $(".fixed-overlay").css("display", "none");
        let data =  $(this).serialize();
        let name;
        if ($('#name').val() !== '') name = $('#name').val();
        else name = 'user';
        let email;
        if ($('#email').val() !== '') email = $('#email').val();
        else email = 'none';
        let message;
        if ($('#message').val() !== '') msg = $('#message').val();
        else message = 'none';
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://formcarry.com/s/LCsTw0edD-",
            data: data,
            success: function(response){
                if(response.status === "success"){
                    alert("Спасибо, что оставили свои данные.");
                    clear();
                } else {
                    alert("Произошла ошибка: " + response.status);
                }
            }
        });
    });
    $("#policy").change(function() {
        if(this.checked)
            $("#sendButton").removeAttr("disabled");
        else
            $("#sendButton").attr("disabled", "");
    })
    $("#form").change(saveLocalStorage);

    window.onpopstate = function(event) {
        if (event.state)
            $(".fixed-overlay").css("display", "flex");
        else
            $(".fixed-overlay").css("display", "none");
    };
})
