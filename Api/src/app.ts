import {Server} from './server/server';

try {
    new Server().run();
} catch (error) {
    console.log(error);
}
