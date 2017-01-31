require('./editable-input');
require('./editable-checkbox');

angular
	.module('treeGrid')
	.component('editableCell', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/editable-cell.html',
		controllerAs: 'vm',
		bindings: {
			value: '=',
			type: '=',
		},
		controller: function ($scope, $window, $timeout, $compile, $element) {
			var vm = this;

			$scope.isInEditMode = false;

			vm.clickOnCell = function (){
				if (!$scope.isInEditMode) {
					$scope.isInEditMode = true;
					$window.onclick = function (event) {
						closeSearchWhenClickingElsewhere(event, $scope);
					};
				}
			}

			$scope.saveValue = function(){
				console.log('save');
				$timeout(function() {
					$scope.isInEditMode = false;
				}, 0);
				$window.onclick = null;
			}

			closeSearchWhenClickingElsewhere = function(event, $scope) {

				var clickedElement = event.target;
				if (!clickedElement) return;

				var elementClasses = clickedElement.classList;
				var clickedOnSearchDrawer = elementClasses.contains('tree-greed-directive-non-editable-cell-element')
					|| elementClasses.contains('tree-greed-directive-editable-cell-element')
					|| elementClasses.contains('tree-greed-directive-editable-cell-control');

				console.log(clickedOnSearchDrawer);
				if (!clickedOnSearchDrawer) {
					$scope.isInEditMode = false;
					$window.onclick = null;
					$scope.$apply();
				}

			}

			this.$onInit = function() {
				var containerId = 'tree-greed-directive-editable-cell-wrap';
				console.log(vm.type);
				if (vm.type === 'text'){
					console.log(1);
					var newDirective = angular.element('<editable-input value="vm.value" is-in-edit-mode="isInEditMode" save-value="saveValue()" ></editable-input>');
					$element.children().append(newDirective);
					$compile(newDirective)($scope);
				}else if (vm.type === 'checkbox'){
					console.log(2);
					var newDirective = angular.element('<editable-checkbox value="vm.value" is-in-edit-mode="isInEditMode" save-value="saveValue()" ></editable-checkbox>');
					$element.children().append(newDirective);
					$compile(newDirective)($scope);
				}

			};
		}
	});