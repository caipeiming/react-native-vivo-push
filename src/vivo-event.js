import EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

export const VivoPushEmitter = new MyEmitter();