import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { User as UserModel } from '../models/User';
import { PetService } from '../services/PetService';
import { UserService } from '../services/UserService';
import { UserInput } from '../types/input/UserInput';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        private petService: PetService
        ) {}

    @Query(returns => [User])
    public users(): Promise<any> {
      return this.userService.find();
    }

    @FieldResolver()
    public async pets(@Root() user: UserModel): Promise<any> {
        return this.petService.findByUser(user);
    }

    @Mutation(returns => User)
    public async addUser(@Arg('user') user: UserInput): Promise<UserModel> {
        return this.userService.create(new UserModel().trasforToModel(user));
    }

    @Mutation(returns => User)
    public async editUser(@Arg('user') user: UserInput): Promise<UserModel> {
        return this.userService.update(user.idx, new UserModel().trasforToModel(user));
    }
}
