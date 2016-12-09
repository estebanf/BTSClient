import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  serviceRequests = []
  currentRequest = {}
  currentIndex = -1;

  /*@ngInject*/
  constructor($http, $scope,$uibModal,$interval) {
    // var statuses = [
    //   "Released",
    //   "Modified",
    //   "Received",
    //   "Waiting for costs",
    //   "Valuated",
    //   "Waiting for approval",
    //   "Approval received",
    //   "Rejected",
    //   "Booked on feeds",
    //   "Booked on scheduleAll",
    //   "Hold on feeds",
    //   "Hold on scheduleAll"
    // ]
    this.status_release = [
      "Hold on feeds",
      "Hold on scheduleAll"
    ]
    this.status_confirm = [
      "Hold on feeds",
      "Hold on scheduleAll"
    ]
    this.status_edit = [
      "Released",
      "Rejected",
      "Hold on feeds",
      "Hold on scheduleAll"
    ];
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.$interval = $interval;
  }
  showEdit(obj){
    return (this.status_edit.indexOf(obj.status) >= 0)
  }
  showConfirm(obj){
    return (this.status_confirm.indexOf(obj.status) >= 0)
  }
  showRelease(obj){
    return (this.status_release.indexOf(obj.status) >= 0)
  }
  findIndex(obj){
    for(var i = 0; i < this.serviceRequests.length; i++){
        if(angular.equals(this.serviceRequests[i], obj)){
            return i;
        }
    };
    return -1;
  }

  startInterval(){
    var self = this;
    self.stop = self.$interval(function(){
      self.$http.get('/api/bts_requests')
        .then(response => {
          self.serviceRequests = response.data;
        });
      },5000);
  }
  $onInit() {
    this.$http.get('/api/bts_requests')
      .then(response => {
        this.serviceRequests = response.data;
        this.startInterval();
      });
    };
  open_modal(modal_mode){
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: "myModalContent.html",
      size: 'lg',
      component: 'main_modal',
      resolve:{
        data: {
          item: this.currentRequest,
          mode:modal_mode
        }
      }
    });
    var self= this;
    modalInstance.opened.then(function(){
      self.$interval.cancel(self.stop);
    })
    modalInstance.result.then(function(result){
      if(modal_mode == 'Create'){
        self.$http.post('/api/bts_requests',result)
          .success(function(data){
            self.serviceRequests.push(data);
          });
      }
      if(modal_mode == 'Edit'){
        self.$http.put('/api/bts_requests/'+ result.requestid,result)
          .success(function(data){
            self.serviceRequests[self.currentIndex] = data;
            self.currentIndex = -1;
            self.currentRequest = {};
          })
      }
    });
    modalInstance.closed.then(function(){
      self.startInterval();
    })
  };
  create(){
    this.currentRequest = {};
    this.currentIndex = -1;
    this.open_modal('Create');
  }
  edit_or_view(action,obj){
    var index = this.findIndex(obj);
    this.currentRequest = this.serviceRequests[index];
    this.currentIndex = index;
    this.open_modal(action);
  }
  update(action,obj){
    var self = this;
    var index = self.findIndex(obj);
    self.$http.put('/api/bts_requests/'+ obj.requestid,{
      action:action
    })
      .success(function(data){
        self.serviceRequests[index] = data;
      })
  }
}
export default angular.module('btsclientApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
