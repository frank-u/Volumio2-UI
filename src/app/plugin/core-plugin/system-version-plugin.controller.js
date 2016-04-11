class SystemVersionPluginController {
  constructor($scope, socketService, $log) {
    'ngInject';
    this.socketService = socketService;
    this.$scope = $scope;
    this.$log = $log;
    this.init();
  }

  init() {
    this.registerListner();
    this.initService();
  }

  registerListner() {
    this.socketService.on('pushSystemVersion', (data) => {
      this.$log.debug('pushSystemVersion', data);
      this.systemVersion = data;
    });
    this.$scope.$on('$destroy', () => {
      this.socketService.off('pushSystemVersion');
    });
  }

  initService() {
    this.socketService.emit('getSystemVersion');
  }
}

export default SystemVersionPluginController;
