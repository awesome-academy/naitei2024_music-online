/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */

import { AppDataSource } from '@src/config/data-source';
import { User } from '@src/entities/User.entity';
class UserService {
  private userRepository = AppDataSource.getRepository(User);

  public async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }
  public async create(userData: Partial<User>): Promise<boolean> {
    let user = new User();
    Object.assign(user, userData);
    await this.userRepository.save(user);
    return true;
  }
}

export default new UserService();
