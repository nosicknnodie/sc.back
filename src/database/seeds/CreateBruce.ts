import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

export class CreateBruce implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<User> {
        // const userFactory = factory<User, { role: string }>(User as any);
        // const adminUserFactory = userFactory({ role: 'admin' });

        // const bruce = await adminUserFactory.make();
        // console.log(bruce);

        // const bruce2 = await adminUserFactory.seed();
        // console.log(bruce2);

        // const bruce3 = await adminUserFactory
        //     .map(async (e: User) => {
        //         e.firstName = 'Bruce';
        //         return e;
        //     })
        //     .seed();
        // console.log(bruce3);

        // return bruce;

        // const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        const user = new User();
        const nowDate = new Date(Date.now());
        user.idx = uuid.v1();
        user.name = 'Bruce';
        user.enName = 'Bruce';
        user.email = 'bruce.wayne@wayne-enterprises.com';
        user.password = '1234';
        user.regDt = nowDate;
        user.edtDt = nowDate;
        user.bothDt = new Date('2000-01-01');
        return await em.save(user);
    }

}
