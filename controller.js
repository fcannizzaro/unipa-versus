/**
 *  Unipa
 *
 * App controller
 */
var app = angular.module('unipa', []);

app.controller('ctrl', function($scope, $http) {

	$scope.list = {};
	$scope.prof = {};
	$scope.compare = {};
	$scope.active = {};
	$scope.view = 0;

	$scope.loadProf = function(id) {
		$http.get('json/' + id + '.json').success(function(data) {
			$scope.view = 1;
			$scope.prof = data;
			$scope.prof.materia = $scope.prof.materia.replace(/.*-[ ]+/g, "");
			adaptJSON($scope.prof);
		});
	}

	$http.get('json/list.json').success(function(data) {
		$scope.list = data;
	});

	$scope.getFoto = function(id) {
		return "http://www.unipa.it/system/modules/it.unipa.opencms.template.funzioni/elements/foto.jpg?type=PERSONA&id=" + (id || "154051")
	}

	$scope.getHeight = function(value) {
		return "height: " + (value || 0) + "%";
	}

	$scope.getWidth = function(value) {
		return "width: " + (value || 0) + "%";
	}

	$scope.getWidthM = function(value) {
		return "width: calc(" + (value || 0) + "% - " + (value > 90 ? "64" : "0") + "px)";
	}

	$scope.openChooser = function() {
		$scope.view = 2;
	}

	$scope.loadConfronto = function(id) {
		$http.get('json/' + id + '.json').success(function(data) {
			$scope.view = 3;
			$scope.compare = data;
			$scope.compare.materia = $scope.prof.materia.replace(/.*-[ ]+/g, "");
			adaptJSON($scope.compare);
		});
	}

	$scope.back = function() {
		$scope.view = 0;
	}

	$scope.getTitle = function() {
		var view = $scope.view;
		switch ($scope.view) {
			case 0:
				return "Seleziona una materia";
				break;
			case 1:
				return $scope.prof.docente;
				break;
			case 2:
				return "Confronta con";
				break;
			case 3:
				return "Confronto";
				break;
		}
	}

	function adaptJSON(json) {
		for (var section in json.domande)
			for (var question in $scope.prof.domande[section]) {
				var q = $scope.prof.domande[section][question];
				var res = 100 - (section == 'suggerimenti' ? (q.si + q.no) : (q.decisamente_si + q.decisamente_no + q.piu_no_che_si + q.piu_si_che_no));
				q.non_rispondo = res > 0 ? res.toFixed(2) : 0;
			}
	}

});
