const app = angular.module('app', []);

app.controller('FormController', ['$scope', '$http', function($scope, $http) {
    // Initial state
    $scope.user = {};
    $scope.isLoading = false;
    $scope.submitSuccess = false;
    $scope.submitError = false;
    $scope.errorMessage = '';
    $scope.successMessage = '';
    $scope.serverErrors = [];

    // Form submission handler
    $scope.submitForm = function(isValid) {
        // Reset message states on new submission
        $scope.submitSuccess = false;
        $scope.submitError = false;
        $scope.serverErrors = [];
        
        // Only submit if AngularJS frontend validation passes
        if (isValid) {
            $scope.isLoading = true;
            
            // Sending POST request to backend Express server
            $http.post('/api/submit', $scope.user)
                .then(function(response) {
                    // Success handler (200 OK)
                    $scope.isLoading = false;
                    $scope.submitSuccess = true;
                    $scope.successMessage = response.data.message;
                    
                    // Reset form and model
                    $scope.user = {};
                    $scope.regForm.$setPristine();
                    $scope.regForm.$setUntouched();
                })
                .catch(function(error) {
                    // Error handler (e.g. 400 Bad Request)
                    $scope.isLoading = false;
                    $scope.submitError = true;
                    
                    if (error.data) {
                        $scope.errorMessage = error.data.message;
                        if (error.data.errors) {
                            $scope.serverErrors = error.data.errors;
                        }
                    } else {
                        // Network error or server not reachable
                        $scope.errorMessage = 'Server error occurred. Please try again later.';
                    }
                });
        }
    };
}]);
