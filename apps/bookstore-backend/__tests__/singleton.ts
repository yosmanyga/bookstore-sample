import {PrismaClient} from '@prisma/client'
import {DeepMockProxy, mockDeep, mockReset} from 'jest-mock-extended'

import prisma from '../src/prisma/client'

jest.mock('../src/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
