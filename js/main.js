$(document).ready(function () { 
   /* Appel AJAX pour vérifier si on est connecté ou pas
    * - si on est connecté, afficher le bouton déconnexion
    * - sinon afficher le formulaire de connexion
    */
    $.ajax({
        url: 'is_connected.php',
        type: 'GET',
        success: function(data) {
            if (data.success) {
				creerBoutonDeconnexion(data.pseudo);
                if (window.location.pathname == "/index.php" || window.location.pathname == "/") {
					$('.col-md-10').hide();
					$('.col-md-10').empty();
					creerBoutonForm();
					chargerDessins();
				}
				if (window.location.pathname == "/profil.php") {
					creerFormModifProfil();
				}
            } else {
                creerFormulaireConnexion();
				if (window.location.pathname == "/index.php" || window.location.pathname == "/") {
					$('.col-md-10').hide();
					chargerDessins();
				}
			}
        }
    });
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 300) {
            $('#jumptotop').fadeIn();
        } else {
            $('#jumptotop').fadeOut();
        }
	});
	$('#jumptotop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 300);
		return false;
	});
});

function creerFormulaireInscription() {
    $('#formIns').remove();
    $('.navbar-header').fadeOut();  
    var formIns = 
        $('<form>')
            .attr('id', "formIns")
            .attr('method', "POST")
            .attr('action', "inscription.php")
            .attr('class', "navbar-form")
            .attr('role', "form")
            .append(
                $('<div>')
                    .attr('class', "form-group")
                    .append(
                        $('<input>')
                            .attr('name', "pseudo")
                            .attr('class', "form-control")
                            .attr('type', "text")
                            .attr('placeholder', "Pseudo")
                    ),
                '&nbsp;',
                $('<div>')
                    .attr('class', "form-group")
                    .append(
                        $('<input>')
                            .attr('name', "email")
                            .attr('class', "form-control")
                            .attr('type', "text")
                            .attr('placeholder', "Email")
                    ),
                '&nbsp;',
                $('<div>')
                    .attr('class', "form-group")
                    .append(
                        $('<input>')
                            .attr('name', "mdp")
                            .attr('class', "form-control")
                            .attr('type', "password")
                            .attr('placeholder', "Mot de passe")
                    ),
                '&nbsp;',
                $('<div>')
                    .attr('class', "form-group")
                    .append(
                        $('<input>')
                            .attr('name', "confirmMDP")
                            .attr('class', "form-control")
                            .attr('type', "password")
                            .attr('placeholder', "Confirmation mot de passe")
                    ),
                '&nbsp;',
                $('<button>')
                    .attr('type', "submit")
                    .attr('class', "btn btn-success")
                    .html('inscription'),
                '&nbsp;',
                $('<a>')
                    .attr('id', "inscription")
					.attr('class', "btn btn-success")
                    .attr('href', "#")
                    .html('Se connecter')
                    .click(function () {
                        $('#formIns').fadeOut(function () {
                            $('.navbar-header').fadeIn();
							creerFormulaireConnexion();
                        });
                    })
            )
            .submit(function() {
                var donnees = $(this).serialize();
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).fadeOut(function() {
                    $(this).find(':input').removeAttr('disabled');
                    Inscription($(this), donnees);
                });
                return false;
            });
    $('#navbar').append(formIns);
}

function creerBoutonDeconnexion(pseudo) {
    $('#proposDess').fadeIn();

    var btn = 
        $('<button>')
            .attr('id', "btn-deconnexion")
            .attr('class', "btn btn-danger navbar-right")
            .attr('aria-hidden', "true")
            .html("Deconnexion")
            .click(Deconnexion)
            .hide();

    var pseudoH1 = 
        $('<a>')
            .attr('id', 'pseudo')
            .attr('class', "navbar-header navbar-right")
            .attr('href', "profil.php")
            .html(pseudo);
    $('#navbar')    
        .append(
            btn,
            pseudoH1
        );

    pseudoH1.fadeIn('slow');
    btn.fadeIn('slow');

    
}

function Deconnexion() {
    $.ajax({
        url: 'deconnexion.php',
        type: 'GET',
        success: function(data) {
            $('#bouton-form').remove();
            $('#btn-deconnexion').remove();
            $('#pseudo').remove();
            $('.formPage').remove();
            $('#resultat').empty();
            $('#proposDess').fadeOut();
            creerFormulaireConnexion();
			if (window.location.pathname == "/profil.php") {
				creerDivErreurModif();
			}
        },
        error: function() {
            alert('ERREUR');
        }
    });    
}



