import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

export interface CreateUserDto {
  name: string
  email: string
  phone: string
  passwordHash: string
  role: string
  avatarUrl?: string
}

export interface UpdateUserDto {
  name?: string
  phone?: string
  avatarUrl?: string
  isActive?: boolean
  isVerified?: boolean
  lastLogoutAt?: Date
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException(`User ${id} not found`)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(dto as Partial<User>)
    return this.usersRepository.save(user)
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)
    Object.assign(user, dto)
    return this.usersRepository.save(user)
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await this.usersRepository.update(id, { passwordHash })
  }
}
