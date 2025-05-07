import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from 'src/database/prisma.service';
import { Role } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getProfile: jest.fn(),
            findUserByEmail: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findUserById: jest.fn(),
            findUserByEmail: jest.fn(),
            updateHashedRefreshToken: jest.fn(),
            deleteUser: jest.fn(),
            updateUserLastLoginTime: jest.fn(),
            updateUserParty: jest.fn(),
            updateUserOwnedParty: jest.fn(),
            getPartyByMemberId: jest.fn(),
            removeUserPartyId: jest.fn(),
            removePartyFromOwner: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
