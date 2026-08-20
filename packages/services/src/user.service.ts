import { BaseService } from "./base.service";
import { UserRepository } from "@commercex/repositories";
import { Prisma } from "@prisma/client";

export class UserService extends BaseService {
  private userRepository: UserRepository;

  constructor(tenantId?: string) {
    super(tenantId);
    this.userRepository = new UserRepository(tenantId);
  }

  async getUserById(id: string) {
    console.log(`[UserService] Fetching user by ID: ${id}`);
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    console.log(`[UserService] Fetching user by Email: ${email}`);
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: Prisma.UserCreateInput) {
    console.log(`[UserService] Creating new user: ${data.email}`);
    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    console.log(`[UserService] Updating user: ${id}`);
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    console.log(`[UserService] Deleting user: ${id}`);
    return this.userRepository.delete(id);
  }
}
