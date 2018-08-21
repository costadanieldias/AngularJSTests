angular.module('app', [])
.controller('myController', [
		'$scope','$http',
  	function($scope, $http) {
				$scope.procura = function(input) {
						def.innerHTML = '';
					  $scope.model.msg = 'Aguarde...';
						var url = 'http://dicionario-aberto.net/search-json/' + $scope.model.palavra;
						$http.get(url)
						.then(getRetornoPesquisa, getErroPesquisa);      
				}
				
				function getRetornoPesquisa(response) {
						console.log(response);
						$scope.model.msg = null;
						if(typeof response.data.superEntry === 'undefined') {
								def.innerHTML += 'Def.';
								for(i in response.data.entry.sense) {
										def.innerHTML += '<br>' + (response.data.entry.sense[i].def).replace(/_/g, '"');
								}
						} else {
								for(i in response.data.superEntry) {
										if(parseInt(i) === 0)
												def.innerHTML += 'Def.' + (parseInt(i)+1) + '<br>';
										else
												def.innerHTML += '<br><br>Def.' + (parseInt(i)+1) + '<br>';
										for(j in response.data.superEntry[i].entry.sense) {
												def.innerHTML += '<br>' + (response.data.superEntry[i].entry.sense[j].def).replace(/_/g, '"');
										}
								}
						}
				}

				function getErroPesquisa(error) {
						$scope.model.msg = 'Ocorreu um erro.';
						console.log(error);
				}
  	}
])
