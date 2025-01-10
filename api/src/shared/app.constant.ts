export class AppConstant {
  public static readonly ROUTE_PREFIX = 'api';

  public static readonly IS_PUBLIC_KEY = 'isPublic';

  public static readonly ACCESS_TOKEN_SECRET_KEY = '123456';
  public static readonly REFRESH_TOKEN_SECRET_KEY = '123456789';

  public static readonly DEFAULT_JWT_ACCESS_TOKEN_EXPIRATION = '1h'; 
  public static readonly DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION = '5d';

  public static readonly ADMIN_EMAIL = 'dev.faisalkhan@gmail.com';
  public static readonly DEFAULT_EMAIL_USERNAME = 'dev.faisalkhan@gmail.com';
  public static readonly DEFAULT_EMAIL_SMTP = 'smtp.gmail.com';

  public static readonly DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
}
