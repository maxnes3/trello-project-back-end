import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'argon2';
import { SignUpDto } from '../auth/dto/auth.dto';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    findById(id: string) {
        return this.prismaService.user.findUnique({
            where: {
                id
            }
        });
    }

    findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: {
                email
            }
        });
    }

    async insert(dto: SignUpDto) {
        const newUser = {
            email: dto.email,
            username: dto.username,
            password: await hash(dto.password),
        }

        return this.prismaService.user.create({ data: newUser });
    }

    async update(id: string, dto: UpdateUserDto) {
        let data = dto;

        if (dto.password) {
            data = { ...dto, password: await hash(dto.password) };
        }

        return this.prismaService.user.update({
            where: {
                id,
            },
            data,
            select: {
                email: true,
                username: true
            }
        })
    }
}
