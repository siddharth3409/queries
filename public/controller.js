	angular.module('querySelector.controllers', []).
	controller("myCtrl", function($scope, $http ,$timeout,$document,APIservice) {
		$scope.searchQuery = "";
		$scope.listOfQueries = [];
		$scope.nodataFLag = false;
		$scope.errorMesage = false;
		$scope.sortFlag = false;
		$scope.mflag = false;
		$scope.message = null;
		$scope.sorting = false;
		var modal = document.getElementById('myModal');

		$scope.close= function() {
			$scope.mflag = false;
			// modal.style.display = "none";
		}

		$scope.modal =function (info){
			$scope.mflag = true;
			// modal.style.display = "block";
		}
		function getData(count){
			$scope.count = count;
			var url = "/queries?id="+ count;
			APIservice.getQueries(url).then(function (response) {
				if(response.data.constructor == Array){
					$scope.listOfQueries = $scope.listOfQueries.concat(response.data);
				}else{
					$scope.nodataFLag = true;
					$scope.message ="no more data";
					$scope.errorMesage = true;
					$timeout(function (){
						$scope.errorMesage = false;

					},3000)
				}    
			});
		}

		function postData(data){
			var url = "/update";

			APIservice.postQueries(url,data).then(function (response) {
				console.log(response.data);
				$scope.message ="Updated";
				$scope.errorMesage = true;
				$timeout(function (){
					$scope.errorMesage = false;
				},3000)

			});
		}
		function deleteData(id){
			var url = "/delete?id="+ id;

			APIservice.deleteQueries(url).then(function (response) {
				$scope.message ="Deleted";
				$scope.errorMesage = true;
				$timeout(function (){
					$scope.errorMesage = false;
				},3000)
				$scope.listOfQueries.splice(id,1);
			});
		}

		$scope.loadMore =  function (){
			if(!$scope.nodataFLag){
				getData(+$scope.count +10);
			}
		};

		$scope.sortValues = function (){
			$scope.sorting = true;

			if(!$scope.sortFlag){
				$scope.sortFlag = true;	
				$scope.listOfQueries.sort(function(a, b) {
					return a.Time_Taken - b.Time_Taken;
				});
			}else{
				$scope.sortFlag = false;	
				$scope.listOfQueries.sort(function(a, b) {
					return b.Time_Taken - a.Time_Taken;
				});
			}

		};

		$scope.deleteRow = function (index){
			deleteData(index);
			$scope.searchQuery = "";
		};

		$scope.add = function(){
			var data =  {
				"Status": "0",
				"Name": $scope.Name,
				"Command_Type": $scope.CommandT,
				"Command": $scope.Command,
				"Time_Taken": $scope.Time,
				"User": $scope.User
			}
			postData(data);
			$scope.mflag = false;


		}

		$document.bind('click', function(event){
			if (event.target == modal) {
				$scope.mflag = false;
			}
			$scope.$apply();
		});
		getData("10");

	});