import {z} from 'zod';

export const loginschema = z.object({
    id: z.string().min(1, {message: '필수값'}).trim(),
    password: z.string().min(1, {message: '필수값'}).max(15, {message: '최대 15자리'})
});

export const schema = z
    .object({
        id: z.string().min(1, {message: '필수값'}).trim(),
        password: z.string().min(1, {message: '필수값'}).max(15, {message: '최대 15자리'}),
        pwCheck: z.string().min(1, {message: '필수값'}).trim(),
        names: z.string().min(1, {message: '필수값'}).trim(),
        email: z.string().min(1, {message: '필수값'}).email({message: '이메일 주소를 입력'}).trim(),
        office: z.string().min(1, {message: '필수값'}).trim(),
        phone: z
            .string()
            .min(1, {message: '필수값'})
            .regex(/^010-\d{4}-\d{4}$/, {message: '형식: 010-1234-5678'})
            .trim()
    })
    .refine((data) => data.password === data.pwCheck, {
        message: '비밀번호 불일치',
        path: ['pwCheck'] // 에러 메시지를 pwCheck 필드에 지정
    });
