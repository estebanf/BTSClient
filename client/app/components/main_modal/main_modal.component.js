'use strict';
const angular = require('angular');

export class mainModalComponent {
  /*@ngInject*/
  constructor($http,$filter) {
    this.$http = $http
    this.$filter = $filter;
    this.states = ["Alabama","Alaska","AmericanSamoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","DistrictOfColumbia","FederatedStatesOfMicronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","MarshallIslands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","NewHampshire","NewJersey","NewMexico","NewYork","NorthCarolina","NorthDakota","NorthernMarianaIslands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","PuertoRico","RhodeIsland","SouthCarolina","SouthDakota","Tennessee","Texas","Utah","Vermont","VirginIslands","Virginia","Washington","WestVirginia","Wisconsin","Wyoming"];

    this.item = angular.copy(this.resolve.data.item);
    this.mode = this.resolve.data.mode;
    this.req_types = ['Inquiry','Booking'];
    this.evt_types = ['News','Entertainment'];
    if(this.item.eventdatetime){
      var parsedate = Date.parse(this.item.eventdatetime);
      this.item.eventdate = new Date(parsedate);
    }
    if(this.mode != 'Create'){
      var self = this
      this.$http.get('/api/customers/' + this.item.customerid)
        .then(function(response){
          self.item.customer =  JSON.parse(response.data);
          console.log(self.item.customer);
        })
    }
  };
  getCustomer(val){
    if(val && val.length >=3)
    return this.$http.get('/api/customers?filter[where][customername][like]=%'+ val + '%')
      .then(function(response){
        // return JSON.parse(response.data).map(function(item){
        //   return {id: item.customerid, name: item.customername};
        // })
        return JSON.parse(response.data);
      })
  }
  go(){
    this.item.customerid = this.item.customer.customerid;
    this.item.eventdatetime = this.$filter('date')(this.item.eventdate,'yyyy-MM-ddTHH:mm:ss.sss','UTC')+'Z'
    this.close({$value:this.item});
  }
}

export default angular.module('btsclientApp.main_modal', [])
  .component('mainModal', {
    template: require('./main_modal.component.html'),
    bindings: {
      resolve: '<',
      close:'&',
      dismiss: '&'
    },
    controller: mainModalComponent
  })
  .name;
