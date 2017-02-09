angular
	.module('treeGrid')
	.component('editableSelect', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/editable-select.html',
		controllerAs: 'vm',
		bindings: {
			value: '=',
			editValue: '=',
			isInEditMode: '=',
			saveValue: '&',
			options: '=',
		},
		controller: function ($scope, $window) {
			var vm = this;
		}
	});