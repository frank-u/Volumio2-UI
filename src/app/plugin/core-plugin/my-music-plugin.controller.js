class MyMusicPluginController {
  constructor($scope, socketService, mockService, $interval, $log) {
    'ngInject';
    this.socketService = socketService;
    this.$interval = $interval;
    this.$scope = $scope;
    this.$log = $log;
    //this.myCollectionStats = mockService.get('myCollectionStats');
    this.init();
  }

  rescanLibrary() {
    this.socketService.emit('rescanDb');
  }

  init() {
    this.registerListner();
    this.initService();
  }

  registerListner() {
    this.socketService.on('pushMyCollectionStats', (data) => {
      this.$log.debug('pushMyCollectionStats', data);
      this.myCollectionStats = data;
    });
    this.$scope.$on('$destroy', () => {
      this.socketService.off('pushMyCollectionStats');
      if (this.intervalHandler) {
        this.$interval.cancel(this.intervalHandler);
      }
    });
  }

  initService() {
    this.socketService.emit('getMyCollectionStats');
    this.intervalHandler = this.$interval(() => {
      this.socketService.emit('getMyCollectionStats');
    }, 4000);
  }
}

export default MyMusicPluginController;
