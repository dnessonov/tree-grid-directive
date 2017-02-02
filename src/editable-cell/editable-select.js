angular
	.module('treeGrid')
	.component('editableSelect', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/editable-select.html',
		controllerAs: 'vm',
		bindings: {
			value: '=',
			isInEditMode: '=',
			saveValue: '&',
			options: '=',
		},
		controller: function ($scope, $window) {
			var vm = this;

			vm.localValue = vm.value;

			$scope.$watch('vm.value', function(newValue, oldValue){
				vm.localValue = newValue;
			}, true);

			$scope.saveValue = function(){
				vm.saveValue({'newValue': vm.localValue});
				vm.localValue = vm.value;
			}
		}
	});