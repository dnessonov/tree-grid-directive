angular
	.module('treeGrid')
	.component('editRowPosition', {
		templateUrl: 'node_modules/angular-bootstrap-grid-tree/src/editable-cell/edit-row-position.html',
		controllerAs: 'vm',
		bindings: {
			isInEditMode: '=',
			updateRow: '&',
			treeRows: '=',
			row: '=',
			field: '='
		},
		controller: function ($scope, $window) {
			var vm = this;

			vm.localSelectValues = [];

			$scope.saveValueLocal = function(){
				vm.updateRow({'parentId': vm.localValue});
				//vm.localValue = vm.value;
			}

			$scope.$watch('vm.treeRows', function(newValue, oldValue){
				if (vm.localSelectValues.length > 0){
					vm.localSelectValues = [];
				}
				vm.initSelectValues(newValue);
			}, true);

			vm.initSelectValues = function(arr){
				var idsToExclude = [vm.row.branch.uid];
				for (var i = 0; i < arr.length; i++){
					if ( idsToExclude.indexOf(arr[i].branch.uid) !== -1 ){
						continue;
					}

					if ( arr[i].branch.parent_uid && idsToExclude.indexOf(arr[i].branch.parent_uid) !== -1 ){
						idsToExclude.push(arr[i].branch.uid);
						continue;
					}

					vm.localSelectValues.push({value: arr[i].branch.uid, text: arr[i].branch[vm.field]});
				}
			}

			this.$onInit = function() {
				//initSelectValues();
			}
		}
	});