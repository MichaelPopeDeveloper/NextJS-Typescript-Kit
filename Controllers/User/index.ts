import User from '../../Models/User/Index';

export class UserConrtoller {
    public static create(config: any) {
        const user = new User(config);
        return user.save();
    }

    public static get(id: string) {}
    public static update(id: string, config: any) {}
    public static delete(id: string, config: any) {}
}