function creerFormulaireConnexion() {
    $('#form-connexion').remove();
    $('#formIns').remove();
    $('#navbar').append(
        $('<form>')
            .attr('id', "form-connexion")
            .attr('method', "POST")
            .attr('action', "connexion.php")
            .attr('class', "navbar-form navbar-right")
            .attr('role', "form")
            .append(
                $('<div>')
                    .attr('class', "form-group")
                    .append(
                        $('<input>')
                            .attr('name', "pseudo")
                            .attr('class', "form-control")
                            .attr('type', "text")
                            .attr('placeholder', "Pseudo")
                    ),
                '&nbsp;',
                $('<div>')
                    .attr('class', "form-group")
                    .append(
                        $('<input>')
                            .attr('name', "mdp")
                            .attr('class', "form-control")
                            .attr('type', "password")
                            .attr('placeholder', "Mot de passe")
                    ),
                '&nbsp;',
                $('<button>')
                    .attr('type', "submit")
                    .attr('class', "btn btn-success")
                    .html('Connexion'),
                '&nbsp;',
                $('<a>')
                    .attr('id', "inscription")
                    .attr('href', "#")
					.attr('class', "btn btn-success")
                    .html('S\'inscrire')
                    .click(function () {
						$('.navbar-header').fadeOut();
						$('#form-connexion').fadeOut(function() {
							creerFormulaireInscription();
						});
                    })
            )
            .submit(function() {
                var donnees = $(this).serialize();
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).fadeOut(function() {
                    $(this).find(':input').removeAttr('disabled');
                    Connexion($(this), donnees);
                });
                return false;
            })
     );
}

function Inscription(form, donnees) {
    $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: donnees,
        success: function(data) {
            if(data.success) {
                creerBoutonDeconnexion(data.message);
                $('#resultat')
                    .css({
                       'color': 'rgb(0, 255, 0)'
                    })
                    .html("Vous êtes bien inscrit vous pouvez maintenant posté des dessins");
            } else {
                $('#resultat')
                    .css({
                       'color': 'rgb(255, 0, 0)'
                    })
                    .html(data.message);
                $('#form-connexion').fadeIn();
			}
			$('.navbar-header').fadeIn();
        },
        error: function () {
            alert('ERREUR');
            $('#form-connexion').fadeIn();
        }
    })
}

function Connexion(form, donnees, onSuccess) {
	$.ajax({
		url: form.attr('action'),
		type: form.attr('method'),
		data: donnees,
		success: function (data) {
             if(data.success) {
                creerBoutonDeconnexion(data.message);
                $('#resultat')
                    .css({
                       'color': 'rgb(0, 255, 0)'
                    })
                    .html("Vous êtes connecté vous pouvez maintenant posté des dessins");
                if (window.location.pathname == "/index.php" || window.location.pathname == "/") {
					$('.col-md-10').empty();
                    creerBoutonForm();
                    chargerDessins();
                }
            } else {
                $('#resultat')
                    .css({
                       'color': 'rgb(255, 0, 0)'
                    })
                    .html(data.message);
                $('#form-connexion').fadeIn();
            }
        },
		error: function() {
			alert('ERREUR');
			$('#form-connexion').fadeIn();
		}
	});
}


/*********************** INDEX.PHP *************************/


function creerBoutonForm() {
    $('.col-md-10')
        .append(
            $('<div>')
                .attr('id', 'bouton-form')
                .attr('class', 'btn-group btn-group-justified')
                .attr('role', 'group')
                .append(
                    $('<div>')
                        .attr('class', 'btn-group')
                        .attr('role', 'group')
                        .append(
                            $('<button>')
								.attr('class', 'btn btn-default')
								.attr('type', 'button')
								.html("Proposer un dessin")
								.click(function () {
									$(this).fadeOut();
									creerFormulaireDessins();
								})
                        )
                
                )
        );
}

