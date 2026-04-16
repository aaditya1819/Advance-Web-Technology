// Define the AngularJS application name
// Empty array indicates this module has no dependencies
var app = angular.module('registrationApp', []);

// Define the controller for processing form logic
app.controller('RegistrationController', function($scope) {
    
    // Initialize an empty user object to store form data
    $scope.user = {};
    
    // Boolean flag to track whether form has been successfully submitted
    $scope.isSubmitted = false;

    // Function called when the user clicks the "Register" button
    $scope.submitForm = function(isValid) {
        
        // isValid is passed from the view checking regForm.$valid
        if (isValid) {
            
            // Show the success message UI block
            $scope.isSubmitted = true;
            
            console.log("Registration complete for:", $scope.user);
            
            // Note: Since this is a frontend-only assignment, 
            // no API calls ($http) are made to a backend server.
            
        } else {
            // Keep the form unsubmitted if fields are invalid
            $scope.isSubmitted = false;
        }
    };
});
