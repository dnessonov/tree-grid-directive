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

		}
	});