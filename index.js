$(document).ready(function() {
    $("#searchLink").click(showRepositories);

	function showRepositories()
    {
      if($("#username").val().length === 0){
        alert("You must write username into the textbox!")
      }else{
        var textField = $("#username").val();
		$("#results").empty();
        $.get('https://api.github.com/users/'+textField+'/repos',function(data){
           var content = "";
		   for(var i = 0; i < data.length; i++)
		   {
			 content += "<div class='card border-primary mb-3'><img class='card-img-top' src="+data[i].owner.avatar_url+"><div class='card-body'><h5 class='card-title'>"+data[i].name+"</h5><p class='card-text'>"
			 +data[i].description+"</p><a href="+data[i].html_url+" class='card-link'>"+data[i].name+"</a><p>Login: "
			 +data[i].owner.login+"</p><a href="+data[i].owner.html_url+" class='card-link'>"
			 +data[i].owner.html_url+"</a><br><a href='#' class='card-link showCom' data-repository="+data[i].name+" data-username="+data[i].owner.login+">Show Commits</button></div></div>";
		   }
		   $("#results").append(content);
		   $(".showCom").click(showCommits);
        }).fail(displayError);
      }
    }

    function displayError(error)
    {
      $("#errors").append("I'm sorry, there's been an error. Please try again.");
    }

	function showCommits()
	{
		var el = $(this);
		var username = el.attr('data-username');
		var repository = el.attr('data-repository');

		$("#details").empty();

		$.get('https://api.github.com/repos/'+username+'/'+repository+'/commits',function(data){
			var content = "";
		   for(var i = 0; i < data.length; i++)
		   {
			 content += "<div class='card border-primary mb-3'><img class='card-img-top' src="+data[i].author.avatar_url+"><div class='card-body'><h5 class='card-title'>Login: "+data[i].author.login+"</h5><p class='card-text'>Name: "
			 +data[i].commit.author.name+"</p><p class='card-text'>SHA: "+data[i].sha+"</p></div></div>";
		   }
			$("#details").append(content);
		}).fail(displayError);
	}
});
//octocat
//    $.get('https://api.github.com/users/octocat/repos',function(data){

//    }).fail(function(error){

//    });
