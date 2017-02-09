angular
	.module('treeGrid')
	.component('editableInput', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/editable-input.html',
		controllerAs: 'vm',
		bindings: {
			value: '=',
			editValue: '=',
			isInEditMode: '=',
			saveValue: '&'
		},
		controller: function ($scope, $window) {
			var vm = this;
		}
	});