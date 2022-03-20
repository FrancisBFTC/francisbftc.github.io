
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style/main.css">
	
	<!-- Responsividade -->
	<link rel="stylesheet" href="style/responsive.css">

	<!-- Owl CSS -->
	<link rel="stylesheet" href="style/owl/owl.carousel.min.css">
	<link rel="stylesheet" href="style/owl/owl.theme.default.min.css">
	<title>Kiddie Games</title>
</head>
<body>
	<!-- Cabeçalho da Página com um container e menu de navegação -->
	<header>
		<div class="container">
			<h2 class="logo">KiddieGames</h2>
			<nav>
				<a href="#inicio-menu" id="begin" class="inicio-menu" onclick="setColorSelected('begin')">Inicio</a>
				<a href="#jogos-menu" id="jogos" class="jogos-menu" onclick="setColorSelected('jogos')">Jogos</a>
			</nav>
		</div>
	</header>

	<!-- Imagem de fundo do filme, título e sinopse -->
	<main id="inicio-menu">
		<div class="div-descricao">
			<div class="container">
				<p class="descricao">Encontre aqui os jogos mais divertidos da Kiddie Games! Aqui voçê escolhe
				uma renca de opções de jogos, incluindo: raciocínio lógico, guerra, terror e por aí vai.. :D
			 	O site ainda está em tempo de implementação! Aguarde novidades!</p>
			</div>
		</div>
	</main>

	<section id="jogos-menu">
		<div class="carrosel-jogos">
			<h2 class="title-games">Jogos 2D Divertidos</h2>
			<div class="owl-carousel owl-theme" id="jogos_2d">
				
			</div>
		</div>
	</section>

		<script src="js/main.js"></script>

		<script src="https://kit.fontawesome.com/7116b65fd7.js" crossorigin="anonymous"></script>
		<script src="js/owl/jquery.min.js"></script>
		<script src="js/owl/owl.carousel.min.js"></script>
		<script src="js/setup.js"></script>
