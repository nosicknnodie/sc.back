import DataLoader from 'dataloader';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Pet as PetModel } from '../models/Pet';
import { User as UserModel } from '../models/User';
import { ClubUserRepository } from '../repositories/ClubUserRepository';
import { PetRepository } from '../repositories/PetRepository';
import { UserService } from '../services/UserService';
import { UserInput } from '../types/input/UserInput';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        // private petService: PetService,
        @DLoader(PetRepository, {key: 'userIdx', multiple: true, method: 'findByUserIds'}) private petLoader: DataLoader<string, PetModel>,
        @DLoader(ClubUserRepository, {key: 'userIdx', multiple: true, method: 'findByUserIds'}) private clubUserLoader: DataLoader<string, PetModel>
        ) {}

    @Query(returns => [User])
    public users(): Promise<any> {
      return this.userService.find();
    }

    @FieldResolver()
    public async pets(@Root() user: UserModel): Promise<any> {
        return this.petLoader.load(user.idx);
        // return this.petService.findByUser(user);
    }

    @FieldResolver()
    public async clubUsers(@Root() user: UserModel): Promise<any> {
        return this.clubUserLoader.load(user.idx);
        // return this.petService.findByUser(user);
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
