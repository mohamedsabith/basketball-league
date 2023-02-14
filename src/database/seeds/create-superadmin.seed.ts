import { User } from '../../modules/auth/entities/user.entity';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserRole } from '../../common/enum/role';
import { PostgresErrorCode } from 'src/common';
import * as chalk from 'chalk';

export default class CreateSuperAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'superadmin',
          email: 'superadmin2@gmail.com',
          password: await bcrypt.hash('12345678', 12),
          role: UserRole.SUPERADMIN,
          refresh_token: 'aaaa',
        },
      ])
      .execute()
      .catch((error) => {
        if (error?.code === PostgresErrorCode.UniqueViolation) {
          console.log(
            chalk.red(
              ' > Username or email already exist, Please choose other one.',
            ),
          );
          process.exit();
        }
        console.log(chalk.red(error?.detail || error?.message || error));
      });
  }
}
