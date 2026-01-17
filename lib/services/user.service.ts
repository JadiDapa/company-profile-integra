import { Prisma, UserRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  UpdateUserDTO,
  UserSearchSchema,
  type CreateUserDTO,
} from "../validators/user.validator";

export type UserListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: Prisma.UserOrderByWithRelationInput;
};

export const UserService = {
  // READ (Paginated)
  async list(options: UserListOptions = {}) {
    const { page, pageSize, search } = UserSearchSchema.parse(options);

    const where: Prisma.UserWhereInput | undefined = search
      ? { username: { contains: search } }
      : undefined;

    const orderBy = options.orderBy ?? { createdAt: "desc" };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy,
        include: {
          ticketHandler: true,
          ticketLogs: true,
          ticketTechnician: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async getAll() {
    return await prisma.user.findMany();
  },

  async getManyByRole(role: UserRole) {
    return await prisma.user.findMany({
      where: {
        role,
      },
    });
  },

  async getById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async getByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
      include: {
        ticketHandler: true,
        ticketLogs: true,
        ticketTechnician: true,
      },
    });
  },

  // CREATE (clean, typed, no validation)
  async create(data: CreateUserDTO) {
    return await prisma.user.create({
      data: {
        username: data.username as string,
        role: data.role,
        fullName: data.fullName,
      },
    });
  },

  // UPDATE
  async update(id: number, data: UpdateUserDTO) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.user.delete({ where: { id } });
  },
};
