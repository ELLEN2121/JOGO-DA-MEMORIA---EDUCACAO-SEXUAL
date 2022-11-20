var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";

var ImgSource = [ "https://i.pinimg.com/564x/7d/6e/4e/7d6e4e366661f932af7200f23af18a21.jpg", "https://i.pinimg.com/564x/c1/19/ca/c119ca354592e7f69b82b71cbf2d050b.jpg",     "https://i.pinimg.com/564x/24/76/6a/24766a3c721b48f47e32a737f0b087df.jpg",            "https://i.pinimg.com/564x/27/79/3e/27793e95923d39930c5f26f0f454139f.jpg",       "https://i.pinimg.com/564x/a5/fb/ee/a5fbee2bb4487ba6bb7ba1bf9b7896ea.jpg",   "https://i.pinimg.com/564x/1e/8c/d4/1e8cd409268bf48e945f3085233d79ba.jpg",       "https://i.pinimg.com/564x/87/cc/43/87cc433957f8e3a596dcb5754938d945.jpg",
"https://i.pinimg.com/564x/e4/1d/3f/e41d3f06d6d2cc157923ea37ff342966.jpg",  "https://i.pinimg.com/564x/b5/4c/f4/b54cf457d4dd8a726d6f8129352e7dfa.jpg",     "https://i.pinimg.com/564x/66/39/75/663975be189fa32a3b1abd42f05e092f.jpg",   "https://i.pinimg.com/564x/7d/f1/79/7df179eb660e014b442545423f6ef595.jpg",           "https://i.pinimg.com/564x/0f/d3/69/0fd369bafdb9da29ab0c128e13f723fd.jpg",               "https://i.pinimg.com/564x/ad/53/00/ad530025aa4e8d548778c413e4be1336.jpg",               "https://i.pinimg.com/564x/a2/7e/89/a27e89bfee9ded3634a80f9d7d78cec4.jpg",               "https://i.pinimg.com/564x/d4/f6/1e/d4f61e04957f624ecee57b3eb8a63da4.jpg",         "https://i.pinimg.com/564x/f5/81/6b/f5816b12996748464d44ac9b109c3051.jpg"
];

--> Muda posição apos reset
function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	--> Embaralha
function EmbaralhaCartas() {
	var TodasImagens = $(Source).children();
	var ImgEspecif = $(Source + " div:first-child");
	var ArrayImagens = new Array();

	for (var i = 0; i < TodasImagens.length; i++) {
		ArrayImagens[i] = $("#" + ImgEspecif.attr("id") + " img").attr("src");
		ImgEspecif = ImgEspecif.next();
	}
	
		ImgEspecif = $(Source + " div:first-child");
	
	for (var z = 0; z < TodasImagens.length; z++) {
	var RandomNumber = RandomFunction(0, ArrayImagens.length - 1);

		$("#" + ImgEspecif.attr("id") + " img").attr("src", ArrayImagens[RandomNumber]);
		ArrayImagens.splice(RandomNumber, 1);
		ImgEspecif = ImgEspecif.next();
	}
}
--> Reseta
function ResetGame() {
	EmbaralhaCartas();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}
-->Abre Carta
function AbreCarta() {
  -->pega valor de um atributo para o primeiro elemento no conjunto de elementos 
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", AbreCarta);
	
		$("#" + id + " img").slideDown();
    $("#" + id + " img").fadeOut(11000);
   --> $("#" + id + " img").dblclick(function(){
   --> $(this).hide(); slideToggle
--> });

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", AbreCarta)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", AbreCarta)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">Parabéns, você concluiu com </span>');
		}
	}
}
--> Instruçoes 
function Instrucoes(){
  $(location).attr('href', 'http://www.sitedesejado.com');
}
--> Main
$(function() {

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(AbreCarta);
	EmbaralhaCartas();
  
});