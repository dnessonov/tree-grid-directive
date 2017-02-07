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

			vm.localSelectValues = [{value: 'root', text: 'Root Level'}];
			vm.localSelectChildrenValues = [];

			$scope.saveValueLocal = function(){
				vm.updateRow({'parentId': vm.localValue, 'afterItemId': vm.localChildValue});
				//vm.localValue = vm.value;
			}

			$scope.$watch('vm.treeRows', function(newValue, oldValue){
				if (vm.localSelectValues.length > 0){
					vm.localSelectValues = [{value: 'root', text: 'Root Level'}];
					vm.localSelectChildrenValues = [];
					vm.localValue = null;
					vm.localChildValue = null;
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

			$scope.parentItemChanged = function(){
				var foundBranch = null;

				if (vm.localValue === 'root'){
					vm.localSelectChildrenValues = [];
					if (vm.row.branch.level !== 1){
						vm.localSelectChildrenValues.push({value: 'first', text: 'First Item'});
						for (var i = 0; i < vm.treeRows.length; i++){
							if (vm.treeRows[i].level === 1){
								vm.localSelectChildrenValues.push({value: vm.treeRows[i].branch.uid, text: vm.treeRows[i].branch[vm.field]});
							}
						}
					}else{
						var rootElements = [];
						var prevChild = null;

						for (var i = 0; i < vm.treeRows.length; i++){
							if (vm.treeRows[i].level === 1){
								rootElements.push(vm.treeRows[i]);
							}
						}
						for (var i = 0; i < rootElements.length; i++){
							if (rootElements[i].branch.uid !== vm.row.branch.uid){
								vm.localSelectChildrenValues.push({value: rootElements[i].branch.uid, text: rootElements[i].branch[vm.field]});
							}else if (rootElements[i-1]){
								prevChild = rootElements[i-1];
							}
						}
						if (prevChild){
							var indexToExclude = null;
							for (var i = 0; i < vm.localSelectChildrenValues.length; i++){
								if (vm.localSelectChildrenValues[i].uid === prevChild.uid){
									indexToExclude = i;
									break;
								}
							}
							vm.localSelectChildrenValues.splice(indexToExclude, 1);
							vm.localSelectChildrenValues.unshift({value: 'first', text: 'First Item'});
						}
					}
				}else {
					var prevChild = null;
					vm.localSelectChildrenValues = [];
					for (var i = 0; i < vm.treeRows.length; i++){
						if (vm.localValue === vm.treeRows[i].branch.uid && vm.treeRows[i].branch.children.length > 0){
							if (vm.treeRows[i].branch.uid !== vm.row.branch.parent_uid){
								vm.localSelectChildrenValues.unshift({value: 'first', text: 'First Item'});
							}
							for (var j = 0; j < vm.treeRows[i].branch.children.length; j++){
								if (vm.treeRows[i].branch.children[j].uid !== vm.row.branch.uid){
									vm.localSelectChildrenValues.push({value: vm.treeRows[i].branch.children[j].uid, text: vm.treeRows[i].branch.children[j][vm.field]});
								}else if(vm.treeRows[i].branch.children[j-1]){
									prevChild = vm.treeRows[i].branch.children[j-1];
								}

							}
						}else if (vm.localValue === vm.treeRows[i].branch.uid && vm.treeRows[i].branch.children.length <= 0){
							vm.localSelectChildrenValues.unshift({value: 'first', text: 'First Item'});
							break;
						}
					}
					if (prevChild){
						var indexToExclude = null;
						for (var i = 0; i < vm.localSelectChildrenValues.length; i++){
							if (vm.localSelectChildrenValues[i].uid === prevChild.uid){
								indexToExclude = i;
								break;
							}
						}
						vm.localSelectChildrenValues.splice(indexToExclude, 1);
						vm.localSelectChildrenValues.unshift({value: 'first', text: 'First Item'});
					}
				}
			}

			this.$onInit = function() {
				//initSelectValues();
			}
		}
	});