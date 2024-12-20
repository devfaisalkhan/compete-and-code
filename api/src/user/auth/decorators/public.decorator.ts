//public.decorator.ts 
import { SetMetadata } from '@nestjs/common';
import { AppConstant } from 'src/shared/app.constant';

export const Public = () => SetMetadata(AppConstant.IS_PUBLIC_KEY, true);