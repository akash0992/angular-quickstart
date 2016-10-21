//The pipe class implements the PipeTransform interface's transform method that accepts an input value and an optional array of parameters and returns the transformed value.
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library.
var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, args) {
        // Check if array exists, in this case array contains articles and args is an array that has 1 element : !id
        if (array) {
            // get the first element
            var orderByName_1 = args;
            var byVal_1 = 1;
            // check if exclamation point
            if (orderByName_1.charAt(0) == "!") {
                // reverse the array
                byVal_1 = -1;
                orderByName_1 = orderByName_1.substring(1);
            }
            array.sort(function (a, b) {
                if (a[orderByName_1] < b[orderByName_1]) {
                    return -1 * byVal_1;
                }
                else if (a[orderByName_1] > b[orderByName_1]) {
                    return (1 * byVal_1);
                }
                else {
                    return 0;
                }
            });
            return array;
        }
    };
    OrderByPipe = __decorate([
        core_1.Pipe({ name: 'orderby' }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;
