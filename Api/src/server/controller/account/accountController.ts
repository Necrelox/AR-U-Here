import {AccountUtils} from './utils/accountUtils';
import {Router, IRouter, Request, Response} from 'express';
import * as Tools from '../../tools';
import * as Models from '../../model';
import * as DBQueries from '../../database';

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

            await Promise.all([
                Tools.Mailer.checkEmailHasBadSyntax(req.body.email),
                Tools.Mailer.checkEmailIsTemporary(req.body.email),
                super.checkSyntaxUsername(req.body.username),
                super.checkLengthUsername(req.body.username),
                super.checkLengthPassword(req.body.password),
                super.checkSyntaxPassword(req.body.password)]);

            const user: Models.User.IUser = await DBQueries.AccountQueries.createAccountTransaction({
                email: req.body.email,
                username: req.body.username,
                password: Tools.PasswordEncrypt.encrypt(req.body.password)
            });

            const token: Models.User.IToken = await super.getTokenByReflect({userUuid: user!.uuid});
            // await super.sendEmailVerification(user!, token!);

            res.status(200).send({
                code: 'OK',
                message: 'User and Token created successfully.',
                token: token.token
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

            await super.verifyTokenSignature(bearerToken!.split(' ')[1]!);
            const token: Models.User.IToken = await super.getTokenByReflect({token: bearerToken!.split(' ')[1]!});
            await super.verifyTokenExpirationAndSendMail(token!);

            await DBQueries.AccountQueries.setVerifiedUserTransaction(token!.userUuid!);

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
            const user: Models.User.IUser = await super.verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflect, req.body.password);
            const token = await DBQueries.AccountQueries.loginUserAndGetTokenTransaction(user.uuid!);

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
            const user: Models.User.IUser = await super.verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflect, req.body.password);
            const token = await DBQueries.AccountQueries.loginCLIUserAndGetTokenTransaction(user.uuid!, req.body.ip, req.body.macAddress, req.body.deviceType);

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

