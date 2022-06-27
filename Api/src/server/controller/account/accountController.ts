import {AccountUtils} from "./utils/accountUtils";
import {Router, IRouter, Request, Response} from "express";
import * as Tools from "../../tools";
import * as Models from "../../model";

export class AccountController extends AccountUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.post('/signup', async (req: Request, res: Response) => {
            await this.postMethodSignup(req, res);
        });
        this._router.post('/verify', async (req: Request, res: Response) => {
            await this.postMethodVerify(req, res);
        });
        this._router.post('/login', async (req: Request, res: Response) => {
            await this.postMethodLogin(req, res);
        });
        this._router.post('/login-cli', async (req: Request, res: Response) => {
            await this.postMethodLoginCli(req, res);
        });
    }

    private async postMethodSignup(req: Request, res: Response) {
        try {
            await super.checkPostContainMailANDUserANDPassword(req.body);
            Tools.Mailer.checkEmailHasBadSyntax(req.body.email);
            Tools.Mailer.checkEmailIsTemporary(req.body.email);
            await super.checkSyntaxUsername(req.body.username);
            await super.checkLengthUsername(req.body.username);
            await super.checkLengthPassword(req.body.password);
            await super.checkSyntaxPassword(req.body.password);
            await super.createUser({
                email: req.body.email,
                username: req.body.username,
                password: Tools.PasswordEncrypt.encrypt(req.body.password)
            })
            const user: Models.User.IUser = await super.getUserByReflect({
                email: req.body.email,
                username: req.body.username,
            });
            await super.createToken(user!);
            // const token: SzBxModel.User.IToken = await super.getTokenByReflect({userUuid: user[0]!.uuid});
            // await super.sendEmailVerification(user!, token!);

            res.status(200).send({
                code: 'OK',
                message: 'User and Token created successfully.'
            });
        } catch (error: any) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodVerify(req: Request, res: Response) {
        try {
            const bearerToken = req.headers.authorization;
            await super.verifyTokenSignature(bearerToken?.split(' ')[1]!);
            const token: Models.User.IToken = await super.getTokenByReflect({token: bearerToken?.split(' ')[1]!});
            await super.verifyTokenExpirationAndSendMail(token!);
            await super.setVerifyUser(token!);

            res.status(200).send({
                code: 'OK',
                message: 'User verified successfully.'
            });
        } catch (error: any) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodLogin(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            const userReflect: Models.User.IUser = await super.transformPostBodyToUserReflect(req.body);
            const user: Models.User.IUser = await super.verifyLoginAndReturnUser(userReflect, req.body.password);
            await super.updateUserByReflect(user, {isConnected: true});
            await super.createToken(user);
            const token: Models.User.IToken = await super.getTokenByReflect({userUuid: user.uuid});
            res.status(200).send({
                code: 'OK',
                message: 'User logged successfully.',
                token: token.token
            });

        } catch (error: any) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodLoginCli(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            await super.checkPostContainIpANDMacAddressANDDeviceType(req.body);
            const userReflect: Models.User.IUser = await super.transformPostBodyToUserReflect(req.body);
            const user: Models.User.IUser = await super.verifyLoginAndReturnUser(userReflect, req.body.password);
            await super.addNewIpOrUpdate(user, req.body.ip);
            await super.addNewMacAddressOrUpdate(user, req.body.macAddress);
            await super.addNewDeviceOrUpdate(user, req.body.deviceType);
            await super.updateUserByReflect(user, {isConnected: true});
            await super.createToken(user);
            const token: Models.User.IToken = await super.getTokenByReflect({userUuid: user.uuid});

            res.status(200).send({
                code: 'OK',
                message: 'User logged successfully.',
                token: token.token
            });
        } catch (error: any) {
            res.status(500).send({
                error
            });
        }
    }

    public getRouter() {
        return this._router;
    }
}

