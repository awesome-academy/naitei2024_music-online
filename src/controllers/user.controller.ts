import UserService from '@src/services/user.service';
import { Request, Response } from 'express';
import { t } from 'i18next';
import { comparePassword, hashPassword } from '@src/utils/passwordUtils';
import { UserRoles } from '@src/enums/UserRoles.enum';
import { User } from '@src/entities/User.entity';
import { formatDate } from '@src/utils/formatDate';

export class UserController {
  public static getRegister = (req: Request, res: Response) => {
    try {
      res.render('pages/user/register', { pageTitle: t('action.register') });
    } catch (error) {
      req.flash('error_msg', t('error.registerFail'));
      return res.render('error', {
        message: t('error.loginFail'),
        error: { status: 500, stack: error.stack },
      });
    }
  };
  public static getLogin = (req: Request, res: Response) => {
    try {
      res.render('pages/user/login', { pageTitle: t('action.login') });
    } catch (error) {
      req.flash('error_msg', t('noPageLogin'));
      return res.render('error', {
        message: t('error.loginFail'),
        error: { status: 500, stack: error.stack },
      });
    }
  };
  public static postRegister = async (req: Request, res: Response) => {
    const data = req.body;
    const password = req.body.password;
    try {
      // Mã hóa mật khẩu trước khi lưu
      const hashedPassword = await hashPassword(password);
      // Thay thế mật khẩu gốc bằng mật khẩu đã mã hóa
      data.password = hashedPassword;
      data.role = UserRoles.User;
      const isValue = await UserService.create(data);
      if (!isValue) {
        req.flash('error_msg', t('error.createFail'));
        return res.redirect('/register');
      }
      return res.redirect('/login');
    } catch (error) {
      req.flash('error_msg', t('error.createFail'));
      return res.render('error', {
        message: t('error.loginFail'),
        error: { status: 500, stack: error.stack },
      });
    }
  };

  public static postLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await UserService.findByUsername(username);
      if (!user) {
        req.flash('error_msg', t('error.invalidCredentials'));
        // return res.redirect('/login');
        return res.render('pages/user/login', {
          message: t('error.loginFail'),
          error: { status: 500 },
        });
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        req.flash('error_msg', t('error.invalidCredentials'));
        return res.render('pages/user/login', {
          message: t('error.loginFail'),
          error: { status: 500 },
        });
      }

      // Xử lý đăng nhập thành công
      (req.session as any).user = user;
      return res.render('pages/home', {
        pageTitle: t('page.home'),
        user: user,
      });
    } catch (error) {
      req.flash('error_msg', t('error.loginFail'));
      return res.render('error', {
        message: t('error.loginFail'),
        error: { status: 500, stack: error.stack },
      });
    }
  };
  // Đăng xuất người dùng
  public static logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        req.flash('error_msg', t('error.logoutFail'));
      } else {
        res.redirect('/login');
      }
    });
  };

  public static getList = async (req: Request, res: Response) => {
    try {
      const users = await UserService.findUsers();
      if (!users) {
        return res.render('pages/user/list_user', {});
      }
      // Tạo dữ liệu định dạng để gửi đến view
      const formattedUsers = users.map((user: User) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          dateOfBirth: formatDate(user.dateOfBirth),
        };
      });
      res.render('pages/user/list_user', { users: formattedUsers });
    } catch (error) {
      req.flash('error_msg', 'error.logoutFail');
      res.redirect('../');
    }
  };
}
