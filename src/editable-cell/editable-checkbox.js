angular
	.module('treeGrid')
	.component('editableCheckbox', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/editable-checkbox.html',
		controllerAs: 'vm',
		bindings: {
			value: '=',
			isInEditMode: '=',
			saveValue: '&'
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