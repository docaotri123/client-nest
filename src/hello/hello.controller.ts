import { Controller, Get, Post, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { toArray, timeout } from 'rxjs/operators';

@Controller('hello')
export class HelloController {
    constructor(@Inject('HELLO_SERVICE') private client: ClientProxy) { }

    @Get(':name')
    getHelloByName(@Param('name') name = 'there'): Observable<number[]> {
        try {
            const pattern = { cmd: 'sum' };
            const payload = [1, 2, 3, 4];

            return this.client.send<number>(pattern, payload).pipe(toArray(), timeout(8000));
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    @Post('/events')
    async sendEvent() {
        return this.client.emit('event_name', { name: 'tri do' });
    }
}
