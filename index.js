
var phonecat = angular.module('phonecat',[]);


phonecat.controller('CartController',function($scope)
	{
		$scope.items= 
		[
         {title:'Riccola',quantity:8,price:56.8},
         {title:'Tomato',quantity:4,price:67.56},
         {title:'Table',quantity:18,price:6.1},
         {title:'Chaire',quantity:13,price:8.2},
         {title:'Cart',quantity:8,price:56.8},
         {title:'Ball',quantity:8,price:56.8},
         {title:'Guitar',quantity:8,price:56.8}
		]

		$scope.remove= function(index)
		{
			$scope.items.splice(index,1);
		}
	});