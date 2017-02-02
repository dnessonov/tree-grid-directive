require('./editable-input');
require('./editable-checkbox');
require('./editable-select');

angular
	.module('treeGrid')
	.component('editableCell', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/editable-cell.html',
		controllerAs: 'vm',
		bindings: {
			value: '=',
			type: '=',
			onSave: '&',
			options: '='
		},
		controller: function ($scope, $window, $timeout, $compile, $element) {
			var vm = this;

			vm.cellValue = vm.value;

			$scope.isInEditMode = false;

			vm.clickOnCell = function (){
				if (!$scope.isInEditMode) {
					$scope.isInEditMode = true;
					$window.onclick = function (event) {
						closeSearchWhenClickingElsewhere(event, $scope);
					};
				}
			}

			$scope.saveValue = function(newValue){
				$timeout(function() {
					$scope.isInEditMode = false;
				}, 0);
				$window.onclick = null;
				vm.onSave({'newValue': newValue});
			}

			closeSearchWhenClickingElsewhere = function(event, $scope) {

				var clickedElement = event.target;
				if (!clickedElement) return;

				var elementClasses = clickedElement.classList;
				var clickedOnSearchDrawer = elementClasses.contains('tree-greed-directive-non-editable-cell-element')
					|| elementClasses.contains('tree-greed-directive-editable-cell-element')
					|| elementClasses.contains('tree-greed-directive-editable-cell-control');

				if (!clickedOnSearchDrawer) {
					$scope.isInEditMode = false;
					$window.onclick = null;
					$scope.$apply();
				}

			}

			$scope.$watch('vm.value', function(newValue, oldValue){
				vm.cellValue = newValue;
			}, true);

			this.$onInit = function() {
				var containerId = 'tree-greed-directive-editable-cell-wrap';
				if (vm.type === 'text'){
					var newDirective = angular.element('<editable-input value="vm.cellValue" is-in-edit-mode="isInEditMode" save-value="saveValue(newValue)" ></editable-input>');
					$element.children().append(newDirective);
					$compile(newDirective)($scope);
				}else if (vm.type === 'checkbox'){
					var newDirective = angular.element('<editable-checkbox value="vm.cellValue" is-in-edit-mode="isInEditMode" save-value="saveValue(newValue)" ></editable-checkbox>');
					$element.children().append(newDirective);
					$compile(newDirective)($scope);
				}else if (vm.type === 'select'){
					var newDirective = angular.element('<editable-select options="vm.options" value="vm.cellValue" is-in-edit-mode="isInEditMode" save-value="saveValue(newValue)" ></editable-select>');
					$element.children().append(newDirective);
					$compile(newDirective)($scope);
				}

			};
		}
	});