function creerFormulaireDessins() {
    $('#bouton-form').fadeOut();
    $('.col-md-10')
		.empty()
        .append(
            $('<div>')
                .attr('id', 'divFormDessin')
                .append(
                    $('<form>')
                        .attr('id', 'formDessin')
                        .attr('class', 'formPage')
                        .attr('action', 'enregistrerDessins.php')
                        .attr('method', "POST")
                        .append(
                            $('<div>')
                                .attr('class', "form-group")
                                .append(
                                    $('<input>')
                                        .attr('name', "url")
                                        .attr('class', "form-control")
                                        .attr('type', "text")
                                        .attr('placeholder', "URL")                       
                                ),
                            $('<div>')
                                .attr('class', "form-group")
                                .append(
                                    $('<input>')
                                        .attr('name', "titre")
                                        .attr('class', "form-control")
                                        .attr('type', "text")
                                        .attr('placeholder', "Titre")
                                ),
                            $('<div>')
                                .attr('class', "form-group")
                                .append(
                                    $('<input>')
                                        .attr('name', "comm")
                                        .attr('class', "form-control")
                                        .attr('type', "text")
                                        .attr('placeholder', "Commentaire")
                                ),
                            $('<div>')
                                .attr('class', "form-group")
                                .append(
                                    $('<button>')
                                        .attr('type', "submit")
                                        .attr('class', "btn btn-success")
                                        .html('Poster')
                                )

                        )
                        .submit(function() {
                            var donnees = $(this).serialize();
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).fadeOut(function() {
                                $(this).find(':input').removeAttr('disabled');
                                enregistrerDessins($(this), donnees);
                            });
                            return false;
                        })
                )
        );
	chargerDessins();
}

function enregistrerDessins(form, donnees) {
    $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: donnees,
        success: function(data) {
            if (data.success) {
                $('#divFormDessin').fadeOut();
                $('#bouton-form').fadeIn();
            } else {
                $('#formDessin').fadeIn();
            }
			$('.col-md-10').empty();
            creerDivResultat(data.message, data.success);
			creerBoutonForm();
            chargerDessins();
        }
    });
}

function creerDivResultat(text, success) {
	
	$('.col-md-10')
        .append(
            $('<p>')
				.attr('id', 'divResultat')
                .html(text)
        );
	if (success) {
		$('#divResultat')
			.css({
				'color': 'rgb(0, 255, 0)'
            })
	} else {
		$('#divResultat')
			.css({
				'color': 'rgb(255, 0, 0)'
            })
	}
}

function chargerDessins() {
	$('.row')
		.append(
			$('<div>')
				.attr('id', "divChargement")
				.append(
					$('<img>')
						.attr('src', 'gif-chargement.gif')
				)
				.css({
					'text-align' : 'center',
					'margin-right' : '7%'
				})
		)
    $.ajax({
        url: 'chargerDessins.php',
        type: 'GET',
        success: function(data) {
			for (var i in data) {
				$('.col-md-10')
					.append(
						$('<div>')
							.attr('class', 'divDessins')
							.append(
								$('<div>')
									.attr('class', 'titreDessins')
									.append(
										$('<h2>')
											.attr('class', 'titreDessins')
											.html(data[i].titre)
											.css({
												'color' : '#ce4844'
											}),
										$('<h3>')
											.css({
												'color' : '#399AAF'
											})
											.html(data[i].comm)
									),
								$('<img>')
									.attr('src', data[i].url)
									.attr('width', '90%')
									.attr('height', '500px')
									.css({
										'margin-left' : '4%'
									}),
								$('<span>')
									.html("Proposer par : " + data[i].pseudo),
								'&nbsp;',
								$('<a>')
									.click(function () {
										$(this).next('div').fadeToggle();
										$(this).data('toggled', !$(this).data('toggled'));
										$(this).html($(this).data('toggled') ? 'Cacher les commentaires' : 'Voir les commentaires')
									})
									.html('Voir les commentaires'),
								$('<div>')
									.attr('id', data[i].id_dessins)
									.css({
										'display': 'none'
									}),
								$('<form>')
									.attr('class', 'formPage')
									.attr('action', 'enregistrerComm.php')
									.attr('method', "POST")
									.append(
										$('<input>')
											.attr('name', "comm")
											.attr('id', "inputVal")
											.attr('class', "form-control inputComm")
											.attr('type', 'text')
											.attr('placeholder', 'Ecrire un commentaire'),
										$('<input>')
											.attr('name', "iddes")
											.attr('type', "hidden")
											.attr('value', data[i].id_dessins)
									)
									.submit(function() {
										var donnees = $(this).serialize();
										$(this).find(':input').attr('disabled', 'disabled');
										$(this).fadeOut(function() {
											$(this).find(':input').removeAttr('disabled');
											enregistrerComm($(this), donnees, $(this).prev('div').attr('id'));
											$(this).find('#inputVal').val('');
											$(this).fadeIn();
										});
										return false;
									})
							)
							.css({
								'margin-top' : '50px',
								'background-color' : '#EFEFEF',
								'-webkit-border-radius' : '8px',
								'-moz-border-radius' : '8px',
								'border-radius' : '8px'
							})
					)
					chargerComm(data[i].id_dessins);
			}
        }
    });
	$('#divChargement').fadeOut();
	$('.col-md-10').fadeIn();
	$('#divChargement').remove();
}

