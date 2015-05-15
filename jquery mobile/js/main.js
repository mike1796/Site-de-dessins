$(document).ready(function () { 
   /* Appel AJAX pour vérifier si on est connecté ou pas
    * - si on est connecté, afficher le bouton déconnexion
    * - sinon afficher le formulaire de connexion
    */
	
	is_connected();
    
	$('#menuDeroulant').click(function() {
		$(this).next('div').fadeToggle();
	});
	$('#switchToPc').click(function() {
		window.location = '../index.php';
	})
	$('#toIndex').click(is_connected);
										
});

function is_connected() {
	$.ajax({
        url: 'is_connected.php',
        type: 'GET',
        success: function(data) {
            if (data.success) {
                creerBoutonDeconnexion(data.pseudo);
				if (window.location.hash == "") {
                    $("div[data-role='content']").empty();
					creerBoutonForm();
					chargerDessins();
				}
				if (window.location.hash == "#Modif") {
					$("div[data-role='content']").empty();
					creerFormModifProfil();
				}
            } else {
                creerFormulaireConnexion();
				if ($("div[data-role='page']").attr('id') == "index") {
					chargerDessins();
				}
			}
        }
    });
}

function Inscription() {
    $('#form-connexion').fadeOut();
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
                    .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                    .append(
                        $('<input>')
                            .attr('name', "pseudo")
                            .attr('class', "form-control")
                            .attr('type', "text")
                            .attr('placeholder', "Pseudo")
                    ),
                $('<div>')
                    .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                    .append(
                        $('<input>')
                            .attr('name', "email")
                            .attr('class', "form-control")
                            .attr('type', "text")
                            .attr('placeholder', "Email")
                    ),
                $('<div>')
                    .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                    .append(
                        $('<input>')
                            .attr('name', "mdp")
                            .attr('class', "form-control")
                            .attr('type', "password")
                            .attr('placeholder', "Mot de passe")
                    ),
                $('<div>')
                    .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                    .append(
                        $('<input>')
                            .attr('name', "confirmMDP")
                            .attr('class', "form-control")
                            .attr('type', "password")
                            .attr('placeholder', "Confirmation mot de passe")
                    ),
				$('<div>')
					.append(
						$('<button>')
							.attr('type', "submit")
							.attr('class', "ui-btn ui-corner-all")
							.html('inscription')
							.css({
								'width' : '100%'
							})
					),
                $('<a>')
                    .attr('id', "inscription")
                    .attr('href', "#")
                    .html('Se connecter')
                    .click(function () {
                        $('.navbar-header').fadeIn();
                        $('#formIns').fadeOut(function () {
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
            .attr('class', "ui-btn ui-corner-all")
            .html("Deconnexion")
			.css({
				'float' : 'right',
				'margin-top' : '-5px'
			})
            .click(Deconnexion)
            .hide();

    var pseudoH1 = 
        $('<a>')
            .attr('id', 'pseudo')
            .attr('href', "#Modif")
            .html(pseudo)
			.click(is_connected);
    $('#navbar')    
		.empty()
        .append(
            pseudoH1,
			btn
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
			if ($("div[data-role='page']").attr('id') == "Modif") {
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
                    .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                    .append(
                        $('<input>')
                            .attr('name', "pseudo")
                            .attr('class', "form-control")
                            .attr('type', "text")
                            .attr('placeholder', "Pseudo")
                    ),
                $('<div>')
                    .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                    .append(
                        $('<input>')
                            .attr('name', "mdp")
                            .attr('class', "form-control")
                            .attr('type', "password")
                            .attr('placeholder', "Mot de passe")
                    ),
				$('<div>')
					.append(
						$('<button>')
							.attr('class', "ui-corner-all ui-btn")
							.attr('type', "submit")
							.html('Connexion')
							.css({
								'width' : '100%'
							})
					),
                $('<a>')
                    .attr('id', "inscription")
                    .attr('href', "#")
                    .html('S\'inscrire')
                    .click(function () {
                        $('.navbar-header').fadeOut();
                        creerFormulaireInscription();
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
                    .html("Vous êtes bien inscrit pouvez maintenant poste des dessins");
            } else {
                $('#resultat')
                    .css({
                       'color': 'rgb(255, 0, 0)'
                    })
                    .html(data.message);
                $('#form-connexion').fadeIn();
            }
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
                if ($("div[data-role='page']").attr('id') == "index") {
					$("div[data-role='content']").empty();
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
    $("div[data-role='content']")
        .append(
            $('<div>')
                .attr('id', 'bouton-form')
                .attr('role', 'group')
                .append(
                    $('<div>')
                        .attr('role', 'group')
                        .append(
                            $('<button>')
								.attr('class', 'ui-btn')
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
    $("div[data-role='content']")
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
                                .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow")
                                .append(
                                    $('<input>')
                                        .attr('name', "url")
                                        .attr('type', "text")
                                        .attr('placeholder', "URL")                       
                                ),
                            $('<div>')
                                .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                                .append(
                                    $('<input>')
                                        .attr('name', "titre")
                                        .attr('type', "text")
                                        .attr('placeholder', "Titre")
                                ),
                            $('<div>')
                                .attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset")
                                .append(
                                    $('<input>')
                                        .attr('name', "comm")
                                        .attr('type', "text")
                                        .attr('placeholder', "Commentaire")
                                ),
                            $('<div>')
                                .attr('class', "ui-body-inherit ui-corner-all ui-shadow-inset")
                                .append(
                                    $('<button>')
                                        .attr('type', "submit")
                                        .attr('class', "ui-btn ui-corner-all")
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
			$("div[data-role='content']").empty();
            creerDivResultat(data.message, data.success);
			creerBoutonForm();
            chargerDessins();
        }
    });
}

function creerDivResultat(text, success) {
	
	$("div[data-role='content']")
        .append(
            $('<div>')
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

    $.ajax({
        url: 'chargerDessins.php',
        type: 'GET',
        success: function(data) {
			for (var i in data) {
				$("div[data-role='content']")
					.append(
						$('<div>')
							.attr('class', 'divDessins')
							.append(
								$('<div>')
									.attr('class', 'titreDessins')
									.append(
										$('<h2>')
											.html(data[i].titre),
										$('<h3>')
											.html(data[i].comm)
									),
								$('<img>')
									.attr('src', data[i].url)
									.attr('width', '90%')
									.attr('height', '500px')
									.css({
										'margin-left' : '4%'
									}),
								$('<br>'),
								$('<span>')
									.html("Proposer par : " + data[i].pseudo),
								'&nbsp;',
								$('<a>')
									.click(function () {
										$(this).next('div').fadeToggle();
										$(this).data('toggled', !$(this).data('toggled'));
										$(this).html($(this).data('toggled') ? 'Cacher les commentaires' : 'Voir les commentaires')
									})
									.html('Voir les commentaires')
									.css({
										'float': 'right'
									}),
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
										$('<div>')
											.attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow")
											.append(
												$('<input>')
													.attr('name', "comm")
													.attr('id', "inputVal")
													.attr('class', "ui-input-text ui-body-inherit ui-corner-all ui-shadow")
													.attr('type', 'text')
													.attr('placeholder', 'Ecrire un commentaire')
											),
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
								'margin-top' : '50px'
							})
					)
					chargerComm(data[i].id_dessins);
			}
        }
    });
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
							.html('Poster par ' + data[i].pseudo + ' : ' + data[i].comm),
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
			$("div[data-role='content']")
				.append(
					$('<div>')
						.append(
							$('<h2>').html('Vous pouvez modifie votre profil'),			
							$('<form>')
								.attr('id', 'formModif')
								.attr('class', 'formPage')
								.attr('action', 'modifProfil.php')
								.attr('method', 'POST')
								.append(
									$('<div>')
										.attr('class', 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset')
										.append(
											$('<input>')
												.attr('name', 'pseudo')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Pseudo')
												.attr('value', data.pseudo)
										),
									$('<div>')
										.attr('class', 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset')
										.append(
											$('<input>')
												.attr('name', 'email')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Email')
												.attr('value', data.email)
										),
									$('<div>')
										.attr('class', 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset')
										.append(
											$('<input>')
												.attr('name', 'nom')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Nom')
												.attr('value', data.nom)
										),
									$('<div>')
										.attr('class', 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset')
										.append(
											$('<input>')
												.attr('name', 'prenom')
												.attr('class', 'form-control')
												.attr('type', 'text')
												.attr('placeholder', 'Prenom')
												.attr('value', data.prenom)
										),
									$('<div>')
										.attr('class', 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset')
										.append(
											$('<input>')
												.attr('name', 'mdp')
												.attr('class', 'form-control')
												.attr('type', 'password')
												.attr('placeholder', 'Mot de passe')
										),
									$('<div>')
										.attr('class', 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset')
										.append(
											$('<input>')
												.attr('name', 'mdpConfirm')
												.attr('class', 'form-control')
												.attr('type', 'password')
												.attr('placeholder', 'Confirmation mot de passe')
										),
									$('<input>')
										.attr('name', 'id_user')
										.attr('class', 'form-control')
										.attr('type', 'hidden')
										.attr('value', data.id_user),
									$('<div>')
										.append(
											$('<button>')
												.attr('type', "submit")
												.attr('class', "ui-btn ui-corner-all")
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
				$("div[data-role='content']").empty();
				creerFormModifProfil();
			}
			creerDivResModif(data.success, data.message);
		}
	});
}

function creerDivResModif(success, message) {
	if (success) {
		$("div[data-role='content']")
			.append(
				$('<div>')
					.css({
						'color' : 'rgb(0, 255, 0)',
						'font-size' : '20px'
					})
					.html(message)
			)
	} else {
		$("div[data-role='content']")
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
	$("div[data-role='content']")
			.empty()
			.append(
				$('<h2>')
					.css({
						'color' : 'rgb(255, 0, 0)'
					})
					.html("Vous n'êtes pas connecté vous ne pouvez pas modifié votre profil")
			)
}