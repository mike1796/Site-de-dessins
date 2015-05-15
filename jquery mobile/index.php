<!DOCTYPE html>
<html>
<head>
	<title>Page Title</title>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Include jQuery Mobile stylesheets -->
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">

	<!-- Include the jQuery library -->
	<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
	<!-- Include the jQuery Mobile library -->
	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
	<script src="js/main.js"></script>
</head>
<body data-theme="a">

<!-- Start of first page -->
<div data-role="page" id="index">
	<div data-role="header" class="ui-header ui-bar-c" role="banner">
		<a id="switchToPc" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-c ui-icon-back">Aller sur la version PC</a>
		<h1 class="ui-title" role="heading" aria-level="1">Drawbook</h1>
		<a href="#"
		   id="menuDeroulant"
		   title="Barres" 
		   class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-c ui-icon-bars">
			<span class="ui-btn-inner">
				<span class="ui-btn-text">
					Barres
				</span>
				<span class="ui-icon ui-icon-bars ui-icon-shadow">
					&nbsp;
				</span>
			</span>
		</a>
		<div id="navbar" style="display:none; height:40px;">
			
		</div>		
	</div>
	<div data-role="content" class="ui-content jqm-content">
		
	</div>
	<div data-role="footer" style="text-align:center;">
		<div class="jqm-footer">
			<p>&copy; Company 2015 </p>
		</div>
	</div><!-- /footer -->
</div><!-- /page -->

<div data-role="page" id="Modif">
	<div data-role="header" class="ui-header ui-bar-c" role="banner">
		<a id="switchToPc" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-c ui-icon-back">Aller sur la version PC</a>
		<h1 class="ui-title" role="heading" aria-level="1"><a href="#index" id="toIndex">Drawbook</a></h1>
		<a href="#"
		   id="menuDeroulant"
		   title="Barres" 
		   class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-c ui-icon-bars">
			<span class="ui-btn-inner">
				<span class="ui-btn-text">
					Barres
				</span>
				<span class="ui-icon ui-icon-bars ui-icon-shadow">
					&nbsp;
				</span>
			</span>
		</a>
		<div id="navbar" style="display:none;"></div>		
	</div>
	<div data-role="content" class="ui-content jqm-content">
		
	</div>
	<div data-role="footer" style="text-align:center;">
		<div class="jqm-footer">
			<p>&copy; Company 2015 </p>
		</div>
	</div><!-- /footer -->
</div>

</body>