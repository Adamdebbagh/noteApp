angular.module('noteApp')
.controller('EditorController', function($scope,$http){

    $scope.editing = true;

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

    $scope.save = function () {
        $scope.content.date = new Date();

        if ($scope.content.id) {
            $http.put('/notes/' + $scope.content.id, $scope.content).success(function (data) {
                $scope.editing = false;
            }).error(function (err) {
                $scope.error = 'Could not update note';
            });
        } else {
            $scope.content.id = Date.now();
            $http.post('/notes', $scope.content).success(function (data) {
                $scope.notes.push($scope.content);
                $scope.editing = false;
            }).error(function (err) {
                $scope.error = 'Could not create note';
            });
        }
    };


    $scope.delete = function(){

    };
});