function enregistrerComm(form, donnees, id_dessins) {
	$.ajax ({
        url: form.attr('action'),
        type: form.attr('method'),
        data: donnees,
		success: function(data) {
			chargerComm(id_dessins);
		}
	});
}

function chargerComm(donnees) {
	$.ajax({
		url: 'chargerComm.php',
		type: 'GET',
		data: 'id_dessins=' + donnees,
 		success: function(data) {
			$('#' + donnees).empty();
			for (var i in data) {
				$('#' + donnees)
					.append(
						$('<hr>'),
						$('<div>')
							.attr('class', 'divComm')
							.html('Posté par ' + data[i].pseudo + ' : ' + data[i].comm),
						$('<hr>')
					)
			}
		}
	})
}

function creerFormModifProfil() {
	$.ajax({
		url: 'valueProfil.php',
		type: 'GET',
		success: function(data) {
			$('.col-md-10')
				.append(
					$('<div>')
						.append(
							$('<h2>').html('Vous pouvez modifié votre profil'),			
							$('<form>')
								.attr('id', 'formModif')
								.attr('class', 'formPage')
								.attr('action', 'modifProfil.php')
								.attr('method', 'POST')
								.append(
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'pseudo')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Pseudo')
												.attr('value', data.pseudo)
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'email')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Email')
												.attr('value', data.email)
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'nom')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Nom')
												.attr('value', data.nom)
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'prenom')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Prenom')
												.attr('value', data.prenom)
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'mdp')
												.attr('class', 'form-control')
												.attr('type', 'password')
												.attr('placeholder', 'Mot de passe')
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'mdpConfirm')
												.attr('class', 'form-control')
												.attr('type', 'password')
												.attr('placeholder', 'Confirmation mot de passe')
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<input>')
												.attr('name', 'id_user')
												.attr('class', 'form-control')
												.attr('type', 'hidden')
												.attr('value', data.id_user)
										),
									$('<div>')
										.attr('class', 'form-group')
										.append(
											$('<button>')
												.attr('type', "submit")
												.attr('class', "btn btn-success")
												.html('Modifier')
										)
								)
								.submit(function() {
									var donnees = $(this).serialize();
									$(this).find(':input').attr('disabled', 'disabled');
									$(this).fadeOut(function() {
										$(this).find(':input').removeAttr('disabled');
										modifProfil($(this), donnees);
									});
									return false;
								})
						)
				);
		}
	})
}

function modifProfil(form, donnees) {

	$.ajax({
		url: 'modifProfil.php',
		type: 'POST',
		data: donnees,
 		success: function(data) {
			if (data.success) {			
				$('.col-md-10').empty();
				creerFormModifProfil();
			}
			creerDivResModif(data.success, data.message);
		}
	});
}

function creerDivResModif(success, message) {
	if (success) {
		$('.col-md-10')
			.append(
				$('<div>')
					.css({
						'color' : 'rgb(0, 255, 0)',
						'font-size' : '20px'
					})
					.html(message)
			)
	} else {
		$('.col-md-10')
			.append(
				$('<div>')
					.css({
						'color' : 'rgb(255, 0, 0)',
						'font-size' : '20px'
					})
					.html(message)
			)
	}
}

function creerDivErreurModif() {
	$('.col-md-10')
			.empty()
			.append(
				$('<h2>')
					.css({
						'color' : 'rgb(255, 0, 0)'
					})
					.html("Vous n'êtes pas connecté vous ne pouvez pas modifié votre profil")
			)
}