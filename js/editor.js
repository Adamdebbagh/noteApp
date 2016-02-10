angular.module('noteApp')
.controller('EditorController', function($scope,$http){

    $scope.state = { editing: true };


    $http.get('/notes')
        .success(function (data) {
        $scope.notes = data;
    })
        .error(function(err){
            $scope.error = 'Could not load notes';
        });

    $scope.view = function(index){
        $scope.editing = false;
        $scope.content = $scope.notes[index];
    };

    $scope.create = function(){
        $scope.editing = true;
        $scope.content = {
            title:'',
            content:''
        };
    };
});